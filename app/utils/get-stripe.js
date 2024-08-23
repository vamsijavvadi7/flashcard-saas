import { loadStripe } from '@stripe/stripe-js'

let stripePromise

const getStripe = () => {

  
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51Pp3yEK0yQP2ftsP9jvnZbqumUlyDrR6fbAdILvBddcYy0odTEGfRteCKdQ9qZQhXqAxmOLTJdlrMhFCNvzTjkbu00G2Wqexsw")
  }
  return stripePromise
}

export default getStripe