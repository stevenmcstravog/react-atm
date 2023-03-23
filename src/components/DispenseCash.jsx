import React, { useContext } from 'react'
import CashWithdrawalLogo from '../assets/cash-withdrawal.svg'
import { useNavigate } from 'react-router-dom'
import { AccountContext } from '../context/account-context'

const DispenseCash = () => {
  const { account } = useContext(AccountContext)

  const navigate = useNavigate()
  const handleAnotherTransactionClick = () => navigate('/withdraw')

  return (
    <div className="content-wrapper px-3">
      <h1>Thank You for Using React Bank</h1>
      <h2 className="fs-3 fw-light mb-5">Transaction Complete</h2>
      <p className="lead">Please take your money.</p>
      <div className="img-container">
        <img
          src={CashWithdrawalLogo}
          alt="Take cash"
          className="img-fluid mt-2 mb-5"
        />
      </div>
      <h3 className="fw-bold fs-3 mb-4">
        {Object.entries(account.dispensedNotes)
          .sort((a, b) => b[0] - a[0])
          .map(([noteType, amountDispensed]) =>
            amountDispensed > 0 ? (
              <span
                key={`note-dispensed-${noteType}`}>{`£${noteType} * ${amountDispensed} `}</span>
            ) : null
          )}
      </h3>
      <button
        className="btn btn-success btn-lg fw-bold"
        onClick={handleAnotherTransactionClick}>
        Another Transaction
      </button>
    </div>
  )
}

export default DispenseCash
