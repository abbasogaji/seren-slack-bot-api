# SEREN SLACK BOT API

## Installation Guide

1. Clone Project `git clone https://github.com/abbasogaji/seren-slack-bot-api.git`
2. Go to root directory
3. Run `npm install`
4. Setup environmental variable
5. Run `npm run dev`
6. App serves at `http://localhost:5000`

## Environmental Variables to be provided

```
SLACK_SIGNING_SECRET=xxxxxxxxxxxxxxxxxxxx
SLACK_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
SLACK_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxx
DATABASE_URI=xxxxxxxxxxxxxxxxxxxx

```

## Running Unit Test
Test is ran against our controllers, services and pure functions
1. Run `npm run test` for unit test
   
### Endpoints implemented

1. GET /interactions
    * returns appropriate list of bot interaction stored in the database

2. POST /initiate
    * This endpoint is called by stripe for initiating the bot interactive event with the slack bot
    * Endpoint is protected by a middleware for verifying the request signatures is from Slack

3. POST /interaction
    * The endpoint receives the webhook payload triggered by users action on the interactive message block
    * Endpoint is protected by a middleware for verifying the request signatures is from Slac

```
