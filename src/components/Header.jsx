import React, { useContext } from 'react'
import { AccountContext } from '../context/account-context'
import { GrCreditCard } from 'react-icons/gr'

const Header = () => {
  const { handleClearAccount } = useContext(AccountContext)

  return (
    <header className="mb-auto mt-2 pb-5">
      <div className="float-md-start mb-0">
        <h2 className="logo font-weight-bold fs-1 mb-4 mb-md-0">
          <span>R</span>eact <span>B</span>ank
        </h2>
      </div>
      <div className="justify-content-center float-md-end">
        <button
          type="button"
          className="btn btn-light btn-lg fw-bold"
          onClick={handleClearAccount}>
          Return Card <GrCreditCard />
        </button>
      </div>
    </header>
  )
}

export default Header
