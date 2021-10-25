import { connect } from "react-redux";
import { getUsers, onPageChanged, unfollowUser, followUser } from "../../../redux/usersReducer";
import { Users } from "./Users";
import React from "react";
import styles from "./Users.module.scss";
import userIcon from "./../../../common/img/users.jpg";
import { NavLink } from "react-router-dom";
import { getTotalUsersCount, getAllUsers, getPageSize, getCurrentPage, getIsFetching, getIsFollowingProgress,
         getPortionSize } from "../../../redux/selectors/users-selectors";
import { UserItemType } from "../../../types/types";

type PropsType = {
    pageSize: number,
    currentPage: number,
    getUsers:(pageSize: number, currentPage:number)=>void,
    onPageChanged: (pageSize: number, pageNumber:number)=>void
}
export class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }
    onPageChanged = (pageNumber:number) => {
        this.props.onPageChanged(this.props.pageSize, pageNumber);
    }
    render() {
        let usersElements:Array<UserItemType> = this.props.users.map( user => (
            <div key={user.id}>
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

        return (
            <>
                <Users usersElements={usersElements} 
                       onPageChanged={this.onPageChanged} 
                       isFetching={this.props.isFetching}
                       currentPage={this.props.currentPage}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       portionSize={this.props.portionSize}/>
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        users: getAllUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state),
        portionSize: getPortionSize(state),
    }
}

export default connect(mapStateToProps, {
    getUsers,
    onPageChanged,
    unfollowUser,
    followUser
})(UsersContainer)