import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from 'react'
import paymentController from "../../controllers/paymentController"


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "green" },
			"::placeholder": { color: "blue" }
		},
		invalid: {
			iconColor: "red",
			color: "#ffc7ee"
		}
	}
}

//AfterSuccess is a callback
export default function PaymentForm({user, afterSuccess}) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        });

        const {error} = response;

    if(!error) {
        try {
            //payment intent
            //const url = process.env.STRIPE_REQUESTS;
            const url = 'http://localhost:4200/stripe/intent-payment';

            const sResponse = await fetch(url, {
                method: "get",
                headers: {'Content-Type': 'application/json'}
                });
            //retrieve the clientSecret
            const {clientSecret} = await sResponse.json();
            
            const confirm = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user.name,
                },
                },
            });
            switch (confirm.paymentIntent.status) {
                case "succeeded":
                    alert('Success!');
                    try{
                        const creditResponse = await paymentController.addCredit(user.email, 10);
                        afterSuccess(creditResponse);//update callback
                    }catch(err){
                        console.log('error adding');
                        console.log(err);
                    }
                    
                break;
                case "requires_payment_method":
                    alert('The payment did not completed. Please verify your payment and try again');
                break;
            
                default:
                    alert('An error has ocurred. Please refresh the page and try again or contact support');
                    break;
            }
        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
       <div>
           <h2>You just bought a sweet spatula congrats this is the best decision of you're life</h2>
       </div> 
        }
            
        </>
    )
}