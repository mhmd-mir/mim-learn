import React, { useEffect, useState } from "react";
import "./Pagination.css";

import { Link, useParams } from "react-router-dom";

export default function Pagination({
  items,
  itemsNumberInEachPage,
  setPaginatedItems,
  mainPath,
}) {
  const [pageCount, setPageCount] = useState(1);
  const { pageNumber } = useParams();

  useEffect(() => {
    

    let end = pageNumber * itemsNumberInEachPage;
    let start = end - itemsNumberInEachPage;
    let paginatedItems = items.slice(start, end);
    setPaginatedItems(paginatedItems);

    // set page count
    let pageCount = Math.ceil(items.length / itemsNumberInEachPage);
    setPageCount(pageCount);
  }, [pageNumber , items]);
  return (
    <div className="py-3 my-4">
      <div className="pageBtns d-flex justify-content-center">
        {Array(pageCount).fill(0).map((item, index) => {
          return (
            <Link className="flatLink" to={`${mainPath}/${index +1}`}>
              <div className={`pageBtn ${(pageNumber == index + 1 ) ? 'activePage' : null}`}>{index + 1}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
