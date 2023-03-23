import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountDetails from './shared/AccountDetails'
import KeyPad from './shared/KeyPad'
import { AccountContext } from '../context/account-context'

const OtherAmount = () => {
  const [withdrawAmount, setWithdrawAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successfulWithdrawal, setSuccessfulWithdrawal] = useState(false)

  const { account, handleWithdrawal } = useContext(AccountContext)

  const navigate = useNavigate()

  useEffect(() => {
    successfulWithdrawal && navigate('/dispense')
  }, [successfulWithdrawal, navigate])

  const handleWithdrawKeyPadUpdate = (key) => {
    withdrawAmount === 0
      ? setWithdrawAmount(key)
      : setWithdrawAmount(parseInt(`${withdrawAmount.toString()}${key}`))
  }

  const handleDeleteKeyPadUpdate = () => {
    if (withdrawAmount === 0) return

    const updatedAmount = withdrawAmount.toString().slice(0, -1)
    updatedAmount.length > 0
      ? setWithdrawAmount(parseInt(updatedAmount))
      : setWithdrawAmount(0)
  }

  const handleAmountWithdrawal = (amount) => {
    const withdrawal = handleWithdrawal(amount)
    if (withdrawal.showError) {
      setErrorMessage(withdrawal.errorMessage)
      setShowError(true)
    } else {
      setShowError(false)
      setSuccessfulWithdrawal(true)
    }
  }

  return (
    <div className="content-wrapper">
      <h1>Enter the Amount You Want to Withdraw</h1>
      <p className="lead">Please ensure multiples of 5 are entered</p>
      <div className="split-content-container">
        <div className="row g-3">
          <div className="col-12 col-md-4 text-start">
            <AccountDetails
              name={account.name}
              balance={account.balance}
              overdraftAmount={account.overdraftAmount}
            />
          </div>
          <div className="col">
            <div className="row g-3">
              <div className="col-12">
                <input
                  type="number"
                  title="Amount"
                  className="form-control-lg fs-1"
                  value={withdrawAmount}
                  readOnly
                />
                {showError && (
                  <div className="col-12 mt-3">
                    <span className="error-feedback">{errorMessage}</span>
                  </div>
                )}
              </div>
              <div className="key-container row g-3">
                <KeyPad
                  handleKeyClick={handleWithdrawKeyPadUpdate}
                  handleKeyDelete={handleDeleteKeyPadUpdate}
                />
                <div className="col-12">
                  <button
                    className="btn btn-success btn-key-lg"
                    onClick={() => handleAmountWithdrawal(withdrawAmount)}>
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtherAmount
