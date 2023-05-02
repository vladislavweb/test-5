import Axios from "axios";

import { Comment } from "types";

import config from "../application.json";

class CommentService {
  async getComment(id: number) {
    return await Axios.get<Comment>(`${config.HACKER_NEWS_URL}/item/${id}.json`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  async getComments(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getComment(id));

      const comments = await Axios.all(requests);

      return comments.map((response) => response.data);
    } catch {
      return undefined;
    }
  }
}

export default new CommentService();
