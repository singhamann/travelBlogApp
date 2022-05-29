export default function setToken(payload){
    return { type: 'SET_TOKEN', payload}
}
export function destToken(){
    return { type: 'DEST_TOKEN'}
}

export function setUserId(payload){
    return { type: 'SET_USERID', payload}
}

export function setUserDetails(payload){
    return { type: 'SET_USER_DETAILS', payload}
}