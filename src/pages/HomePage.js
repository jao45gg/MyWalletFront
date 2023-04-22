import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage({ updateApp }) {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

    if (!token) return navigate("/");

    axios.get(`${process.env.REACT_APP_API_URL}/getUser`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUser(res.data))
      .catch(err => {
        if (Array.isArray(err.response.data)) {
          err.response.data.forEach(element => {
            alert(element);
          });
        } else {
          alert(err.response.data);
        }
      });

    axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTransactions(res.data))
      .catch(err => {
        if (Array.isArray(err.response.data)) {
          err.response.data.forEach(element => {
            alert(element);
          });
        } else {
          alert(err.response.data);
        }
      });

  }, [updateApp, navigate, token]);

  user.balance = Number(user.balance);

  function logOut() {
    axios.delete(`${process.env.REACT_APP_API_URL}/logOut`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        localStorage.removeItem("token");
        navigate("/");
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
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logOut} />
      </Header>

      <TransactionsContainer>
        <ul className={transactions.length <= 0 ? "none" : ""}>
          {transactions.map((t, index) =>
            <ListItemContainer key={index}>
              <div>
                <span>{t.date}</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={t.type === "input" ? "positivo" : "negativo"}>{t.value.toFixed(2)}</Value>
            </ListItemContainer>
          )}
        </ul>

        <article className={transactions.length <= 0 ? "none" : ""}>
          <strong>Saldo</strong>
          <Value color={user.balance >= 0 ? "positivo" : "negativo"}>{user.balance.toFixed(2)}</Value>
        </article>

        <div className={transactions.length > 0 ? "none" : "empty"}>
          <h1>
            Não há registros de entrada ou saída
          </h1>
        </div>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saída")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .empty {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
      text-align: center;
      width: 80%;
      color: #868686;
      font-weight: 400;
      font-size: 20px;
    }
  }
  .none {
    display: none;
  }
  ul {
    max-height: 53vh;
    overflow-y: scroll;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`