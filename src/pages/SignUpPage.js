import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  function signUp(e) {

    e.preventDefault();
    if (password !== password1) return alert("As senhas estão diferentes!");

    axios.post(`${process.env.REACT_APP_API_URL}/signUp`, {
      name: name,
      email: email,
      password: password
    })
      .then(() => navigate("/"))
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
    <SingUpContainer>
      <form onSubmit={signUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="E-mail" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" required value={password1} onChange={e => setPassword1(e.target.value)} />
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
