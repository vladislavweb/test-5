import Axios from "axios";

import { Story } from "types";

import config from "../application.json";

class StoryService {
  async getIDsOfNewStories() {
    return Axios.get<number[]>(`${config.HACKER_NEWS_URL}/newstories.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getStory(id: number) {
    return await Axios.get<Story>(`${config.HACKER_NEWS_URL}/item/${id}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getStories(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getStory(id));

      const stories = await Axios.all(requests);

      return stories.map((response) => response.data);
    } catch {
      return undefined;
    }
  }
}

export default new StoryService();
