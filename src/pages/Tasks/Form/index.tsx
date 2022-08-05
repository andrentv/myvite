import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../../services/api";

import "./index.css";

interface iTask {
  title: string;
  description: string;
  valor: number;
}

export const TasksForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [model, setModel] = useState<iTask[]>({
    title: " ",
    description: " ",
    valor: " ",
  });

  useEffect(() => {
    if (id !== undefined) {
      findBill(id);
    }
  }, [id]);

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put(`/bills/${id}`, model);
    } else {
      const response = await api.post("/bills", model);
    }
    back();
    console.log("edit");
  }

  async function findBill(id) {
    const response = await api.get(`bills/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
      valor: response.data.valor,
    });
  }

  function back() {
    navigate(-1);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>New Bill</h1>
        <Button variant="dark" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={model.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={model.description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              name="valor"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
            />
          </Form.Group>
          <br />
          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};
