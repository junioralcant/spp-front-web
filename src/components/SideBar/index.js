import React, { useState, useEffect } from "react";
import {
  FiCamera,
  FiGrid,
  FiCodesandbox,
  FiAlignJustify,
  FiX,
} from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";
import { Link } from "react-router-dom";

import { logout } from "../../services/auth";

import { SideNav, Button, Background, Close, companyData } from "./styles";

import logo from "../../assets/logo-white.png";

const SideBar = ({ page, history }) => {
  const [pageName, setPageName] = useState("dashboard");
  const [sidebarActive, setSideBarActive] = useState(false);

  useEffect(() => {
    setPageName(page);
  }, [page]);

  function activeSidebar() {
    setSideBarActive(!sidebarActive);
  }

  function goOut() {
    logout();
    window.history.go(0);
  }

  return (
    <>
      <Button teste={sidebarActive ? "" : "teste"} onClick={activeSidebar}>
        <FiAlignJustify />
      </Button>
      <SideNav teste={sidebarActive ? "teste" : ""}>
        <strong>
          <span>
            <FiGrid />
          </span>

          <p>Tô Ligado SSMA</p>
        </strong>

        {/* <div className="companyData">
          <p>CNPJ: 22.743.714/0001-22</p>
          <p>RAZÃO SOCIAL: SB PEDREIRA LTDA</p>
          <p>OBRA: RONDONÓPOLIS - MT</p>
          <p>N FUNCIONÁRIOs: 28</p>
        </div> */}

        <div>
          <small>Menu</small>
        </div>

        <Link to="/" className={pageName === "dashboard" ? "active" : ""}>
          <span>
            <FiGrid />
          </span>
          <p>Dashboard</p>
        </Link>

        <Link to="/draw" className={pageName === "draw" ? "active" : ""}>
          <span>
            <FiCodesandbox />
          </span>
          <p>Sorteio</p>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 100,
          }}
        >
          <img src={logo} style={{ width: 120 }} />
        </div>

        <button onClick={goOut}>
          <span>
            <AiOutlinePoweroff />
          </span>
          <p>Sair</p>
        </button>
      </SideNav>
      <Background teste={sidebarActive ? "teste" : ""}>
        <Close onClick={activeSidebar}>
          <FiX />
        </Close>
      </Background>
    </>
  );
};

export default SideBar;
