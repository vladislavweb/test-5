import Axios from "axios";

import { Comment } from "types";

import config from "../application.json";

class CommentService {
  async getComment(id: number) {
    const comment = await Axios.get<Comment>(
      `${config.HACKER_NEWS_URL}/item/${id}.json`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return comment.data;
  }
  async getComments(ids: number[]) {
    try {
      const requests = ids.map((id) => this.getComment(id));

      return await Axios.all(requests);
    } catch {
      return undefined;
    }
  }
}

export default new CommentService();
