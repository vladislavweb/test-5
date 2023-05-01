import Axios from "axios";

import { Story } from "types";

const API_URL = "https://hacker-news.firebaseio.com/v0";

class StoryService {
  async getIDsOfNewStories() {
    return Axios.get<number[]>(`${API_URL}/newstories.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getStory(id: number) {
    return await Axios.get<Story>(`${API_URL}/item/${id}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getStories(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getStory(id));

      return Axios.all(requests);
    } catch {
      return undefined;
    }
  }
}

export default new StoryService();
