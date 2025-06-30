import React, { useEffect, useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { useSearchParams } from 'react-router-dom';
import { TMeta } from '../../types/util.type';

type TProps = TMeta & { delta?: number; onPageChange: (page: number) => void | any };

function Pagination({ totalResult: total, limit, page, delta = 2, onPageChange }: TProps) {
  const [pages, setPages] = useState<(number | string)[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page || 1);
  const totalPages = Math.ceil(total / limit);
  const searchParams = useSearchParams();
  useEffect(() => {
    const range = [];
    let left = Math.max(2, currentPage - delta);
    let right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) {
      range.push('...');
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    setPages(range);
  }, [currentPage, searchParams.toString()]);

  const goNext = () => {
    const next = currentPage + 1;
    if (next > totalPages) {
      return;
    } else {
      setCurrentPage(next);
      onPageChange(next);
    }
  };
  const goPrev = () => {
    const prev = currentPage - 1;
    if (prev <= 0) {
      return;
    } else {
      setCurrentPage(prev);
      onPageChange(prev);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={goPrev} className="text-xl">
        <FcPrevious />
      </button>
      {pages.map(page => (
        <button
          key={'page-' + page}
          disabled={typeof page === 'string'}
          onClick={() => {
            const p = typeof page === 'string' ? 1 : page;
            setCurrentPage(p);
            onPageChange(p);
          }}
          className={`${currentPage === page ? 'bg-secondary text-white ' : 'bg-primary text-white '} md:size-10 size-8 rounded-lg `}
        >
          {page}
        </button>
      ))}
      <button onClick={goNext} className="text-xl">
        <FcNext />
      </button>
    </div>
  );
}

export default Pagination;
