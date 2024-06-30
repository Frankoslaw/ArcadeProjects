const { App } = require("@slack/bolt");
require("dotenv").config();

// Initializes your app with credentials
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // enable to use socket mode
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message("ping", async ({ command, say }) => {
  try {
    say("Pong!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

app.command("/ping", async ({ command, ack, respond }) => {
  // Acknowledge command request
  await ack();

  await respond(`Pong!`);
});

app.message("hey", async ({ command, say }) => {
  try {
    say("Hello Human!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

// matches any string with RegEx
app.message(/hi/, async ({ command, say }) => {
  try {
    say("Hello Human!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
});

(async () => {
  const port = 3000;
  await app.start(process.env.PORT || port);
  console.log("Bolt app started!!");
})();
