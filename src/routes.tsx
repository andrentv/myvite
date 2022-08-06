import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { TasksForm } from "./pages/Tasks/Form";
import { FormEdit } from "./pages/Tasks/FormEdit";
import { TasksDetail } from "./pages/Tasks/Detail";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tarefas" element={<Tasks />} />
      <Route path="/tarefas_cadastro" element={<TasksForm />} />
      <Route path="/tarefas_cadastro/:id" element={<FormEdit />} />
      <Route path="/tarefas/:id" element={<TasksDetail />} />
    </Routes>
  );
};
