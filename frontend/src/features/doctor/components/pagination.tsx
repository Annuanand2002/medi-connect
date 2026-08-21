import { ChevronLeft, ChevronRight } from "lucide-react";

import { getPaginationRange } from "@/utils/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPaginationRange(currentPage, totalPages, siblingCount);

  return (
    <div className="doctor-pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-arrow"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="pagination-pages">
        {pages.map((item, index) =>
          item === "..." ? (
            <span key={`ellipsis-${index}`} className="pagination-ellipsis">
              •••
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={
                currentPage === item
                  ? "pagination-page pagination-page-active"
                  : "pagination-page"
              }
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-arrow"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
