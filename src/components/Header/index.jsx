import { Container, Profile, Logout } from "./styles";

import { useNavigate } from 'react-router-dom';

import { RiShutDownLine } from 'react-icons/ri';

import { authUse } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

export function Header() {
  const { signOut, user } = authUse();
  const navigate = useNavigate();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Container>
      <Profile to="/profile/1">
        <img
          src={avatarUrl}
          alt='Foto do usuário'
        />

        <div>
          <span>Bem-vindo, </span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  )
}