import axios from 'axios'

export const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `${sessionStorage.getItem("token")}`,
  },
  proxy: {
    host: process.env.REACT_APP_API_URL,
    port: process.env.REACT_APP_API_PORT
  },
  crossDomain: true
})
