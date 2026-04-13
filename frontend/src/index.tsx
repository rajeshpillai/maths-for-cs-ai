/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Lesson from "./pages/Lesson.tsx";
import "./index.css";

const root = document.getElementById("root");

// Use Vite's base URL for GitHub Pages subpath routing
const base = import.meta.env.BASE_URL;

render(
  () => (
    <Router root={Layout} base={base === "/" ? undefined : base.replace(/\/$/, "")}>
      <Route path="/" component={Home} />
      <Route path="/lesson/:tier/:slug" component={Lesson} />
    </Router>
  ),
  root!
);
