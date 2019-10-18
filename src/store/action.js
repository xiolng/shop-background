import {SETBREAD, SETTOKEN, SETUSER} from "./action-type"

export const setBreads = breadcrumb => {
    localStorage.setItem("bread", JSON.stringify(breadcrumb))
    return {
        type: SETBREAD,
        breadcrumb
    }
}
export const setTokens = token => {
    localStorage.setItem("token", token)
    return {
        type: SETTOKEN,
        token
    }
}
export const setUsers = userList => {
    localStorage.setItem("userList", JSON.stringify(userList))
    return {
        type: SETUSER,
        userList
    }
}
