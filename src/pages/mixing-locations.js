import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Tractor, MapPinned, Package, Leaf, X, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import locations from "@/data/mixingLocations.json";

// Leaflet touches `window`, so the map only renders in the browser.
const MixingMap = dynamic(() => import("@/components/MixingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-[#808080]">
      Loading map…
    </div>
  ),
});

const formatNumber = (n, digits = 0) =>
  n.toLocaleString("en-IN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

// Tonnes get one decimal when small so tiny amounts don't read as 0.
const formatTonnes = (t) => formatNumber(t, t < 100 ? 1 : 0);

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Totals for any set of mixing entries.
function summarize(points) {
  const dates = points.map((p) => p.date).filter(Boolean).sort();
  return {
    entries: points.length,
    farms: new Set(points.map((p) => p.farm)).size,
    clusters: [...new Set(points.map((p) => p.cluster))],
    biochar: points.reduce((sum, p) => sum + (p.biochar_t || 0), 0),
    co2: points.reduce((sum, p) => sum + (p.co2_t || 0), 0),
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
  };
}

function selectionTitle(summary) {
  const [first, ...rest] = summary.clusters;
  if (rest.length === 0) return first;
  return `${first} + ${rest.length} more cluster${rest.length > 1 ? "s" : ""}`;
}

// Short hover label for a bubble or pin on the map.
function tooltipHtml(points) {
  const s = summarize(points);
  return `<div style="font-weight:700;color:#1A3C2A">${selectionTitle(s)}</div>
    <div style="color:#4b5563">${formatNumber(s.farms)} farm${s.farms === 1 ? "" : "s"} · ${formatTonnes(s.biochar)} t biochar · ${formatTonnes(s.co2)} t CO₂</div>`;
}

function DetailsCard({ points, onClose }) {
  const s = summarize(points);
  const single = points.length === 1 ? points[0] : null;
  const metrics = [
    ["Farms", formatNumber(s.farms), Tractor],
    ["Biochar mixed", `${formatTonnes(s.biochar)} t`, Package],
    ["CO₂ sequestered", `${formatTonnes(s.co2)} t`, Leaf],
    ["Mixing entries", formatNumber(s.entries), MapPinned],
  ];

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[640px] z-[1000] bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-emerald-100 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
            {single ? "Mixing site" : "Selected area"}
          </div>
          <h3 className="text-2xl text-emerald-900 leading-tight">
            {selectionTitle(s)}
          </h3>
          {s.firstDate && (
            <div className="mt-1 flex items-center gap-1.5 text-sm text-[#808080]">
              <CalendarDays size={14} />
              {s.firstDate === s.lastDate
                ? formatDate(s.firstDate)
                : `${formatDate(s.firstDate)} – ${formatDate(s.lastDate)}`}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close details"
          className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {metrics.map(([label, value, Icon]) => (
          <div key={label} className="rounded-xl bg-emerald-50 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-xs text-emerald-800">
              <Icon size={14} />
              {label}
            </div>
            <div className="mt-0.5 text-lg font-bold text-emerald-900">{value}</div>
          </div>
        ))}
      </div>

      {single && (single.batch || single.acres || single.material) && (
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
          {single.material && <span>{single.material}</span>}
          {single.batch && <span>Batch {single.batch}</span>}
          {single.acres && <span>{single.acres} acres of cotton</span>}
        </div>
      )}
    </div>
  );
}

export default function MixingLocations() {
  const [selected, setSelected] = useState(null);

  const totals = useMemo(() => summarize(locations), []);

  const heroStats = [
    ["Farms", formatNumber(totals.farms), Tractor],
    ["Clusters", formatNumber(totals.clusters.length), MapPinned],
    ["Biochar mixed", `${formatNumber(totals.biochar)} t`, Package],
    ["CO₂ sequestered", `${formatNumber(totals.co2)} t`, Leaf],
  ];

  return (
    <>
      <Head>
        <title>Mixing Locations | KriSHE Carbon</title>
      </Head>
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#1A3C2A] via-[#24502F] to-[#35591E] text-white px-4 md:px-6 pt-12 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Field data from our clusters
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl leading-tight">
            Where our biochar goes into the soil
          </h1>
          <p className="mt-3 max-w-2xl text-base md:text-lg text-white/75">
            Every pin is a farm where biochar was mixed with compost and returned
            to the land. Hover over or click any bubble or pin to see what was
            achieved there.
          </p>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {heroStats.map(([label, value, Icon]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 border border-white/10 backdrop-blur px-5 py-4"
              >
                <div className="flex items-center gap-2 text-sm text-emerald-200">
                  <Icon size={16} />
                  {label}
                </div>
                <div className="mt-1 text-3xl md:text-4xl font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <main className="bg-[#F4F7F1] px-4 md:px-6 pb-16">
        <div className="max-w-[1400px] mx-auto -mt-14 h-[75vh] lg:h-[calc(100vh-100px)] min-h-[560px] lg:min-h-[680px] rounded-2xl overflow-hidden shadow-lg border border-emerald-100 bg-[#F4F7F1] relative z-0">
          <MixingMap
            points={locations}
            onSelect={setSelected}
            describe={tooltipHtml}
          />
          {selected && selected.length > 0 && (
            <DetailsCard points={selected} onClose={() => setSelected(null)} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
