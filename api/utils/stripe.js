import Stripe from "stripe"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const paymentIntent = async (amount, receipt_email) => {
    try {
        logger.info(`[Stripe] Payment Intent amount ${amount} for email: ${receipt_email}`)
        const customer = await stripe.customers.create()
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: customer.id},
            {apiVersion: '2020-08-27'}
        )
        const intent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'mxn',
            customer: customer.id,
            payment_method_types: ['card'],
            receipt_email: receipt_email,
        })
        return {
            paymentIntent: intent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id
        }
    } catch (error) {
        console.log(error.message)
        logger.warn(error.message)
    }
}

export { paymentIntent }