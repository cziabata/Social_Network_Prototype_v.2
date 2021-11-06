import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, selectCurrentUserLogin } from "../../redux/selectors/authSelectors";
import { logout } from "../../redux/authReducer";
const { Header } = Layout;

export const AppHeader = (props) => {

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();
    const logoutCallback = () => {
      dispatch(logout())
    }
    return (
        <Header className="header">
        <div className="logo" />
        <Row>
          <Col span={20}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Col>
          <Col>
          { isAuth ? <div>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <span>{login}</span><Button onClick={logoutCallback}>Logout</Button>
                     </div> 
                   : <NavLink to="/login">Login</NavLink>}
          </Col>
        </Row>
      </Header>
    )
}