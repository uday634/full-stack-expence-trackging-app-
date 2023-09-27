const Sib = require("sib-api-v3-sdk");

const apiKey = 'xsmtpsib-d5b6e3136bfa99517fb662c6f83b95d4f102d100dd260dc75bc410d9be81c08b-6IhBwvJLHrKC8NY5';

exports.forgotpasswordData = async (req, res, next) => {
    try {
        require("dotenv").config();

        const email = req.body.email;
        const client = new Sib.ApiClient();
         // Replace with your actual SendinBlue API key

        // Create an instance of the API client
        const apiKeyAuth = client.authentications['api-key'];
        apiKeyAuth.apiKey = apiKey;
        

        const transEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'uk8096386837@gmail.com',
        };

        const receivers = [
            {
                email: email,
            },
        ];

        // Corrected the method name from transEmailApi to sendTransacEmail
        const message = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Subscribe to clues coding to become a developer",
            textContent: "Follow for more content", // Corrected typo to textContent
        });

        console.log(message);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.error('Error sending email:', err.response ? err.response.text : err.message);
        res.status(500).json({ message: "Error sending email" });
    }
};
