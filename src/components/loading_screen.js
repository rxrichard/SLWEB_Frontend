import React from 'react'
import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'none',
        maxHeight: '90vh',
        minHeight:  '79vh',
        width: '100%'
      }}
    >
        <ReactLoading type='spinningBubbles' color='#000000' height='10%' width='10%' />
    </div>
  )
}
