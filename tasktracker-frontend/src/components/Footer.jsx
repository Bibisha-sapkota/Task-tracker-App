import React from 'react';
import { FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
        
        {/* Logo and Description */}
        <div>
          <h3 className="text-xl font-bold mb-2">Task Tracker</h3>
          <p className="text-sm text-gray-200">
            Simplify your workflow and manage your tasks effectively.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-200">
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-white hover:text-gray-300">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center mt-6 text-sm text-gray-300">
        © {new Date().getFullYear()} Task Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
