import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import WithdrawFunds from '../components/WithdrawFunds'
import { AccountContext } from '../context/account-context'

describe('Renders withdraw funds correctly', () => {
  it('Should render withdraw funds correctly', () => {
    render(
      <AccountContext.Provider
        value={{
          account: { name: 'Micheal', balance: 200, overdraftAmount: 100 },
        }}>
        <WithdrawFunds />
      </AccountContext.Provider>,
      { wrapper: MemoryRouter }
    )

    const h1 = screen.queryByText('Choose the Amount You Want to Withdraw')

    expect(h1).not.toBeNull()
  })

  it('Should render account details correctly', () => {
    render(
      <AccountContext.Provider
        value={{
          account: { name: 'Micheal', balance: 200, overdraftAmount: 100 },
        }}>
        <WithdrawFunds />
      </AccountContext.Provider>,
      { wrapper: MemoryRouter }
    )

    const accountName = screen.queryByText('Micheal')
    const accountBalance = screen.queryByText('£200')
    const accountOverdraft = screen.queryByText('£100')

    expect(accountName).not.toBeNull()
    expect(accountBalance).not.toBeNull()
    expect(accountOverdraft).not.toBeNull()
  })
})
