import React from 'react'

const AccountDetails = ({ name, balance, overdraftAmount }) => (
  <>
    <h4 className="fs-2">Account Holder</h4>
    <p className="text-muted fs-4 mb-4">{name}</p>
    <h4 className="fs-2">Balance</h4>
    <p
      className={
        balance < 0 ? 'text-muted danger fs-4 mb-4' : 'text-muted fs-4 mb-4'
      }>
      £{balance}
    </p>
    <h4 className="fs-2">Available Overdraft</h4>
    <p className="text-muted fs-4 mb-4">£{overdraftAmount}</p>
  </>
)

export default AccountDetails
