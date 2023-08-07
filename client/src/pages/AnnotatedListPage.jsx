import React, { useState, useEffect } from "react";
import axios from "axios";
import { AudioSegment } from "../components/AudioSegment";
import { Pagination } from "../components/Pagination";

export const AnnotatedListPage = () => {
  const [annotatedList, setAnnotatedList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/aanotated");
        console.log(response.data);
        if (isMounted) {
          setAnnotatedList(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, []);

  const filesPerPage = 5;
  const lastFileIndex = currentPage * filesPerPage;
  const firstFileIndex = lastFileIndex - filesPerPage;
  const currentFiles = annotatedList.slice(firstFileIndex, lastFileIndex);
  const nPage = Math.ceil(annotatedList.length / filesPerPage);

  return (
    <div className="mt-5">
      {annotatedList && (
        <div>
          <AudioSegment annotatedList={currentFiles} />
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            nPage={nPage}
          />
        </div>
      )}
    </div>
  );
};
