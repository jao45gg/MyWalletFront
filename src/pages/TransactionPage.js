import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionsPage({ setUpdate }) {

  const navigate = useNavigate();
  const { tipo } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) navigate("/");

  });

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");

  function sendTransaction(e) {

    e.preventDefault();

    let type;
    if (tipo === "entrada") type = "input";
    if (tipo === "saída") type = "output";

    axios.post(`${process.env.REACT_APP_API_URL}/newTransaction/${type}`, {
      value,
      description
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        setUpdate(1);
        navigate("/home");
      })
      .catch(err => {
        if (Array.isArray(err.response.data)) {
          err.response.data.forEach(element => {
            alert(element);
          });
        } else {
          alert(err.response.data);
        }
      })
  }

  return (
    <TransactionsContainer>
      <h1>{`Nova ${tipo}`}</h1>
      <form onSubmit={sendTransaction}>
        <input placeholder="Valor" type="text" required value={value} onChange={e => setValue(e.target.value)} />
        <input placeholder="Descrição" type="text" required value={description} onChange={e => setDescription(e.target.value)} />
        <button>{`Salvar ${tipo}`}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
