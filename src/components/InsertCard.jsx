import React from 'react'
import InsertCardLogo from '../assets/insert-card.svg'
import { useNavigate } from 'react-router-dom'

const InsertCard = () => {
  const navigate = useNavigate()
  const handleInsertClick = () => navigate('/pin')

  return (
    <div className="content-wrapper px-3">
      <h1 className="display-4 fw-bold">WELCOME TO THE REACT BANK</h1>
      <h2 className="fs-3 fw-light mb-5">Always Giving You Extra</h2>
      <p className="lead">Please insert your card.</p>
      <div className="img-button-container">
        <img
          src={InsertCardLogo}
          alt="Insert card"
          className="img-fluid mt-2"
          onClick={handleInsertClick}
        />
      </div>
    </div>
  )
}

export default InsertCard
