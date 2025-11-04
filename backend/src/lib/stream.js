import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const secretkey = process.env.STREAM_API_SECRET;

if (!apiKey || !secretkey) {
  console.error("enviroment variable for get stream are missing");
}

const streamClient = StreamChat.getInstance(apiKey, secretkey);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("error upserting stream user");
  }
};
