import { useEffect, useState } from "react";
import { authTransport } from "../../features/auth/api/auth-transport";
import { videosTransport } from "../../features/videos/api/videos-transport";
import { Player } from "../../widgets/player/player";

export const HomePage = () => {
  const [videos, setVideos] = useState<
    { id: string; file_path: string; title: string }[]
  >([]);
  useEffect(() => {
    videosTransport.getAllVideos().then((res) => setVideos(res.videos || []));
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
              file={`http://localhost:8080/videos/s3?key=${v.file_path}`}
            />
          </div>
        );
      })}
    </>
  );
};
