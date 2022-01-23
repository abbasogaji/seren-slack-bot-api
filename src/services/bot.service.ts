import axios from "axios";
import { BotInitiationPayload } from "../interfaces/bot-initiation.interface";
import { BotInteractionPayload } from "../interfaces/bot-interaction.interface";
import { BotInteraction } from "../models/bot-interaction.model";
import { BotActionType } from "../enums/bot-action-type.enum";
import * as botInteractionConstant from "../constants/bot-interaction.constant";
import { BotMessageResponse } from "../interfaces/bot-message-response.interface";

/**
 * Handle Bot initiation window
 * 
 * this triggers the `welcome message` on stack along with an interactive select input control
 * 
 * @param {BotInitiationPayload} botInitiationPayload 
 * @returns {Promise<void>} 
 */
export const handleBotInitation = async (
  botInitiationPayload: BotInitiationPayload
): Promise<void> => {
  // return response based via API request
  axios
    .post(
      botInitiationPayload.response_url,
      botInteractionConstant.USER_STATE_PAYLOAD
    ).catch(error => {
        console.error('Error occurs while trying to send an initiatize bot interaction')
    });
};
/**
 * Handle Bot interaction message
 * 
 * this proceeds with the user interaction and information
 * 
 * @param {BotInteractionPayload} botInteractionPayload 
 * @returns void
 */
export const handleBotInteraction = async (
  botInteractionPayload: BotInteractionPayload
) => {
  // send response to slack
  let payload : BotMessageResponse = {};
  const selectedAction = botInteractionPayload.actions[0];
  switch (selectedAction.action_id) {
    case BotActionType.UserState:
      payload = botInteractionConstant.USER_HOBBY_PAYLOAD;
      const updatedState = await BotInteraction.findOneAndUpdate(
        {
          user_id: botInteractionPayload.user.id,
          channel_id: botInteractionPayload.channel.id,
          closed: false
        },
        {
          user_name: botInteractionPayload.user.name,
          state: selectedAction.selected_option.value
        },
        { upsert: true, new: true }
      ).exec();
      payload.blocks.unshift(generateAnsweredQuestionBlockMessage(BotActionType.UserState, updatedState.state))
      break;
    case BotActionType.UserHobby:
      payload = botInteractionConstant.GOODBYE_PAYLOAD;
      const updatedHobby = await BotInteraction.findOneAndUpdate(
        {
          user_id: botInteractionPayload.user.id,
          channel_id: botInteractionPayload.channel.id,
          closed: false
        },
        {
          user_name: botInteractionPayload.user.name,
          hobby: selectedAction.selected_option.value,
          closed: true,
        },
        { upsert: true, new: true }
      ).exec();
      payload.blocks.unshift(generateAnsweredQuestionBlockMessage(BotActionType.UserHobby, updatedHobby.hobby))
      payload.blocks.unshift(generateAnsweredQuestionBlockMessage(BotActionType.UserState, updatedHobby.state))
      break;
    default:
      payload = botInteractionConstant.GOODBYE_PAYLOAD;
      break;
  }

  // return response based via API request
  axios.post(botInteractionPayload.response_url, payload).catch(error => {
      console.error('Error occurs while trying to send an interactive response')
  });
};

/**
 * Handle Bot interaction message
 * 
 * this proceeds with the user interaction and information
 * 
 * @param {BotInteractionPayload} botInteractionPayload 
 * @returns {Promise<BotInteraction[]>}
 */
 export const fetchBotInteraction = async (): Promise<BotInteraction[]> => {
    // send response to slack
    const interactionList = await BotInteraction.find({}).select('-response_url -channel_id').exec();
    return interactionList
  };

export const generateAnsweredQuestionBlockMessage = (actionType : string, answer: string) : object => {
    let question = null;
    switch(actionType){
        case BotActionType.UserState:
            question = 'Welcome. How are you doing?'
        break;

        case BotActionType.UserHobby:
            question = 'What are your favorite hobbies?'
        break;

    }
    let response = {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": `> *${question}* _${answer}_`
        }
    }

    return response
}
