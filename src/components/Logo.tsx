import Image from 'next/image'
import Link from 'next/link'

/** The client's logo file, used exactly as supplied. */
export function Logo({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="KriSHE Carbon, home">
      <Image
        className="brand__logo"
        src="/brand/logo-horizontal.webp"
        alt="KriSHE Carbon"
        width={256}
        height={154}
        priority={priority}
      />
    </Link>
  )
}
