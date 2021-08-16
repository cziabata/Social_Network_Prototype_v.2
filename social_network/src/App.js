import React from "react";
import "./App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Content } from "./components/Main/Content";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <HeaderContainer />
      <Content />
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
