import axios from "axios"

export function setToken(token: string){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}