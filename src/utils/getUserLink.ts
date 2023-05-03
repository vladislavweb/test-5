import config from "../application.json";

export const getUserLink = (id: string) => {
  return `${config.USERS_URL}?id=${id}`;
};
