import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signIn(e) {

    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/signIn`, {
      email: email,
      password: password
    })
      .then(() => navigate("/home"))
      .catch(err => {
        if (err.response.data) {
          err.response.data.forEach(element => {
            alert(element);
          });
        } else {
          alert(err.message);
        }
        console.log(err);
      })
  }

  return (
    <SingInContainer>
      <form onSubmit={signIn}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} />
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
