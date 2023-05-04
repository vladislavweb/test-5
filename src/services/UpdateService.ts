import axios from "axios";

import { Updates } from "types";

import config from "../application.json";

class UpdateService {
  async getUpdates() {
    try {
      const updates = await axios.get<Updates>(
        `${config.HACKER_NEWS_URL}/updates.json?print=pretty`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return updates.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UpdateService();
