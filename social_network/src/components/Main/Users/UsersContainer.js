import { connect } from "react-redux";
import { follow, setCurrentPage, setUsers, unfollow, setTotalUsersCount, setIsFetching } from "../../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";
import * as axios from "axios";
import { NavLink } from "react-router-dom";

export class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`)
             .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            }
        )
    }
    onPageChanged = (pageNumber) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
             .then(response => {
                this.props.setIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
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
                    ? <button onClick={ () => {this.props.unfollow(user.id)}}>Unfollow</button> 
                    : <button onClick={() => {this.props.follow(user.id)}}>Follow</button>}</div>
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