import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { InstallProvider } from '@slack/oauth';
import * as bodyParser from 'body-parser';
import * as botController from './controllers/bot.controller';
import errorMiddleware from './middlewares/error.middleware';
import { slackSignVerificationMiddleware } from './middlewares/slack-auth.middleware';
// Configure Dot Env
dotenv.config()

console.log(process.env.SLACK_SIGNING_SECRET)
// slack installation
// initialize the installProvider
const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateVerification: false,
});

// Mongodb connection
mongoose.connect(process.env.DATABASE_URI, null, () => {
  console.log('Database connection successfully done')
})

// Create App Instance
const app = express()
const port = process.env.PORT || 5000

// configure on application lifecylce
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup routes for the bot
app.post('/interaction', slackSignVerificationMiddleware, botController.postBotInteraction)
app.post('/initiate', slackSignVerificationMiddleware, botController.postBotInitation)
app.get('/interactions', botController.getBotInteraction)
app.get('/', (req, res, next) => {
    res.status(200).json({message: 'hello world!'})
})

// oauth slack callback
app.get('/auth/callback', (req, res) => {
  installer.handleCallback(req, res);
});

//error handling
app.use(errorMiddleware)
// Serving app at $PORT
app.listen(port, () => console.log(`Running on port ${port}`))