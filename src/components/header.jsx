import React from 'react'
import { Link } from 'react-router-dom'

function TopApp() {
  return (
    <div className=' block bg-black text-white p-5'>
      <Link to='/random'>random</Link>
    </div>
  )
}

export default TopApp