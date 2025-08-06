// import React from 'react';

// const Header = () => {
//   return (
//     <header className="bg-gray-800/70 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-700">
//       <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
//           Love Babbar's DSA Sheet
//         </h1>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React from 'react';
import { MenuIcon } from './icons'; // 1. MenuIcon ला icons.jsx मधून इम्पोर्ट करा

// 2. Header आता 'onMenuClick' नावाचा एक फंक्शन props म्हणून घेईल
const Header = ({ onMenuClick }) => {
  return (
    // 3. z-index वाढवा (z-40), जेणेकरून तो साईडबारच्या overlay च्या वर राहील
    <header className="bg-gray-800/70 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
          DSA Practice
        </h1>
        
        {/* 4. हे हॅम्बर्गर मेनू बटण आहे */}
        {/* हा फक्त मोबाईलवर दिसेल (lg:hidden म्हणजे मोठ्या स्क्रीनवर लपलेला) */}
        <button 
          onClick={onMenuClick} // 5. यावर क्लिक केल्यावर App.jsx मधील फंक्शन चालेल
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label="Open sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;