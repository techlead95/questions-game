import { Axios } from "axios";
import Game from "./models/Game";

export class Api {
  url: string;
  client: Axios;

  constructor(url: string) {
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    this.url = url;
    this.client = new Axios({ baseURL: url });
  }

  fetchGameList = async (): Promise<Game[]> => {
    try {
      const response = await this.client.get("/games");
      if (response.status != 200) {
        throw new Error("Failed to fetch game list");
      }
      return JSON.parse(response.data) as Game[];
    } catch (error) {
      console.error("Error fetching game list:", error);
      throw error;
    }
  };
}
