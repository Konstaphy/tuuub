import { useEffect, useState } from "react";
import { authTransport } from "../../features/auth/api/auth-transport";
import { Player } from "../../widgets/player/player";
import { url } from "../../shared/api/transport";
import {VideosTransport} from "../../features/videos/api/videos-transport";
import {useUserStore} from "../../app";

export const HomePage = () => {
  const userStore = useUserStore()
  const [videos, setVideos] = useState<
    { id: string; file_path: string; title: string }[]
  >([]);
  useEffect(() => {
    new VideosTransport(userStore).getAllVideos().then((res) => setVideos(res.videos || []));
  }, []);
  return (
    <>
      {videos.map((v) => {
        return (
          <div>
            <p>{v.title}</p>
            <Player
              imageOnly
              width={200}
              file={`${url}/videos/s3?key=${v.file_path}`}
            />
          </div>
        );
      })}
    </>
  );
};
