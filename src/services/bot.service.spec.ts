import * as botService from './bot.service';
import axios from 'axios';
import * as botIaxConstants from '../constants/bot-interaction.constant';
import { BotInteraction } from '../models/bot-interaction.model';
import { BotActionType } from '../enums/bot-action-type.enum';

jest.mock('axios', () => ({
    post : jest.fn().mockReturnThis(),
    get : jest.fn().mockReturnThis(),
    catch: jest.fn().mockReturnThis()
}));
describe('Bot Service', () => {
      beforeEach(async () => {
        
      });
      describe('botService.handleBotInitation()', () => {
          const initationArgs = {
            token: 'xxxx',
            team_id: 'xxx',
            team_domain: 'xxxxx',
            channel_id: 'xxxxx',
            channel_name: 'xxxxx',
            user_id: 'xxxxx',
            user_name: 'xxxxxx',
            command: 'xxxxxx',
            text: 'xxxxx',
            api_app_id: 'xxxxx',
            is_enterprise_install: 'xxxxx',
            response_url: 'xxxx',
            trigger_id: 'xxxx'
          }
          it('should call `axios.post` and send response back to user with correct payload', async () => {
              await botService.handleBotInitation(initationArgs)
              expect(axios.post).toBeCalledWith(initationArgs.response_url, botIaxConstants.USER_STATE_PAYLOAD)
          })
      })
      describe('botService.handleBotInteraction()', () => {
        const args : any = {
            type: 'xxx',
            user: {
                id: 'xxxx',
                name: 'xxxx'
            },
            api_app_id: 'xxxx',
            token:  'xxxx',
            container: {},
            trigger_id:  'xxxx',
            team: {},
            enterprise: {},
            is_enterprise_install: true,
            channel: {id: 'xxx'},
            state: {},
            response_url: 'xxx',
            actions: [
                {
                    action_id: BotActionType.UserState,
                    selected_option: {
                        value: 'xxx'
                    }
                }
            ]
        }

        it('BotInteraction.findOneAndUpdate() - should call update `state` field at first call where action type is user state', async () => {
            // for the first time, action - which is the state of user,
            // we are updating our filtering wuith
            jest.spyOn(BotInteraction as any, 'findOneAndUpdate').mockImplementationOnce(() => ({
                exec : jest.fn(() => Promise.resolve({
                        state: 'Happy',
                        hobby: 'Det you'
                }))
            }));
            const queryCondition = {
                user_id: args.user.id,
                channel_id: args.channel.id,
                closed: false
            }
            const updateQuery = {
                user_name: args.user.name,
                state: args.actions[0].selected_option.value
            }
            const updateOptions = {
                upsert: true, new: true
            }
            await botService.handleBotInteraction(args)
            expect(BotInteraction.findOneAndUpdate).toBeCalledWith(queryCondition, updateQuery, updateOptions)
        })
        it('Should add append users state as a quoted markdown text to the response after first interaction', async () => {
            // for the first time, action - which is the state of user,
            // we are updating our filtering wuith
            jest.spyOn(BotInteraction as any, 'findOneAndUpdate').mockImplementationOnce(() => ({
                exec : jest.fn(() => Promise.resolve({
                        state: 'Happy',
                        hobby: 'Det you'
                }))
            }));
            const queryCondition = {
                user_id: args.user.id,
                channel_id: args.channel.id,
                closed: false
            }
            const updateQuery = {
                user_name: args.user.name,
                state: args.actions[0].selected_option.value
            }
            const updateOptions = {
                upsert: true, new: true
            }
            const appendedBlockItem : any = botService.generateAnsweredQuestionBlockMessage(args.actions[0].action_id, 'Happy')
            const expectedPayload = JSON.parse(JSON.stringify(botIaxConstants.USER_HOBBY_PAYLOAD))
            expectedPayload.blocks.unshift(appendedBlockItem)
            await botService.handleBotInteraction(args)
            expect(axios.post).toBeCalledWith(args.response_url, expectedPayload)
        })
        it('BotInteraction.findOneAndUpdate() - should call update `hobby` field at second call where action type is user hobby', async () => {
            // for the first time, action - which is the state of user,
            // we are updating our filtering wuith
            jest.spyOn(BotInteraction as any, 'findOneAndUpdate').mockImplementationOnce(() => ({
                exec : jest.fn(() => Promise.resolve({
                        state: 'Happy',
                        hobby: 'Det you'
                }))
            }));

            const hoppyBasedArgs = JSON.parse(JSON.stringify(args))
            hoppyBasedArgs.actions[0].action_id = BotActionType.UserHobby

            const queryCondition = {
                user_id: args.user.id,
                channel_id: args.channel.id,
                closed: false
            }
            const updateQuery = {
                user_name: args.user.name,
                hobby: hoppyBasedArgs.actions[0].selected_option.value,
                closed: true,
            }
            const updateOptions = {
                upsert: true, new: true
            }

            await botService.handleBotInteraction(hoppyBasedArgs)
            expect(BotInteraction.findOneAndUpdate).toBeCalledWith(queryCondition, updateQuery, updateOptions)
        })
        it('Should add append users state and hoppy as a quoted markdown text to the response after second interaction', async () => {
            // for the first time, action - which is the state of user,
            // we are updating our filtering wuith
            jest.spyOn(BotInteraction as any, 'findOneAndUpdate').mockImplementationOnce(() => ({
                exec : jest.fn(() => Promise.resolve({
                        state: 'Happy',
                        hobby: 'Det you'
                }))
            }));
            const hoppyBasedArgs = JSON.parse(JSON.stringify(args))
            hoppyBasedArgs.actions[0].action_id = BotActionType.UserHobby

            const queryCondition = {
                user_id: args.user.id,
                channel_id: args.channel.id,
                closed: false
            }
            const updateQuery = {
                user_name: args.user.name,
                hobby: hoppyBasedArgs.actions[0].selected_option.value,
                closed: true,
            }
            const updateOptions = {
                upsert: true, new: true
            }
            const appendedStateBlockItem : any = botService.generateAnsweredQuestionBlockMessage(BotActionType.UserState, 'Happy')
            const appendedHobbyBlockItem : any = botService.generateAnsweredQuestionBlockMessage(BotActionType.UserHobby, 'Det you')
            const expectedPayload = JSON.parse(JSON.stringify(botIaxConstants.GOODBYE_PAYLOAD))
            expectedPayload.blocks.unshift(appendedHobbyBlockItem)
            expectedPayload.blocks.unshift(appendedStateBlockItem)
            await botService.handleBotInteraction(hoppyBasedArgs)
            expect(axios.post).toBeCalledWith(args.response_url, expectedPayload)
        })
    })
})