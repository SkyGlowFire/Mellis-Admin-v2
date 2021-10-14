import axios from "axios"

export function setToken(token: string){
    console.log('token ', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}