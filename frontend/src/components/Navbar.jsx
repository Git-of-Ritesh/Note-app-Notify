import React from 'react'
import logo from '../assets/logo/logo.png'
import Searchbar from './searchbar/searchbar'


const Navbar = () => {
  return (
    <nav className="flex bg-white text-black p-3">

      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
        <span className="-ml-1 text-3xl font-bold font-Logo">Notetify</span>
      </div>

      {/*search bar*/}
      <Searchbar/>

    </nav>
  )
}

export default Navbar