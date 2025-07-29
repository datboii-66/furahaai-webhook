const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  // ✅ Log incoming request to help debug
  console.log("🌐 Incoming request from Dialogflow:");
  console.log(JSON.stringify(req.body, null, 2));

  const tag = req.body.fulfillmentInfo.tag;
  let responseText = "Sorry, I didn't understand that.";

  switch (tag) {
    case "greeting":
      responseText = "Hello! I'm FurahaAI. How can I support you today?";
      break;
    case "mental_health_tip":
      responseText = "Here’s a quick tip: Take 5 minutes today to step outside and breathe.";
      break;
    case "farewell":
      responseText = "Take care! Your mental health matters.";
      break;
  }

  res.json({
    fulfillment_response: {
      messages: [
        {
          text: { text: [responseText] },
        },
      ],
    },
  });
});

app.listen(port, () => {
  console.log(`Webhook running on port ${port}`);
});
