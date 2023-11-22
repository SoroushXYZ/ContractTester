import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { BiSolidCoffee } from "react-icons/bi";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4" style={{marginTop: "5rem"}}>
      <div className="container">
        <div className="row align-items-center">
          <a className="col-6 text-center" href='https://github.com/SoroushXYZ'>
            <FaGithub size={50}/>
          </a>
          <div className="col-6 text-center">
            <img src="/images/XYZ.png" alt="XYZ Logo" style={{height: "60px"}}/>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p>Email: <a className='text-white' href="mailto:Soroushsadeghian.ss@gmail.com">Soroushsadeghian.ss@gmail.com</a></p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className='text-white'>Developed with <FaHeart size={20} style={{ color: 'red' }}/> & <BiSolidCoffee size={25} style={{ color: '#5e3c26' }} /></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer