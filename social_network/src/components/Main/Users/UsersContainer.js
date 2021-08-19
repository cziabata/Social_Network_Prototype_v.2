import { connect } from "react-redux";
import { getUsers, onPageChanged, unfollowUser, followUser } from "../../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";
import { NavLink } from "react-router-dom";

export class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }
    onPageChanged = (pageNumber) => {
        this.props.onPageChanged(this.props.pageSize, pageNumber);
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
                    ? <button disabled={this.props.isFollowingProgress.some(id => id === user.id)} onClick={ () => {
                        this.props.unfollowUser(user.id)} }>Unfollow</button> 
                    : <button disabled={this.props.isFollowingProgress.some(id => id === user.id)} onClick={() => {
                        this.props.followUser(user.id)} }>Follow</button>}</div>
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
        isFollowingProgress: state.usersReducer.isFollowingProgress
    }
}

export default connect(mapStateToProps, {
    getUsers,
    onPageChanged,
    unfollowUser,
    followUser
})(UsersContainer)