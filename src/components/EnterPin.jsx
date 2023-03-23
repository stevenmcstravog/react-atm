import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'
import KeyPad from './shared/KeyPad'
import { AccountContext } from '../context/account-context'
import { enterPinAPI } from '../utils/apiCalls'

const PIN_MAX_DIGITS = 4

const DisplayPin = ({ pin }) => (
  <div className="input-container row g-3">
    {Array(PIN_MAX_DIGITS)
      .fill()
      .map((_, i) => (
        <div key={`pin-input-${i}`} className="col-3">
          <input
            type="password"
            title="Pin"
            className="form-control text-center fw-bold fs-3"
            value={pin[i] !== undefined ? pin[i] : ''}
            readOnly
          />
        </div>
      ))}
  </div>
)

const EnterPin = () => {
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState([])
  const [showPinError, setShowPinError] = useState(false)
  const [pinSuccess, setPinSuccess] = useState(false)

  const { handleSetAccount } = useContext(AccountContext)

  const navigate = useNavigate()

  useEffect(() => {
    pin.length === PIN_MAX_DIGITS && handlePinEntered()
    pinSuccess && navigate('/withdraw')
  }, [pin, pinSuccess, navigate])

  const handleKeyClick = (value) => {
    setPin([...pin, value])
  }
  const handleKeyDelete = () => setPin(pin.slice(0, -1))

  const handlePinEntered = async () => {
    setLoading(true)
    const balance = await enterPinAPI(pin.join(''))
    balance ? handlePinSuccess(balance) : handlePinError()
    setLoading(false)
  }

  const handlePinSuccess = (balance) => {
    setShowPinError(false)
    handleSetAccount(balance)
    setPinSuccess(true)
  }
  const handlePinError = () => {
    setShowPinError(true)
    setPin([])
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="content-wrapper">
      <h1>Please Enter Your Pin</h1>
      <p className="lead">
        Please ensure no one can see your pin being entered
      </p>
      <DisplayPin pin={pin} />
      {showPinError && (
        <span className="error-feedback">Incorrect pin, please try again</span>
      )}
      <div className="key-container row g-3">
        <KeyPad
          handleKeyClick={handleKeyClick}
          handleKeyDelete={handleKeyDelete}
        />
      </div>
    </div>
  )
}

export default EnterPin
