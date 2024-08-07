/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from "express";
import axios from "axios";
import cors from "cors";

import dotenv from "dotenv";
import prisma from "./prisma";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

app.post("/webhook", async (req, res) => {
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    const business_phone_number_id =
      req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: `Dope created successfully: ${message?.text.body}` },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    const fetchData = async (inputUrl: string) => {
      const url = `${process.env.API_BASE_URL}${inputUrl}&oembed=false`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_KEY_RAPID!,
          "x-rapidapi-host": "link-preview4.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json(); // Asumimos que el resultado es JSON
        //   setDataFromURL(result);
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        return error;
      }
    };

    const data = await fetchData(message?.text.body);

    await prisma.dope.create({
      data: {
        link: data.url,
        description: data.description,
        image: data.cover,
        name: data.sitename,
        userId: "777",
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }
  res.send(message?.text.body);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    console.log(req.query);
    // respond with '403 Forbidden' if verify tokens do not match
    res.send(req.query);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
