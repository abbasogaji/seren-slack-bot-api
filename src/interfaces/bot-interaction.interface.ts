export interface BotInteractionUser {
    id: string;
    username: string;
    name: string;
    team_id: string;
}

export interface BotInteractionContainer {
    type: string;
    message_ts: string;
    channel_id: string;
    is_ephemeral: boolean;
}

export interface BotInteractionTeam {
    id: string;
    domain: string;
}

export interface BotInteractionChannel {
    id: string;
    name: string;
}

export interface BotInteractionState {
}

export interface BotInteractionText {
    type: string;
    text: string;
    emoji: boolean;
}

export interface BotInteractionSelectedOption {
    text: Text;
    value: string;
}

export interface BotInteractionPlaceholder {
    type: string;
    text: string;
    emoji: boolean;
}

export interface BotInteractionAction {
    type: string;
    action_id: string;
    block_id: string;
    selected_option: BotInteractionSelectedOption;
    placeholder: BotInteractionPlaceholder;
    action_ts: string;
}

export interface BotInteractionPayload {
    type: string;
    user: BotInteractionUser;
    api_app_id: string;
    token: string;
    container: BotInteractionContainer;
    trigger_id: string;
    team: BotInteractionTeam;
    enterprise?: any;
    is_enterprise_install: boolean;
    channel: BotInteractionChannel;
    state: BotInteractionState;
    response_url: string;
    actions: BotInteractionAction[];
}