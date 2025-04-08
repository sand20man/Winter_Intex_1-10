import { useState } from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  const [inputPage, setInputPage] = useState('');

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 10) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  const handleJump = () => {
    const pageNum = parseInt(inputPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setInputPage('');
    }
  };

  return (
    <div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {generatePageNumbers().map((num, idx) =>
          typeof num === 'number' ? (
            <button
              key={idx}
              onClick={() => onPageChange(num)}
              className={currentPage === num ? 'active' : ''}
            >
              {num}
            </button>
          ) : (
            <span key={idx} className="px-2">
              {num}
            </span>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className="pagination-controls">
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
              onPageChange(1);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </label>

        <div className="jump-to-page">
          <label htmlFor="pageInput">Jump to page:</label>
          <input
            id="pageInput"
            type="number"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            className="page-input"
            min={1}
            max={totalPages}
          />
          <button className="btn-go" onClick={handleJump}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
