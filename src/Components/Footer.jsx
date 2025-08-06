import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-center py-5 mt-12 border-t border-gray-700">
      <div className="container mx-auto px-6">
        <p className="text-sm text-gray-400"> 
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Made with ❤️ by <span className="font-semibold text-indigo-400">Piyush Lavekar</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;