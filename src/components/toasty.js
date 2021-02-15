import React from 'react'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Toast = (message, type) => {
  switch (type) {
    case 'success':
      return toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      })
    case 'error':
      return toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      })
    default:
      return toast.info(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      })
  }
}

export const ToastyContainer = () => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover={false}
    />
  )
}
