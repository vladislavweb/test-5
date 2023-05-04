import axios from "axios";

import { Comment } from "types";

import config from "../application.json";

class CommentService {
  async getComment(id: number) {
    const comment = await axios.get<Comment>(`${config.HACKER_NEWS_URL}/item/${id}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return comment.data;
  }
  async getComments(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getComment(id));

      return await axios.all(requests);
    } catch {
      return undefined;
    }
  }
}

export default new CommentService();
