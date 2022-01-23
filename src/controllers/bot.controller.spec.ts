import * as botService from "../services/bot.service";
import * as botController from "./bot.controller";


describe('Bot Controller', () => {
  beforeEach(async () => {
        
  });
  afterEach(() => {    
    jest.clearAllMocks();
  });
      const req: any = {
        body : {
          token: 'xxxx',
          team_id: 'xxx',
          team_domain: 'xxxxx',
          channel_id: 'xxxxx',
          channel_name: 'xxxxx',
          user_id: 'xxxxx',
          user_name: 'xxxxxx',
          command: 'xxxxxx',
          text: 'hello',
          api_app_id: 'xxxxx',
          is_enterprise_install: 'xxxxx',
          response_url: 'xxxx',
          trigger_id: 'xxxx'
        }
    }
    const res: any = {
      status : jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    }

    describe('postBotInitation()', () => {
      it('botService.postBotInitation() should call botService with correct arguments', async () => {
        const req: any = {
            body : {
              token: 'xxxx',
              team_id: 'xxx',
              team_domain: 'xxxxx',
              channel_id: 'xxxxx',
              channel_name: 'xxxxx',
              user_id: 'xxxxx',
              user_name: 'xxxxxx',
              command: 'xxxxxx',
              text: 'hello',
              api_app_id: 'xxxxx',
              is_enterprise_install: 'xxxxx',
              response_url: 'xxxx',
              trigger_id: 'xxxx'
            }
        }
        const res: any = {
          status : jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn()
        }
        jest.spyOn(botService, 'handleBotInitation').mockImplementationOnce(() => Promise.resolve())
        await botController.postBotInitation(req, res)
        expect(botService.handleBotInitation).toHaveBeenCalledWith(req.body)
      });
  
      it('botService.postBotInitation() should return appropriate response when bot command is wrong and not proceed', async() => {
        const updatedReq : any = {body : {
          token: 'xxxx',
          team_id: 'xxx',
          team_domain: 'xxxxx',
          channel_id: 'xxxxx',
          channel_name: 'xxxxx',
          user_id: 'xxxxx',
          user_name: 'xxxxxx',
          command: 'xxxxxx',
          text: 'hellxo',
          api_app_id: 'xxxxx',
          is_enterprise_install: 'xxxxx',
          response_url: 'xxxx',
          trigger_id: 'xxxx'
        }}
        jest.spyOn(botService, 'handleBotInitation').mockImplementationOnce(() => Promise.resolve())
        await botController.postBotInitation(updatedReq, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(botService.handleBotInitation).not.toHaveBeenCalled()
      });
  
      it('botService.postBotInitation() should return still return 200 regardess of any error', async() => {
        jest.spyOn(botService, 'handleBotInitation').mockImplementationOnce(() => {
          throw new Error()
        })
        await botController.postBotInitation(req, res)
        expect(botService.handleBotInitation).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(200)
      });
    })

    describe('postBotInteraction()', () => {
      it('botService.postBotInteraction() should call botService with correct arguments', async () => {
        const req: any = {
            body : {
              payload: JSON.stringify({'actions': []})
            }
        }
        const res: any = {
          status : jest.fn().mockReturnThis(),
          json: jest.fn(),
          send: jest.fn()
        }
        jest.spyOn(botService, 'handleBotInteraction').mockImplementationOnce(() => Promise.resolve())
        await botController.postBotInteraction(req, res)
        expect(botService.handleBotInteraction).toHaveBeenCalledWith(JSON.parse(req.body.payload))
      });
  
      it('botService.postBotInitation() should return appropriate response', async() => {
        const req: any = {
          body : {
            payload: JSON.stringify({'actions': []})
          }
      }
      const res: any = {
        status : jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn()
      }
        jest.spyOn(botService, 'handleBotInteraction').mockImplementationOnce(() => Promise.resolve())
        await botController.postBotInteraction(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
      });
    })

    describe('getBotInteraction()', () => {
    it('getBotInteraction() should return correct object and `data` property should be an arrary', async() => {
      jest.spyOn(botService, 'fetchBotInteraction').mockImplementationOnce(() => ([]) as any)
      await botController.getBotInteraction(req, res)
      expect(botService.fetchBotInteraction).toHaveBeenCalled()
      expect(res.json).toHaveBeenCalledWith({
        status: true,
        message: 'bot interaction list',
        data: []
      })
    });
  })
})