import { useQuery } from "react-query";
import { videosTransport } from "../api/videos-transport";

export const useVideosLoad = () => {
  return useQuery("videos", () => {
    return videosTransport.getAllVideos();
  });
};
