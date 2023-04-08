import { Header } from "../widgets/header/header";
import { Routes, Route } from "react-router-dom";
import { PersonVideoPage } from "../pages/upload-video-page/person-video-page";

export const App = () => {
  return (
    <div id="app-root">
      <Header />
      <Routes>
        <Route path="/" element={<div>content</div>}></Route>
        <Route path="/person/:id" element={<PersonVideoPage />}></Route>
        <Route path="*" element={<div>Not found</div>}></Route>
      </Routes>
    </div>
  );
};
