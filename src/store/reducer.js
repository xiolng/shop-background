import {SETBREAD, SETTOKEN, SETUSER} from "@/store/action-type"

const initState = {
    breadcrumb: JSON.parse(localStorage.getItem("bread")) || {
        parent: "Home",
        name: "Dashboard"
    },
    token: localStorage.getItem("token") || '',
    userList: JSON.parse(localStorage.getItem("userList")) || ''
}

export default function mainConfig(state = initState, action) {
    switch (action.type) {
        case SETBREAD:
            return {...state, breadcrumb: action.breadcrumb}
        case SETTOKEN:
            return {...state, token: action.token}
        case SETUSER:
            return {...state, userList: action.userList}
        default:
            return state
    }
}
