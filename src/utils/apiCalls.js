import axios from 'axios'
import { API_POST_PIN } from './constants'

export const enterPinAPI = async (pin) =>
  await axios
    .post(API_POST_PIN, { pin: pin }, null)
    .then((response) => {
      return response.data.currentBalance
    })
    .catch((error) => {
      console.log(error)
      return null
    })
