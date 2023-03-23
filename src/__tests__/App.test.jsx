import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

describe('Renders main app page correctly', async () => {
  it('Should render the page correctly', async () => {
    render(<App />, { wrapper: MemoryRouter })

    const header = await document.querySelector('header')
    const footer = await document.querySelector('footer')
    const h1 = await screen.queryByText('WELCOME TO THE REACT BANK')

    expect(header).not.toBeNull()
    expect(footer).not.toBeNull()
    expect(h1).not.toBeNull()
  })
})
