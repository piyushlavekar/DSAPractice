import React from 'react';
// Make sure to replace './assets/logo.svg' with the actual path to your logo
import MyLogo from '../assets/DSA.svg'; 

const Preloader = () => {
  return (
    // This is the main container that creates the blurred background effect
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="text-center">
        {/* Your Logo */}
        <img 
          src={MyLogo} 
          alt="Loading Logo" 
          className="h-24 w-24 md:h-32 md:w-32 animate-pulse" // animate-pulse gives it a nice loading feel
        />
        <p className="mt-4 text-lg font-semibold text-gray-300">Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;