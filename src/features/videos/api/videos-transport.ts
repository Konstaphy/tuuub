import axios, { AxiosResponse } from "axios";

const methods = {
  upload: "upload",
  getAll: "get",
};

class VideosTransport {
  private readonly url = "http://localhost:8080/videos/";

  public async uploadVideo(video: FormData) {
    return await axios
      .post<FormData, AxiosResponse<string>>(this.url + methods.upload, video)
      .then((res) => res.data);
  }

  public async getAllVideos() {
    return await axios
      .get<unknown, AxiosResponse<string>>(this.url + methods.getAll)
      .then((res) => res.data);
  }
}

export const videosTransport = new VideosTransport();
