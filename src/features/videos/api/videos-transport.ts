import { AxiosResponse } from "axios";
import { useUserStore } from "../../../entities/user/model/user";
import { transport } from "../../../shared/api/transport";

const methods = {
  upload: "upload",
  getAll: "get",
};

class VideosTransport {
  private readonly url = "http://localhost:8080/videos/";
  private readonly token: string;

  constructor() {
    this.token = useUserStore.getState().token || "";
  }

  public async uploadVideo(video: FormData) {
    return await transport
      .post<FormData, AxiosResponse<string>>(this.url + methods.upload, video, {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((res) => res.data);
  }

  public async getAllVideos() {
    return await transport
      .get<
        unknown,
        AxiosResponse<{
          videos: { title: string; file_path: string; id: string }[];
        }>
      >(this.url + methods.getAll, {
        headers: { Authorization: "Bearer " + this.token },
      })
      .then((res) => res.data);
  }
}

export const videosTransport = new VideosTransport();
