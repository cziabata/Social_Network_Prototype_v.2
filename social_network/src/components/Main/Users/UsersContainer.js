import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, unfollow, setTotalUsersCount, setIsFetching } from "../../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";
import * as axios from "axios";
import { NavLink } from "react-router-dom";
import { usersAPI } from "../../../api/api";

export class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getUsers(this.props.pageSize, this.props.currentPage).then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }
    onPageChanged = (pageNumber) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(this.props.pageSize, pageNumber).then(data => {
                this.props.setIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            }
        )
    }

    render() {

        let usersElements = this.props.users.map( user => (
            <div>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userIcon} alt="avatar" className={styles.user_avatar}/>
                    </NavLink>
                </div>
                <span>{user.name}</span>
                <div>{user.status != null ? user.status : "Status empty"}</div>
                <div>User Information:</div>
                <div>{`User id is: ${user.id}`}</div>
                <div>{user.followed 
                    ? <button onClick={ () => {
                        axios.delete(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`, {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "6847b8b0-6480-41e7-80b9-70115535fc82"
                            }
                        })
                             .then(response => {
                                if(response.data.resultCode === 0) {
                                    this.props.unfollow(user.id)
                                }
                            }
                        )
                        }}>Unfollow</button> 
                    : <button onClick={() => {
                        axios.post(`https://social-network.samuraijs.com/api/1.0//follow/${user.id}`,{}, {
                            withCredentials: true,
                            headers: {
                                "API-KEY": "6847b8b0-6480-41e7-80b9-70115535fc82"
                            }
                        })
                             .then(response => {
                                if(response.data.resultCode === 0) {
                                    this.props.follow(user.id)
                                }
                            }
                        )
                    }}>Follow</button>}</div>
            </div>
        ))
        
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];

        for(let i=1; i<=pagesCount; i++) {
            pages.push(i)
        }

        return (
            <>
                <Users usersElements={usersElements} 
                       pages={pages} 
                       onPageChanged={this.onPageChanged} 
                       isFetching={this.props.isFetching}
                       currentPage={this.props.currentPage}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersReducer.users,
        totalUsersCount: state.usersReducer.totalUsersCount,
        pageSize: state.usersReducer.pageSize,
        currentPage: state.usersReducer.currentPage,
        isFetching: state.usersReducer.isFetching,
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching
})(UsersContainer)