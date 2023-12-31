import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Project } from "./pages/Project";
import { Analytics } from "@vercel/analytics/react";

export const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>

      <Analytics />
    </Router>
  );
};
