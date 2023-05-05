import axios from "axios";

import { Updates } from "types";

import config from "../application.json";

class UpdateService {
  async getUpdates() {
    const updates = await axios.get<Updates>(
      `${config.HACKER_NEWS_URL}/updates.json?print=pretty`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return updates.data;
  }
}

export default new UpdateService();
