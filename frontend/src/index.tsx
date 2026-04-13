/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import Layout from "./Layout.tsx";
import Home from "./pages/Home.tsx";
import Lesson from "./pages/Lesson.tsx";
import "./index.css";

const root = document.getElementById("root");

render(
  () => (
    <Router root={Layout}>
      <Route path="/" component={Home} />
      <Route path="/lesson/:tier/:slug" component={Lesson} />
    </Router>
  ),
  root!
);
