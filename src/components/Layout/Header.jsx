import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  margin-left: 20px;
  color: #666;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;

const LogoutButton = styled.button`
  margin-left: 20px;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const Header = () => {
  const state = useSelector((state) => state.auth);
  console.log(state);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <HeaderContainer>
      <Logo to="/">Movie Character Chat</Logo>
      <Nav>
        {state.username ? (
          <>
            <NavLink to="/characters">Characters</NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/signin">Login</NavLink>
            <NavLink to="/signup">Register</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
