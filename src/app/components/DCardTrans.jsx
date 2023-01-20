import React from 'react'
import "./components.scss"

function DCardTrans({title, value}) {
  return (
    <div className='cards-trans'>
        <h4>{title}</h4>
        <h2>{value}</h2>
    </div>
  )
}

export default DCardTrans