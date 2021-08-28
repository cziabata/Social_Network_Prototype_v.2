import React from "react";
import "./App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Content } from "./components/Main/Content";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={styles.app}>
        <HeaderContainer />
        <Content />
        <Navbar />
        <Footer />
      </div>
    );
  }
}
let mapStateToProps = (state) => ({
  initialized: state.appReducer.initialized
})

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
