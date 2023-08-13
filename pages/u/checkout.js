/* eslint-disable */ 
import * as React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import Header from "../../components/Header";
import FooterAdmin from "../../components/FooterAdmin"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [clientSecret, setClientSecret] = React.useState("");
  const [price, setPrice] = React.useState()

  React.useEffect(() => {
    let data = sessionStorage.getItem('survey')
    console.log(data)
    // Create PaymentIntent as soon as the page loads
    fetch("/api/private/stripepayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => { console.log(data); setPrice(data.amount); setClientSecret(data.clientSecret); });
  }, []);

  const appearance = {
    theme: 'flat',
    variables: {
      colorText: '#000000',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <Header />
      <div className="App" style={{ display: "flex", flexDirection: "column", width: "100%", minHeight: "100vh", padding: "2% 25% 0 25%", justifyContent: "center", alignContent: "center" }}>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm price={price} />
          </Elements>
        )}
      </div>
      <FooterAdmin />
    </>
  );
}