export default function reducer(status, action) {
    if (action.type === 'SET_TOKEN') {
        return { ...status, token: action.payload }
    } else if (action.type === 'DEST_TOKEN') {
        return { ...status, token: null }
    }
    else if (action.type === 'SET_USERID'){
        return { ...status, userId: action.payload}
    }
    else if (action.type === "SET_USER_DETAILS"){
        return { ...status, token: action.payload.token, userId: action.payload.userId}
    }
    return {token: localStorage.getItem("token"), userId: localStorage.getItem("userId")}
}