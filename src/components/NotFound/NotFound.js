import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>

        <div className="flex">
            <div>
                <h2>Page Not Found</h2>
                <Link to="/">Go Home</Link>
            </div>
        </div>
    </>
  )
}

export default NotFound