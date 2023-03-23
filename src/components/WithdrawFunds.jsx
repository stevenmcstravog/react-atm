import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AccountDetails from './shared/AccountDetails'
import { AccountContext } from '../context/account-context'

const WITHDRAW_AMOUNTS = [10, 20, 40, 60, 80, 100]

const AmountButtons = ({ handleAmountWithdrawal }) =>
  WITHDRAW_AMOUNTS.map((amount, i) => (
    <div key={`amount-button-${i}`} className="col-6">
      <button
        className="btn btn-primary btn-key btn-key-lg"
        onClick={() => handleAmountWithdrawal(amount)}>
        {amount}
      </button>
    </div>
  ))

const WithdrawFunds = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successfulWithdrawal, setSuccessfulWithdrawal] = useState(false)

  const { account, handleWithdrawal } = useContext(AccountContext)

  const navigate = useNavigate()
  const handleOtherAmountClick = () => navigate('/amount')

  useEffect(() => {
    successfulWithdrawal && navigate('/dispense')
  }, [successfulWithdrawal, navigate])

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
      <h1>Choose the Amount You Want to Withdraw</h1>
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
              {showError && (
                <div className="col-12">
                  <span className="error-feedback">{errorMessage}</span>
                </div>
              )}
              <AmountButtons handleAmountWithdrawal={handleAmountWithdrawal} />
              <div className="col-12">
                <button
                  className="btn btn-primary btn-key btn-key-lg"
                  onClick={handleOtherAmountClick}>
                  Other Amount
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default WithdrawFunds
