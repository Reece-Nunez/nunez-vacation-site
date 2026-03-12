import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/data";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Florida Getaway", href: "/properties/florida-getaway" },
  { name: "Coastal Cottage", href: "/properties/coastal-cottage" },
  { name: "Amenities", href: "/#amenities" },
];

const guestInfo = [
  { label: "Check-in", value: "3:00 PM" },
  { label: "Check-out", value: "11:00 AM" },
  { label: "Pet Policy", value: "Contact us for details" },
  { label: "Cancellation", value: "Flexible cancellation policy" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-primary-900 text-white">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Nunez Vacation Homes"
                width={40}
                height={40}
                className="rounded-md brightness-0 invert"
              />
              <span className="font-serif text-lg font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-300">
              Experience luxury vacation rentals in the heart of Port Charlotte,
              Florida. Your home away from home on the Gulf Coast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-accent"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Guest Information
            </h3>
            <ul className="space-y-3">
              {guestInfo.map((item) => (
                <li key={item.label} className="text-sm">
                  <span className="font-medium text-gray-200">
                    {item.label}:
                  </span>{" "}
                  <span className="text-gray-400">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm text-gray-300 transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-sm text-gray-300">{siteConfig.location}</li>
            </ul>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 transition-colors hover:text-accent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 transition-colors hover:text-accent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.056-.06 4.122c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06s-3.056-.012-4.122-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Airbnb"
                className="text-gray-400 transition-colors hover:text-accent"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 14.486c-.192 1.062-.9 2.276-2.088 3.61-.462.518-.944 1.004-1.396 1.41-.33.296-.62.518-.872.668-.388.23-.734.296-1.012.214-.206-.06-.424-.186-.65-.378a10.24 10.24 0 01-.878-.862 22.706 22.706 0 01-1.396-1.656c-.7-.912-1.2-1.746-1.496-2.502-.296-.756-.356-1.416-.178-1.978.178-.562.584-.978 1.218-1.248.382-.162.786-.236 1.21-.222.346.012.672.082.978.21a8.52 8.52 0 011.204.636c.2.13.374.252.52.364.146-.112.32-.234.52-.364a8.52 8.52 0 011.204-.636c.306-.128.632-.198.978-.21.424-.014.828.06 1.21.222.634.27 1.04.686 1.218 1.248.178.562.118 1.222-.178 1.978-.296.756-.796 1.59-1.496 2.502a22.706 22.706 0 01-1.396 1.656 10.24 10.24 0 01-.878.862c-.226.192-.444.318-.65.378-.278.082-.624.016-1.012-.214a5.31 5.31 0 01-.872-.668 15.846 15.846 0 01-1.396-1.41c-1.188-1.334-1.896-2.548-2.088-3.61" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Designed with care for our guests
          </p>
        </div>
      </div>
    </footer>
  );
}
