import asyncHandler from "express-async-handler";
import { paymentIntent } from '../utils/stripe.js'

//@desc STRIPE PAYMENT INTENT
//@route POST /api/transactions
//@access private
const makePayment = asyncHandler(async (req, res) => {
    const { amount, email } = req.body
    if (amount && email) {
        const response = await paymentIntent(Number(amount), email)
        if (response) {
            res.status(200)
            res.send(response)
        } else {
            res.status(500)
            throw new Error('Stripe error')
        }
    }else{
        res.status(500)
        throw new Error('Amount and email required')
    }
});

export { makePayment }