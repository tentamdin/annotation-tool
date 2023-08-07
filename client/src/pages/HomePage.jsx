import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
export const HomePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="d-grid gap-4 col-6 mx-auto">
        <button
          onClick={() => navigate("/annotation")}
          className="btn btn-primary fs-4"
          type="button"
        >
          Start Annotation
        </button>
        <button
          onClick={() => navigate("/annotated")}
          className="btn btn-primary fs-4"
          type="button"
        >
          Check Annotations
        </button>
      </div>
    </div>
  );
};
