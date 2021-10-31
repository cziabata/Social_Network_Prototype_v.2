import React from "react";
import "./App.module.scss";
import HeaderContainer from "./components/Header/HeaderContainer";
import { Main } from "./components/Main/Content";
import { Navbar } from "./components/Navbar/Navbar";
import { AppFooter } from "./components/Footer/Footer";
import styles from "./App.module.scss";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "./redux/appReducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import ProfileContainer from "../src/components/Main/Profile/ProfileContainer";
import UserProfileContainer from "../src/components/Main/Users/UserProfile/UserProfileContainer";
import UsersContainer from "../src/components/Main/Users/UsersContainer";
import Login from "../src/components/Login/Login";
import { Route } from "react-router-dom";
import MessagesContainer from "./components/Main/Messages/MessagesContainer";
import { NavLink } from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import stylesNav from "../src/components/Navbar/Navbar.module.scss";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="My Profile">
                <Menu.Item key="1"> <NavLink to="/profile">
                <div className={styles.link_wrapper}><Icon>account_circle</Icon><span>Profile</span></div>
            </NavLink></Menu.Item>
                <Menu.Item key="2"><NavLink to="/messages">
                <div className={styles.link_wrapper}><Icon>question_answer</Icon><span>Messages</span></div>
            </NavLink></Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Route render={ () => <ProfileContainer /> } exact path="/profile"/>
            <Route render={ () => <UserProfileContainer /> }  path="/profile/:userId"/>
            <Route render={ () => <UsersContainer /> } path="/users"/>
            <Route render={ () => <MessagesContainer />} path="/messages"/>
            <Route render={ () => <Login /> } path="/login"/>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  
      /*<div className={styles.app}>
        <HeaderContainer />
        <Main />
        <Navbar />
        <AppFooter />
      </div>*/
    );
  }
}
let mapStateToProps = (state) => ({
  initialized: state.appReducer.initialized
})

export default compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);
