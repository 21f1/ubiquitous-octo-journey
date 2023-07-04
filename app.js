import express from 'express';
import twilio from 'twilio';
import bodyParser from "body-parser"

const MessagingResponse = twilio.twiml.MessagingResponse
const PORT = 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/whatsapp', (request, response) => {
    const send = (toReturn) => {
        const twiml = new MessagingResponse();
        const message = twiml.message({ to: request.body.From });
        message.body(toReturn);
        response.writeHead(200, { "Content-Type": "text/xml" });
        response.end(twiml.toString());
        console.log("Results sent back!");
    };

    console.log(
        `Incoming message from ${request.body.From}: ${request.body.Body}`
    );

    send("Received");
});

app.get('/', (req, res) => {
    res.send("App Running...");
})

app.listen(PORT, () => {
    console.log("Listen on port " + PORT)
});