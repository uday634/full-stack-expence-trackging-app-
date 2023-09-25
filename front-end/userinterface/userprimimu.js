const primumbtn = document.getElementById('primumbtn')

primumbtn.addEventListener('click', async (e) => {
    const token = localStorage.getItem('token')
    try {
        let response = await axios.get('http://localhost:3000/premium', { headers: { "Authorization": token } });
        console.log(response);
        var options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function (response) {
                await axios.post('http://localhost:3000/updatetransactionstatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id,
                }, { headers: { "Authorization": token } });

                alert('You are a premium User now');
            },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function (response) {
            console.log(response);
            alert('Something went wrong');
        });
        
    } catch (error) {
        console.error(error);
        alert('Error occurred while processing the payment.');
    }
});
