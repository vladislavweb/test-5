import axios from "axios";

import { Story } from "types";

import config from "../application.json";

class StoryService {
  async getIDsOfNewStories() {
    const reponse = await axios.get<number[]>(
      `${config.HACKER_NEWS_URL}/newstories.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return reponse.data;
  }
  async getStory(id: number) {
    const response = await axios.get<Story | null>(
      `${config.HACKER_NEWS_URL}/item/${id}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data) {
      return undefined;
    }

    return response.data;
  }
  async getStories(ids: number[]) {
    const requests = ids.map((id) => this.getStory(id));
    const responses = await axios.all(requests);
    const stories: Story[] = [];

    for (let i = 0; i < responses.length; i++) {
      const value = responses[i];

      if (value !== undefined) {
        stories.push(value);
      }
    }

    return stories;
  }
}

export default new StoryService();
