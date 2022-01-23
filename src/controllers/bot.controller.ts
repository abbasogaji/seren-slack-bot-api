import { NextFunction, Request, Response } from "express";
import { BotInteractionPayload } from "../interfaces/bot-interaction.interface";
import { BotInitiationPayload } from "../interfaces/bot-initiation.interface";
import * as botService from "../services/bot.service";


export const postBotInitation = (req: Request, res: Response) => {
    try {
        const botInitiationPayload : BotInitiationPayload = req.body
        if(botInitiationPayload.text !== 'hello'){
            return res.status(200).send('Ops! cannot recognise this command! try `/bot hello`')
        }
        botService.handleBotInitation(botInitiationPayload) 
    } catch (error) {
        return res.status(200).send('Ops! something went wrong!')
    }
    return res.status(200).json()
}

export const postBotInteraction = (req: Request, res: Response) => {
    const botInteractionPayload : BotInteractionPayload = JSON.parse(req.body.payload)
    botService.handleBotInteraction(botInteractionPayload)
    return res.status(200).json()
}

export const getBotInteraction = async(req: Request, res: Response) => {
    const data = await botService.fetchBotInteraction()
    return res.status(200).json({
        status: true,
        message: 'bot interaction list',
        data: data
    })
} 
