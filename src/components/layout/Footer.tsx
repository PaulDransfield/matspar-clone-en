// components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'; // Using lucide-react for social icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Smart Shop",
      links: [
        { name: "About Us", href: "/about-smart-shop" },
        { name: "Press", href: "/press" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact-us" }, // General contact, FAQ separate
      ],
    },
    {
      title: "Shopping with Us",
      links: [
        { name: "How It Works", href: "/how-it-works" },
        { name: "Our Stores", href: "/stores" },
        { name: "Delivery Information", href: "/delivery" },
        { name: "Payment Options", href: "/payment-options" },
      ],
    },
    {
      title: "Guides & Inspiration",
      links: [
        { name: "Recipes", href: "/recipes" },
        { name: "Themes & Collections", href: "/themes" },
        { name: "Food Blog", href: "/blog" },
      ],
    },
    {
      title: "Customer Support",
      links: [
        { name: "FAQ", href: "/faq" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top part: Link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:text-green-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle part: Social media and other info */}
        <div className="border-t border-gray-700 pt-8 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h4 className="text-white font-medium mb-4 text-center md:text-left">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-gray-300 hover:text-white transition-colors duration-200">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div className="text-center md:text-right">
            <h4 className="text-white font-medium mb-4">Payment Methods</h4>
            <div className="flex justify-center md:justify-end space-x-3">
              {/* Using text representations for common payment methods */}
              <div className="bg-white text-gray-800 px-2 py-1 text-xs font-bold rounded">VISA</div>
              <div className="bg-white text-gray-800 px-2 py-1 text-xs font-bold rounded">MASTERCARD</div>
              <div className="bg-[#ffb3c7] text-gray-800 px-2 py-1 text-xs font-bold rounded">KLARNA</div>
              <div className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-bold rounded">BANK</div>
            </div>
          </div>
        </div>

        {/* Bottom part: Copyright */}
        <div className="text-center text-xs text-gray-500 border-t border-gray-700 pt-8">
          <p>&copy; {currentYear} Smart Shop. All rights reserved.</p>
          <p className="mt-1">Original site Matspar.se inspiration.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
