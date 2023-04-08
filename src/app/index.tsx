import { Header } from "../widgets/header/header";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div id={"app-root"}>
      <Header />
      <Routes>
        <Route path={"/"} element={<div>content</div>}></Route>
      </Routes>
    </div>
  );
};
