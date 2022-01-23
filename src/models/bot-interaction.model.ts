import * as mongoose from "mongoose";
// Document interface
interface BotInteraction {
  user_id: string;
  user_name: string;
  hobby: string;
  state: string;
  channel_id: string;
  closed: boolean;
  response_url: string;
}
const botSchema = new mongoose.Schema<BotInteraction>(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    hobby: {
      type: String,
      default: null,
      trim: true,
    },
    state: {
      type: String,
      default: null,
      trim: true,
    },
    channel_id: {
      type: String,
      default: null,
      trim: true,
    },
    closed: {
      type: Boolean,
      default: false
    },
    response_url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: "bot_interactions",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const BotInteraction = mongoose.model("BotInteraction", botSchema);
export { BotInteraction };
