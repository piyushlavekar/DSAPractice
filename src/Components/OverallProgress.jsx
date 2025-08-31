
import React from 'react';

const OverallProgress = ({ percentage, solved, total }) => {
  return (
    // RESPONSIVE: Use smaller padding on mobile (p-4) and larger on medium screens and up (md:p-6).
    <div className="bg-gradient-to-r from-indigo-800 to-purple-800 p-4 md:p-6 rounded-xl mb-6 md:mb-8 shadow-2xl border border-purple-600">
      <div className="flex justify-between items-center mb-2">
        {/* RESPONSIVE: Use smaller font size on mobile and larger on medium screens up. */}
        <h2 className="text-xl md:text-2xl font-bold text-white">Overall Progress</h2>
        <span className="text-xl md:text-2xl font-bold text-white">{percentage}%</span>
      </div>
      {/* RESPONSIVE: Use smaller text on mobile. */}
      <p className="text-sm md:text-base text-purple-300 font-semibold mb-3">{solved} / {total} Problems Solved</p>
      <div className="w-full bg-gray-900/50 rounded-full h-3.5">
        <div
          className="bg-gradient-to-r from-green-400 to-teal-400 h-3.5 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OverallProgress;