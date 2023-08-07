import React from "react";
import { useNavigate } from "react-router-dom";

export const AudioSegment = ({ annotatedList }) => {
  const navigate = useNavigate();

  const redirectPage = (file) => {
    navigate("/annotation", { state: { file } });
  };

  return (
    <>
      <div className="w-75 text-center mx-auto">
        {annotatedList.map((list) => {
          return (
            <div
              className="border border-4 border-black rounded-1 p-2 my-4"
              key={list.id}
            >
              <label className="fs-2 fx-bold">Audio Segment {list.id}</label>
              <button
                onClick={() => redirectPage(list)}
                className="mx-4 px-4 py-2 rounded fs-5 w-25 cursor-pointer"
              >
                {list.status}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
