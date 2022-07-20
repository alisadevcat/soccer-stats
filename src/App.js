import React from "react";
import { Route, Routes } from "react-router-dom";

import Layout from './layouts/Layout';
import HomePage from "./pages/Home";
import Teams from "./pages/Teams";
import TeamCalendar from "./pages/TeamCalendar";
import CompetitionCalendar from "./pages/CompetitionCalendar";
import Competitions from "./pages/Competitions";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage />} />
          <Route path="teams/:id" element={<TeamCalendar />} />
          <Route path="teams" element={<Teams />}/>
          <Route path="competitions/:id" element={<CompetitionCalendar />} />
          <Route path="competitions" element={<Competitions />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
    </div>
  );
}


{/* <Route path="teams" element={<Teams />}>
<Route path=":id" element={<TeamCalendar />} />
</Route> */}