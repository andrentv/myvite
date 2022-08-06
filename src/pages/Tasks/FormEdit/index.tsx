import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Badge, Button } from "react-bootstrap";
import api from "../../../services/api";

import "./index.css";

interface ITask {
  title: string;
  description: string;
  valor: number;
  finished: boolean;
}

export const FormEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [model, setModel] = useState<ITask[]>({
    title: " ",
    description: " ",
    valor: " ",
    finished: " "
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
    //if (id !== undefined) {
    const response = await api.put(`/bills/${id}`, model);
    // } else {
    //  const response = await api.post("/bills", model);
    //}
    back();
  }

  async function findBill(id) {
    const response = await api.get(`bills/${id}`);
    setModel({
      title: response.data.title,
      description: response.data.description,
      valor: response.data.valor,
      finished: response.data.finished,
    });
  }

  function back() {
    navigate(-1);
  }
  
  
  const [bills, setBills] = useState<ITask[]>();
  
  useEffect(() => {
   // upBills();
  }, [id]);
  
  
  
  //await api.patch(`/bills/${id}`, bills);
  

  

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Edit Bill</h1>
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              name="description"
              value={model.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type="number"
              name="valor"
              value={model.valor}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <br />
            <Form.Control
              as="select"
              type="text"
              name="finished"
              value={bills.finished}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                updateModel(event)}
            >
              <option value={true}>FINALIZADO</option>
              <option value={false}>PENDENTE</option>
            </Form.Control>
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
