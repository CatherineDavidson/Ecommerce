import React from 'react';
import './Payment.css';
const Payment = ({ cart, total }) => {


    // Handle the payment process when "Pay Now" is clicked
    const handlePayment = (e) => {
      e.preventDefault(); // Prevent the default form submission or page reload
      alert(`Payment of $${total} is successful! Thank you for your purchase.`);
    };
  return (
    <>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    <div className='tpayment'>
      <h2>Payment Details</h2>
      <div className='tcontainer'>
        <div className='tcart-summary'>
          <h4>Order Summary</h4>
          {cart.map((item) => (
            <div key={item.id} className='torder-item'>
              <p>{item.Name} - Qty: {item.qty}</p>
              <p>${item.price * item.qty}</p>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </div>
        <div className='tpayment-form'>
          <h4>Enter Payment Information</h4>
          <form>
            <input type="ttext" placeholder="UPI ID" />
            <button onClick={handlePayment} className="tpay-now-btn">Pay Now</button>
          </form>
        </div>
      </div>
      
    </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </>
  );
}

export default Payment;
