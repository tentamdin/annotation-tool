import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillPlayFill } from "react-icons/bs";
import { AudioPlayer } from "../components/AudioPlayer";

export const AnnotationPage = () => {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const [transcript, setTranscript] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (state) {
      const { file } = state;
      setTranscript(file.transcript);
      setFiles(file);
      console.log("file value", file, file);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3030/unaanotated");
          console.log(response.data);
          if (isMounted) {
            setFiles(response.data);
            setTranscript(response.data[index].transcript);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
    return () => (isMounted = false);
  }, []);

  const handleFileIndexChange = (response) => {
    console.log("inside handleFileIndexChange ");
    setTranscript(files[index + 1].transcript);
    setIndex(index + 1);
    console.log(response.data);
  };

  // update the current file data and display next file
  const updateFileData = (status, id) => {
    axios
      .put("http://localhost:3030/update", { id, status, transcript })
      .then((response) => {
        state ? navigate("/") : handleFileIndexChange(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-5">
        <AudioPlayer state={state} files={files} index={index} />
        <div className="form-floating mt-5">
          <textarea
            value={transcript || ""}
            onChange={(e) => setTranscript(e.target.value)}
            className="form-control"
            placeholder="Type here..."
            id="transcript"
            style={{
              height: 500,
            }}
          ></textarea>
          <label htmlFor="transcript">Transcript</label>
        </div>
        <div className="mt-5 d-flex justify-content-evenly mx-auto w-50">
          <button
            onClick={() =>
              updateFileData("Submit", state ? files?.id : files[index]?.id)
            }
            type="button"
            className="btn btn-success btn-lg"
          >
            Success
          </button>
          <button
            onClick={() =>
              updateFileData("Flag", state ? files?.id : files[index]?.id)
            }
            type="button"
            className="btn btn-warning  btn-lg"
          >
            Flag
          </button>
          <button
            onClick={() =>
              updateFileData("Ignore", state ? files?.id : files[index]?.id)
            }
            type="button"
            className="btn btn-secondary  btn-lg"
          >
            Ignore
          </button>
        </div>
      </div>
    </>
  );
};

// {files && (
//     <audio controls>
//       <source src={fetchAudioURL()} type="audio/mp3" />
//       {/* Adjust the type based on your audio file type */}
//     </audio>
//   )}

// <button className="mt-4">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="16"
//   height="16"
//   fill="currentColor"
//   className="bi bi-play-fill"
//   viewBox="0 0 16 16"
// >
//   <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
// </svg>
// </button>
