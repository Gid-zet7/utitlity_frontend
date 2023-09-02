import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import usePersist from "../../hooks/usePersist";

import { PulseLoader } from "react-spinners";
import { usePayMutation } from "./paymentApiSlice";


const Checkout = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState(0)
    const [errMsg, setErrMsg ] = useState("")





    const [pay, { isLoading }] = usePayMutation()

    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg("")
    },[email, amount])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const check = await pay({email, amount}).unwrap()
        const parseCheck = (JSON.parse(check))
        const url = parseCheck.data.authorization_url
        window.location.href= url
        
    }

    // var paymentForm = document.getElementById('paymentForm');
    // paymentForm.addEventListener('submit', payWithPaystack, false);
    // async function payWithPaystack(e) {
    //     e.preventDefault()
    //     const check = await pay({})
    //     var handler = PaystackPop.setup({
    //         key: 'pk_test_1098ab66cca6ed68a0e928dc466cbd93e92c31b7', // Replace with your public key
    //         email: document.getElementById('email-address').value,
    //         amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    //         currency: 'GHS', // Use GHS for Ghana Cedis or USD for US Dollars
    //         ref: ''+Math.floor((Math.random() * 1000000000) + 1), // Replace with a reference you generated
    //         callback: function(response) {
    //             //this happens after the payment is completed successfully
    //             var reference = response.reference;
    //             alert('Payment complete! Reference: ' + reference);
    //             // Make an AJAX call to your server with the reference to verify the transaction
    //         },
    //         onClose: function() {
    //             alert('Transaction was not completed, window closed.');
    //         },
    //     });
    //     handler.openIframe();

    //     navigate("/home/welcome")
    // }
    
    
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handleAmountInput = (e) => setAmount(e.target.value)
    // const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errMsg" : "offscreen"

    if (isLoading) return <PulseLoader color={"#BADA55"} />

    const content = (
        <section>
            <header>
                <h1>Checkout</h1>
            </header>
            <main>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="text" ref={userRef} value={email} onChange={handleEmailInput} autoComplete="off" required />

                    <label htmlFor="amount">Amount:</label>
                    <input type="number" value={amount} onChange={handleAmountInput} required />
                    <button>Pay</button>

                    {/* <label htmlFor="persist">
                        <input 
                        type="checkbox" 
                        checked={persist} 
                        onChange={handleToggle} 
                        /> 
                        Trust this Device

                    </label> */}
                    

                </form>

            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}

export default Checkout
