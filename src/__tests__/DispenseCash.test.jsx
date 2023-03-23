import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DispenseCash from '../components/DispenseCash'
import { AccountContext } from '../context/account-context'

describe('Renders dispence cash correctly', () => {
  it('Should render dispence cash correctly', () => {
    render(
      <AccountContext.Provider
        value={{
          account: { dispensedNotes: { 20: 1, 10: 2, 5: 3 } },
        }}>
        <DispenseCash />
      </AccountContext.Provider>,
      { wrapper: MemoryRouter }
    )

    const h1 = screen.queryByText('Thank You for Using React Bank')

    expect(h1).not.toBeNull()
  })

  it('Should render dispensed notes correctly', () => {
    render(
      <AccountContext.Provider
        value={{
          account: { dispensedNotes: { 20: 1, 10: 2, 5: 3 } },
        }}>
        <DispenseCash />
      </AccountContext.Provider>,
      { wrapper: MemoryRouter }
    )

    const dispensedNotesTwenty = screen.queryByText('£20 * 1')
    const dispensedNotesTen = screen.queryByText('£10 * 2')
    const dispensedNotesFive = screen.queryByText('£5 * 3')

    expect(dispensedNotesTwenty).not.toBeNull()
    expect(dispensedNotesTen).not.toBeNull()
    expect(dispensedNotesFive).not.toBeNull()
  })
})
