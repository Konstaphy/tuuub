import { AxiosResponse } from "axios";
import { transport } from "../../../shared/api/transport";
import { UserStore } from "../../../app";

const methods = {
  upload: "upload",
  getAll: "get",
};

export class VideosTransport {
  private readonly url = "/videos/";
  private readonly token: string;

  constructor(userStore: UserStore) {
    this.token = userStore.token || "";
  }

  public async uploadVideo(video: FormData, title?: string) {
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
