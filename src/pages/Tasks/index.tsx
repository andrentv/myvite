import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Badge, Button } from "react-bootstrap";
import api from "../../services/api";

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

export const Tasks: React.FC = () => {
  const [bills, setBills] = useState<ITask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    const response = await api.get("/bills");
    setBills(response.data);
  }

  async function finishedBill(id: number) {
    await api.patch(`/bills/${id}`);
    loadBills();
  }

  async function delBill(id: number) {
    await api.delete(`/bills/${id}`);
    loadBills();
  }

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newBill() {
    navigate("/tarefas_cadastro");
  }

  function editBill(id: number) {
    navigate(`/tarefas_cadastro/${id}`);
    //console.log("edit")
  }

  function viewBill(id: number) {
    navigate(`/tarefas/${id}`);
    //console.log("edit")
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tasks Page</h1>
        <Button size="sm" variant="dark" onClick={newBill}>
          Nova Despesa
        </Button>
      </div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Data Atualização</th>
            <th>Data Pagamento</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.title}</td>
              <td>{bill.description}</td>
              <td>R$ {bill.valor}</td>
              <td>{formatDate(bill.created_at)}</td>
              <td>{formatDate(bill.updated_at)}</td>
              <td>
                <Badge variant={bill?.finished ? "success" : "warning"}>
                  {bill?.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => editBill(bill.id)}
                >
                  Editar
                </Button>{" "}
                <Button
                  disabled={bill.finished}
                  onClick={() => finishedBill(bill.id)}
                  size="sm"
                  variant="success"
                >
                  Finalizar
                </Button>{" "}
                <Button
                  onClick={() => viewBill(bill.id)}
                  size="sm"
                  variant="info"
                >
                  Visualizar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => delBill(bill.id)}
                >
                  Remover
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
