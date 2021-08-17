import * as axios from "axios";

let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "6847b8b0-6480-41e7-80b9-70115535fc82"
    }
})

export const usersAPI = {
    getUsers(pageSize, currentPage){
       return instance.get(`users?count=${pageSize}&page=${currentPage}`).then(
            response => { return response.data }
        )
    }
}