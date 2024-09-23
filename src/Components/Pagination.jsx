



import React from "react";
import { useSelector } from "react-redux";

function Pagination({ handlePageChange, currentPage }) {
  const { user } = useSelector((state) => state.admin);
  const totalPages = Math.ceil(user.length / 10);

  return (
    <div className="mt-6 pt-5 w-full flex items-center justify-center gap-3">
      {/* First Page Button */}
      <button
        className={`rounded-full p-2 bg-gray-200 hover:bg-gray-300 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 20l-7-7 7-7M12 20l-7-7 7-7" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Previous Page Button */}
      <button
        className={`rounded-full p-2 bg-gray-200 hover:bg-gray-300 ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M14 7l-5 5 5 5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Page Number Buttons */}
      {[...Array(totalPages)].map((_, i) => (
        <button
          className={`px-4 py-2 rounded-full text-white font-semibold ${i + 1 === currentPage ? "bg-blue-600" : "bg-gray-400 hover:bg-blue-500"}`}
          onClick={() => handlePageChange(i + 1)}
          key={i}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        className={`rounded-full p-2 bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M10 7l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Last Page Button */}
      <button
        className={`rounded-full p-2 bg-gray-200 hover:bg-gray-300 ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path d="M5 4l7 7-7 7M12 4l7 7-7 7" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
