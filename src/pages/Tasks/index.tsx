import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import api from "../../services/api";

import "./index.css";

import moment from "moment";

interface iTask {
  id: number;
  title: string;
  description: string;
  valor: number;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

export const Tasks: React.FC = () => {
  const [bills, setBills] = useState<iTask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    const response = await api.get("/bills");
    setBills(response.data);
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
                <Badge variant={bill.finished ? "success" : "warning"}>
                  {bill.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>
              </td>
              <td>
                <Button
                  disabled={bill.finished}
                  size="sm"
                  variant="primary"
                  onClick={() => editBill(bill.id)}
                >
                  Editar
                </Button>{" "}
                <Button disabled={bill.finished} size="sm" variant="success">
                  Finalizar
                </Button>{" "}
                <Button size="sm" variant="info">
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
