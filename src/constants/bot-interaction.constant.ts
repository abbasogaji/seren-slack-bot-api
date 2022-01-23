import { BotActionType } from "../enums/bot-action-type.enum";


export const USER_STATE_PAYLOAD = {
    "blocks": [
        {
            "type": "input",
            "element": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Doing Well",
                            "emoji": true
                        },
                        "value": "Doing Well"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Neutral",
                            "emoji": true
                        },
                        "value": "Neutral"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Feeling Lucky",
                            "emoji": true
                        },
                        "value": "Feeling Lucky"
                    }
                ],
                "action_id": BotActionType.UserState
            },
            "label": {
                "type": "plain_text",
                "text": "Welcome. How are you doing?",
                "emoji": true
            }
        }
    ]
}

export const USER_HOBBY_PAYLOAD =  {
    "blocks": [
        {
            "type": "input",
            "element": {
                "type": "static_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "Select an item",
                    "emoji": true
                },
                "options": [
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Football",
                            "emoji": true
                        },
                        "value": "Football"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Music",
                            "emoji": true
                        },
                        "value": "Music"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Sleep",
                            "emoji": true
                        },
                        "value": "Sleep"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Movies",
                            "emoji": true
                        },
                        "value": "Movies"
                    },
                    {
                        "text": {
                            "type": "plain_text",
                            "text": "Basketball",
                            "emoji": true
                        },
                        "value": "Basketball"
                    }
                ],
                "action_id": BotActionType.UserHobby
            },
            "label": {
                "type": "plain_text",
                "text": "What are your favorite hobbies?",
                "emoji": true
            }
        }
    ]
}

export const GOODBYE_PAYLOAD = {
	"blocks": [
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "Thank you",
				"emoji": true
			}
		}
	]
}