import axios from 'axios'
import { Toast } from '../components/toasty'

const AxiosWithConfig = axios.create({
  baseURL: `http://${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': `${sessionStorage.getItem("token")}`,
  },
  proxy: {
    host: process.env.REACT_APP_API_URL,
    port: process.env.REACT_APP_API_PORT
  },
  crossDomain: true,
})

AxiosWithConfig.interceptors.response.use(undefined,
  error => {
    if (String(error.response.status) === '498') {
      Toast('Sua sessão expirou, faça login novamente', 'error')
      setTimeout(() => {
        window.location.assign('/')
        window.sessionStorage.clear()
      }, 3000)
    }

    if (String(error.response.status) === '400') {
      Toast('Falha ao processar sua requisição, contate o suporte', 'error')
    }
    
    return Promise.reject(error)
  })

export const api = AxiosWithConfig