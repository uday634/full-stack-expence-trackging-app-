const navbar = document.getElementById("navbar");
const isPrimeum = localStorage.getItem("isPrimeum");
const primumbtn = document.getElementById("primumbtn");

primumbtn.addEventListener("click", async (e) => {
  const token = localStorage.getItem("token");

  try {
    let response = await axios.get("http://localhost:3000/premium/premium", {
      headers: { Authorization: token },
    });
    console.log(response);

    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        await axios.post(
          "http://localhost:3000/premium/updatetransactionstatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );

        alert("You are a premium user now");
        localStorage.setItem("isPrimeum", "true");
        paragraph.innerHTML = "You are the premium user";

        // Remove the Premium button and add the Leaderboard button
        showPremiumUI();
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", function (response) {
      console.log(response);
      alert("Something went wrong");
    });
  } catch (error) {
    console.error(error);
    alert("Error occurred while processing the payment.");
  }
});

// Create the Leaderboard button element

function showPremiumUI() {
  const leaderbordbtn = document.createElement("button");
  leaderbordbtn.innerHTML = "Leaderboard";
  leaderbordbtn.setAttribute("id", "leaderbordbtn");

  const paragraph = document.createElement("h2");
  paragraph.innerHTML = "You are the premium user";

  // Remove the Premium button and add the Leaderboard button
  navbar.removeChild(primumbtn);
  navbar.appendChild(paragraph);
  navbar.appendChild(leaderbordbtn);


  leaderbordbtn.addEventListener("click", async () => {
    try {
      let result = await axios.get("http://localhost:3000/premium/leaderboard", {
        headers: { Authorization: token },
      });
      console.log(result.data)
      let res = result.data;
      let leaderboardData = document.getElementById('leaderbord-data');
      let count=1
      res.forEach((res)=>{
          let li = document.createElement('li');
          li.innerHTML = `${count}: ${res.name} - ${res.total_cost}`
          count++
        leaderboardData.appendChild(li)
      })

    } catch (err) {
      console.log(err);
    }
  });
  
}

if (isPrimeum === "true") {
  showPremiumUI();
}
