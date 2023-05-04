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
    const story = await Axios.get<Story>(
      `${config.HACKER_NEWS_URL}/item/${id}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return story.data;
  }
  async getStories(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getStory(id));

      return await Axios.all(requests);
    } catch {
      return undefined;
    }
  }
}

export default new StoryService();
