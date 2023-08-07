import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AnnotationPage } from "./pages/AnnotationPage";
import { AnnotatedListPage } from "./pages/AnnotatedListPage";

function App() {
  return (
    <>
      <main className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/annotation" element={<AnnotationPage />} />
            <Route path="/annotated" element={<AnnotatedListPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
