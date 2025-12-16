import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <p className="font-semibold text-blue-400 text-4xl md:text-6xl">
        Not Found
      </p>

      <Link
        to="/"
        className="
      relative px-8 py-3 text-lg font-medium text-blue-400
      border border-blue-500 rounded-xl
      overflow-hidden
      transition-all duration-300
      hover:text-black
      group
    "
      >
        <span
          className="
        absolute inset-0 bg-blue-400
        translate-y-full
        group-hover:translate-y-0
        transition-transform duration-300
      "
        />
        <span className="relative z-10">Home</span>
      </Link>
    </div>

  )
}

export default NotFound
