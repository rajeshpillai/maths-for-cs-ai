import type { ParentProps } from "solid-js";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function Layout(props: ParentProps) {
  return (
    <div class="app-layout">
      <Sidebar />
      <main class="main-content">{props.children}</main>
    </div>
  );
}
