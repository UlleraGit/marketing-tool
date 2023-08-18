/* eslint-disable */ 
import React from "react";
import {
  PaymentElement,
  AddressElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { FormControlLabel,Checkbox,Typography } from "@mui/material";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAccepted, setIsAccepted] = React.useState(false);
  const [checkboxError, setCheckboxError] = React.useState('')

  const handleCheckboxChange = (event) => {
    setIsAccepted(event.target.checked);
  };

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    if (!isAccepted) {
      setCheckboxError('Du must die Verzichtserklärung akzeptieren!')
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/u/thankyou",
        receipt_email: email,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <AddressElement options={{mode:"billing", fields:{phone:'always'}}} />
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <FormControlLabel
        control={
          <Checkbox
            checked={isAccepted}
            onChange={handleCheckboxChange}
            name="acceptTerms"
            color="primary"
          />
        }
        label="Ich verzichte hiermit auf den Wiederruf."
      />
      {checkboxError && <Typography color="error">{checkboxError}</Typography>}

      <button disabled={isLoading || !stripe || !elements} style={{
        marginTop: "10px",
        backgroundColor: '#0000ff',
        border: 'none',
        color: 'white',
        padding: '12px 24px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Zahle " + props.price + "€"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
