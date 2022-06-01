import React from "react";
import "./scss/style.scss";

import ToDo from "./components/todo/todo.js";

import Header from "./components/header/header";
import Form from "./context/Form";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/settings" element={<Form />} />
      </Routes>
    </>
  );
}
