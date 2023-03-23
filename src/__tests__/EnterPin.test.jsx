import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EnterPin from '../components/EnterPin'

describe('Renders enter pin correctly', () => {
  it('Should render enter pin correctly', () => {
    render(<EnterPin />, { wrapper: MemoryRouter })

    const h1 = screen.queryByText('Please Enter Your Pin')

    expect(h1).not.toBeNull()
  })
})
