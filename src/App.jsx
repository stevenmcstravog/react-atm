import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { AccountContext } from './context/account-context'
import Header from './components/Header'
import Footer from './components/Footer'
import InsertCard from './components/InsertCard'
import EnterPin from './components/EnterPin'
import WithdrawFunds from './components/WithdrawFunds'
import OtherAmount from './components/OtherAmount'
import DispenseCash from './components/DispenseCash'
import ProtectedRoute from './utils/ProtectedRoute'
import {
  ERROR_WITHDRAW_INSUFFICENT_FUNDS,
  ERROR_WITHDRAW_ATM_NOTES,
  ERROR_WITHDRAW_MULTIPLE_FIVE,
} from './utils/constants'

import './App.css'

const App = () => {
  const [account, setAccount] = useState({})
  const [atmNotes, setAtmNotes] = useState({})

  const navigate = useNavigate()

  const setUserToken = () => localStorage.setItem('user-token', uuidv4())
  const clearUserToken = () => localStorage.removeItem('user-token')
  const getAtmTotal = () => {
    let atmTotal = 0
    for (const [key, value] of Object.entries(atmNotes)) {
      atmTotal += key * value
    }
    return atmTotal
  }

  const createWithdrawalErrorObj = (showError, errorMessage) => ({
    showError: showError,
    errorMessage: errorMessage,
  })

  const handleSetAccount = (balance) => {
    setAccount({
      name: 'Micheal',
      balance: balance,
      overdraftAmount: 100,
      dispensedNotes: {},
    })

    // Since the balance will get reset every time a successful pin is entered
    // Lets also reset the atm notes
    setAtmNotes({
      20: 7,
      10: 15,
      5: 4,
    })

    setUserToken()
  }

  const handleWithdrawal = (requestedAmount) => {
    // Check sufficent funds
    if (requestedAmount > account.balance + account.overdraftAmount)
      return createWithdrawalErrorObj(true, ERROR_WITHDRAW_INSUFFICENT_FUNDS)
    // Check if atm has sufficent funds
    if (requestedAmount > getAtmTotal())
      return createWithdrawalErrorObj(true, ERROR_WITHDRAW_ATM_NOTES)
    // Check multiple of 5
    if (requestedAmount % 5 !== 0)
      return createWithdrawalErrorObj(true, ERROR_WITHDRAW_MULTIPLE_FIVE)
    // Check if enough fivers
    if (requestedAmount % 10 === 5 && atmNotes[5] === 0)
      return createWithdrawalErrorObj(true, ERROR_WITHDRAW_ATM_NOTES)

    let amountLeftToDispense = requestedAmount
    const dispensedNotes = {
      20: 0,
      10: 0,
      5: 0,
    }

    // sort banknotes
    const atmBankNotesArr = Object.entries(atmNotes)
      .map(([nominal, num]) => [Number(nominal), num])
      .sort((a, b) => b[0] - a[0])

    const amountNeedsFiver = requestedAmount % 10 === 5

    while (amountLeftToDispense > 0) {
      atmBankNotesArr.forEach((noteAmount) => {
        // Keep fivers if needed
        if (
          noteAmount[0] === 5 &&
          amountNeedsFiver &&
          amountLeftToDispense !== 5
        )
          return
        // Note too big to dispense
        if (noteAmount[0] > amountLeftToDispense) return
        // No more notes left
        if (noteAmount[1] <= dispensedNotes[noteAmount[0]]) return

        amountLeftToDispense -= noteAmount[0]
        dispensedNotes[noteAmount[0]]++
      })
    }

    setAtmNotes({
      20: atmNotes[20] - dispensedNotes[20],
      10: atmNotes[10] - dispensedNotes[10],
      5: atmNotes[5] - dispensedNotes[5],
    })
    setAccount({
      ...account,
      balance: account.balance - requestedAmount,
      dispensedNotes: dispensedNotes,
    })

    return createWithdrawalErrorObj(false, '')
  }

  const handleClearAccount = () => {
    setAccount({})
    clearUserToken()
    navigate('')
  }

  return (
    <div className="main-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <AccountContext.Provider
        value={{
          account,
          handleSetAccount,
          handleWithdrawal,
          handleClearAccount,
        }}>
        <Header />
        <Routes>
          <Route path="" element={<InsertCard />} />
          <Route path="/pin" element={<EnterPin />} />
          <Route
            path="/withdraw"
            element={
              <ProtectedRoute>
                <WithdrawFunds />
              </ProtectedRoute>
            }
          />
          <Route
            path="/amount"
            element={
              <ProtectedRoute>
                <OtherAmount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dispense"
            element={
              <ProtectedRoute>
                <DispenseCash />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AccountContext.Provider>
      <Footer />
    </div>
  )
}

export default App
