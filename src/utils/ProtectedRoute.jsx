import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const [isCardVerified, setIsCardVerified] = useState(false)
  const navigate = useNavigate()

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token')
    if (!userToken || userToken === 'undefined') {
      setIsCardVerified(false)
      return navigate('')
    }
    setIsCardVerified(true)
  }

  useEffect(() => {
    checkUserToken()
  }, [isCardVerified])

  return isCardVerified ? props.children : null
}

export default ProtectedRoute
