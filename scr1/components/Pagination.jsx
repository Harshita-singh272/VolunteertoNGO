import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages
}) => {

  const pages = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="browse_pagination">

      {/* PREVIOUS */}

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(
            currentPage - 1
          )
        }
      >
        ←
      </button>


      {/* PAGE NUMBERS */}

      {pages.map((page) => (

        <button
          type="button"
          key={page}
          className={
            currentPage === page
              ? "pagination_active"
              : ""
          }
          onClick={() =>
            setCurrentPage(page)
          }
        >
          {page}
        </button>

      ))}


      {/* NEXT */}

      <button
        type="button"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(
            currentPage + 1
          )
        }
      >
        →
      </button>

    </div>
  );
};

export default Pagination;