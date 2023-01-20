import React from 'react'
import "./components.scss"

function DCard({ title, value, bg_color = "red", max=null, min=null }) {
  return (
    <div className='d-cards' style={{ backgroundColor: bg_color }}>
      <h4>{title}</h4>
      <span>
        <h2>{value}</h2>
        <h6>{max!=null && `MAX: ${max}`} {min!=null && `, MIN: ${min}`}</h6>
      </span>
    </div>
  )
}

export default DCard