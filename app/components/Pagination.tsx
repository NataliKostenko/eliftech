"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showMax = 3;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = 1; i <= showMax; i++) pages.push(i);

      if (currentPage > showMax && currentPage < totalPages) {
        if (currentPage > showMax + 1) pages.push("...");
        if (!pages.includes(currentPage)) pages.push(currentPage);
      }

      if (currentPage < totalPages - 1) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8 mb-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
      >
        ←
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          disabled={page === "..."}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`px-3 py-1 border rounded-md text-sm transition-all ${
            currentPage === page
              ? "bg-[#376E6F] text-white border-[#2F4454] shadow-sm"
              : page === "..."
                ? "border-transparent cursor-default"
                : "bg-white text-[#2F4454] border-gray-200 hover:border-[#376E6F] hover:bg-[#376E6F]/5"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 border rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm"
      >
        →
      </button>
    </div>
  );
}
