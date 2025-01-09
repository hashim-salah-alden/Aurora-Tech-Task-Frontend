import Image from "next/image";
import Link from "next/link";

import { CiPhone } from "react-icons/ci";
import { CiMail } from "react-icons/ci";


import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";


const footer = function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-16 border-t border-[#2a2a2a] text-center md:text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-48 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative mx-auto md:mx-0">
                <Image
                  src="/footerlogo.png"
                  alt="PhysioRehab Logo"
                  width={280}
                  height={100}
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Dignissim tortor donec ultrices sed. Nisi sit lorem eleifend pharetra vulputate posuere egestas tempor. Eget adipiscing dignissim sollicitudin neque elit.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 ">
            <h3 className="text-xl font-semibold mb-6">Contact us</h3>
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3">
                <CiPhone className="w-5 h-5 text-teal-500" />
                <span >+2010145674567</span>
              </div>
              <div className="flex items-center space-x-3">
                <CiPhone className="w-5 h-5 text-teal-500" />
                <span>+2010145674567</span>
              </div>
              <div className="flex items-center space-x-3">
                <CiPhone className="w-5 h-5 text-teal-500" />
                <span>+2010145674567</span>
              </div>
              <div className="flex items-center space-x-3">
                <CiMail className="w-5 h-5 text-teal-500" />
                <span>PhysioRehab@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4 hidden md:block">
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/recovery">Recovery session</Link>
              </li>
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/physiotherapy">Physiotherapy session</Link>
              </li>
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/pt-trainer">PT trainer session</Link>
              </li>
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/weight-cupping">Weight cupping session</Link>
              </li>
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/shockwave">Shockwave session</Link>
              </li>
              <li className="hover:text-teal-500 transition-colors">
                <Link href="/services/nutrition">Nutrition session</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
      </div>
      <div className="mt-16 pt-8 border-t border-[#2a2a2a] max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2024 Site designed and created by Aurora Tech
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
              <FaFacebookSquare className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
              <FaSquareTwitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
              <FaInstagramSquare className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
              <FaLinkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
              <FaYoutubeSquare className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}





export default footer;