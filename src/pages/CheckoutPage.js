import StripeContainer from "../components/stripe/StripeContainer";

function CheckoutPage({user, afterSuccess}) {

  return (
    <div className='welcome'>
      <StripeContainer user={user} afterSuccess={afterSuccess} />
     Simon perro
     <p>Credits: ${user.credit}</p>
    </div>
  );
};

export default CheckoutPage;
