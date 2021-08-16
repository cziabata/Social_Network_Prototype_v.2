import React from "react";
import "./App.module.scss";
import { Header } from "./components/Header/Header";
import { Content } from "./components/Main/Content";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import styles from "./App.module.scss";

function App(props) {
  return (
    <div className={styles.app}>
      <Header />
      <Content />
      <Navbar />
      <Footer />
    </div>
  );
}

export default App;
