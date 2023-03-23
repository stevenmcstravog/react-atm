import React from 'react'
import { MdPhone } from 'react-icons/md'

const Footer = () => (
  <footer className="mt-auto mb-2 pt-5">
    <div className="justify-content-center float-md-end text-md-end">
      <h2>Support Number</h2>
      <div className="tel-container">
        <div className="icon-container">
          <MdPhone />
        </div>
        <h3 className="fs-3">111-222-333</h3>
      </div>
    </div>
  </footer>
)

export default Footer
