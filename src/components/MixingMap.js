import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import indiaBoundary from "@/data/indiaBoundary.json";

// India's bounding box (from the boundary file), used to frame the map.
const INDIA_BOUNDS = [
  [6.7, 68.1],
  [37.1, 97.4],
];
// A little slack around India so the view can be panned slightly.
const PAN_BOUNDS = [
  [4.5, 64.0],
  [39.0, 101.5],
];

const LIGHT_GREEN = "#8CC63E";
const DARK_GREEN = "#1A3C2A";
const MASK_COLOR = "#F4F7F1";

function pinSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" viewBox="0 0 26 36" style="filter:drop-shadow(0 2px 2px rgba(0,0,0,.25))">
    <path d="M13 0C5.8 0 0 5.8 0 13c0 9.8 13 23 13 23s13-13.2 13-23C26 5.8 20.2 0 13 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
    <circle cx="13" cy="13" r="5" fill="#ffffff"/>
  </svg>`;
}

// Grouped-pin bubbles: light green for small groups, dark green for large ones.
function clusterIcon(L, cluster) {
  const count = cluster.getChildCount();
  const size = count < 10 ? 36 : count < 100 ? 44 : 54;
  const color = count < 50 ? LIGHT_GREEN : DARK_GREEN;
  return L.divIcon({
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 0 0 5px ${color}40,0 4px 10px rgba(0,0,0,.2);color:#fff;font-weight:700;font-size:13px;display:flex;align-items:center;justify-content:center;cursor:pointer">${count}</div>`,
    className: "",
    iconSize: [size, size],
  });
}

function fitIndia(map) {
  map.setMinZoom(0);
  map.fitBounds(INDIA_BOUNDS, { padding: [10, 10], animate: false });
  // Don't allow zooming out past the India-filling view.
  map.setMinZoom(map.getZoom());
}

const TOOLTIP_OPTIONS = {
  direction: "top",
  offset: [0, -22],
  opacity: 1,
  className: "mixing-tooltip",
};

// GeoJSON [lng, lat] rings -> Leaflet [lat, lng] rings.
const toLatLngs = (ring) => ring.map(([lng, lat]) => [lat, lng]);

export default function MixingMap({ points, onSelect, describe }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const clusterRef = useRef(null);
  const leafletRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const describeRef = useRef(describe);
  describeRef.current = describe;

  // Create the map once.
  useEffect(() => {
    let cancelled = false;
    let resizeObserver;

    (async () => {
      const L = (await import("leaflet")).default;
      window.L = L;
      await import("leaflet.markercluster");
      if (cancelled || mapRef.current) return;

      leafletRef.current = L;
      // Fractional zoom lets India fill the frame instead of snapping smaller.
      const map = L.map(containerRef.current, {
        zoomSnap: 0.1,
        zoomDelta: 0.5,
        wheelPxPerZoomLevel: 120,
        maxBounds: PAN_BOUNDS,
        maxBoundsViscosity: 1,
        zoomControl: false,
      });
      L.control.zoom({ position: "topright" }).addTo(map);
      fitIndia(map);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Cover everything outside India so only India is visible.
      const indiaRings = indiaBoundary.geometry.coordinates.map((poly) =>
        toLatLngs(poly[0])
      );
      L.polygon(
        [
          [
            [-90, -180],
            [-90, 180],
            [90, 180],
            [90, -180],
          ],
          ...indiaRings,
        ],
        { stroke: false, fillColor: MASK_COLOR, fillOpacity: 1, interactive: false }
      ).addTo(map);
      L.polygon(indiaRings, {
        color: DARK_GREEN,
        weight: 1.5,
        opacity: 0.6,
        fill: false,
        interactive: false,
      }).addTo(map);

      // Clicking a bubble zooms into it (default) and reports what it holds.
      const group = L.markerClusterGroup({
        showCoverageOnHover: false,
        iconCreateFunction: (cluster) => clusterIcon(L, cluster),
        maxClusterRadius: 45,
      });
      group.on("clusterclick", (e) => {
        onSelectRef.current?.(
          e.layer.getAllChildMarkers().map((m) => m.options.data)
        );
      });
      group.on("clustermouseover", (e) => {
        const pts = e.layer.getAllChildMarkers().map((m) => m.options.data);
        e.layer
          .bindTooltip(describeRef.current(pts), TOOLTIP_OPTIONS)
          .openTooltip();
      });
      group.on("clustermouseout", (e) => e.layer.closeTooltip());
      group.on("click", (e) => {
        onSelectRef.current?.([e.layer.options.data]);
      });
      map.on("click", () => onSelectRef.current?.(null));
      clusterRef.current = group.addTo(map);

      mapRef.current = map;
      renderMarkers(points);

      // Keep India filling the frame when the container is resized.
      resizeObserver = new ResizeObserver(() => {
        map.invalidateSize();
        fitIndia(map);
      });
      resizeObserver.observe(containerRef.current);
    })();

    return () => {
      cancelled = true;
      if (resizeObserver) resizeObserver.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers if the points change.
  useEffect(() => {
    if (mapRef.current) renderMarkers(points);
  }, [points]);

  function renderMarkers(pts) {
    const L = leafletRef.current;
    const group = clusterRef.current;
    if (!L || !group) return;

    const icon = L.divIcon({
      html: pinSvg(DARK_GREEN),
      className: "",
      iconSize: [26, 36],
      iconAnchor: [13, 36],
    });

    group.clearLayers();
    group.addLayers(
      pts.map((p) =>
        L.marker([p.lat, p.lng], { icon, data: p }).bindTooltip(
          describeRef.current([p]),
          { ...TOOLTIP_OPTIONS, offset: [0, -34] }
        )
      )
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
