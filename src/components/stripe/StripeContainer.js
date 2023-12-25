import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import StripeForm from "./StripeForm"

const PUBLIC_KEY = "pk_test_51MdwztArH5sWXUPQ31l01N0cfPoYK3B7jPrmHJMr9ZPCoVkLr5UsHzBnkzeRBpxqZx0pVCQmDJ90lYFbDlntrfPB00tNGorIOx"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({user,afterSuccess}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<StripeForm user={user} afterSuccess={afterSuccess}/>
		</Elements>
	)
}