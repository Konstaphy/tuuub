import { Header } from "../widgets/header/header";
import { Routes, Route } from "react-router-dom";
import { UploadVideoPage } from "../pages/upload-video-page/upload-video-page";

export const App = () => {
  return (
    <div id={"app-root"}>
      <Header />
      <Routes>
        <Route path={"/"} element={<UploadVideoPage />}></Route>
      </Routes>
    </div>
  );
};
