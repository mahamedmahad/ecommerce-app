import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // console.log(req.body)
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1L977EAMN45FsYaWZ3W9y4DU' },
          // { shipping_rate: 'shr_1L979QAMN45FsYaW7ziMA72R' },
        ],
        // cartItems: req.body,
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref

          const newImg = img
            .replace(
              'image-',
              'https://cdn.sanity.io/images/ok82ra8q/production/'
            )
            .replace('-webp', '.webp')

          // console.log('MAGE', newImg)

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: '{{PRICE_ID}}',
        //     quantity: 1,
        //   },
        // ],
        success_url: `${req.headers.origin}/success?order_completed=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }

      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)

      // res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
