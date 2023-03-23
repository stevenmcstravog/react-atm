import React from 'react'
import { BsBackspace } from 'react-icons/bs'

const PIN_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const KeyPad = ({ handleKeyClick, handleKeyDelete }) => (
  <>
    {PIN_NUMBERS.map((num, i) => (
      <div key={`pin-keypad-${i}`} className="col-4">
        <button
          className="btn btn-primary btn-key"
          onClick={() => handleKeyClick(num)}>
          {num}
        </button>
      </div>
    ))}
    <div className="col-8">
      <button
        aria-label="Backspace"
        className="btn btn-warning btn-key-lg"
        onClick={handleKeyDelete}>
        <BsBackspace />
      </button>
    </div>
    <div className="col-4">
      <button
        className="btn btn-primary btn-key"
        onClick={() => handleKeyClick(0)}>
        0
      </button>
    </div>
  </>
)

export default KeyPad
