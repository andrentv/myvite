import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import api from "../../../services/api";

import "./index.css";

import moment from "moment";

interface ITask {
  id: number;
  title: string;
  description: string;
  valor: number;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

export const TasksDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bill, setBill] = useState<ITask>();

  useEffect(() => {
    findBill(id);
  }, [id]);

  async function findBill(id: number) {
    const response = await api.get<ITask>(`/bills/${id}`);
    console.log(response);
    setBill(response.data);
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function back() {
    navigate(-1);
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes da Despesa</h1>
        <Button size="sm" variant="dark" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Body>
          <Card.Title>{bill?.title}</Card.Title>

          <Card.Text>
            {bill?.description}
            <br />
            R$ {bill?.valor}
            <br />
            <Badge variant={bill?.finished ? "success" : "warning"}>
              {bill?.finished ? "FINALIZADO" : "PENDENTE"}
            </Badge>
            <br />
            <strong>Data Compra</strong>
            <Badge variant="info">{formatDate(bill?.created_at)}</Badge>
            <br />
            <strong>Data Compra</strong>
            <Badge variant="info">{formatDate(bill?.updated_at)}</Badge>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
