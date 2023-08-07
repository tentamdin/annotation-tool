import React from "react";

export const Pagination = ({ setCurrentPage, currentPage, nPage }) => {
  let pages = [];

  for (let i = 1; i <= nPage; i++) {
    pages.push(i);
  }

  const prevPage = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="fixed-bottom mb-5">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" onClick={prevPage}>
            Previous
          </a>
        </li>
        {pages.map((page, index) => {
          return (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};
