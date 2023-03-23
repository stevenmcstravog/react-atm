import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InsertCard from '../components/InsertCard'

describe('Renders insert card correctly', () => {
  it('Should render insert card correctly', () => {
    render(<InsertCard />, { wrapper: MemoryRouter })

    const h1 = screen.queryByText('WELCOME TO THE REACT BANK')

    expect(h1).not.toBeNull()
  })
})
