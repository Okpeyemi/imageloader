import React from 'react'
import { ClimbingBoxLoader, DotLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
        <DotLoader color="#1B4A6B" speedMultiplier={1} />
    </div>
  )
}

export default Spinner