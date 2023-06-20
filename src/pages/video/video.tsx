import { useParams } from "react-router-dom";
import { Player } from "../../widgets/player/player";
import { useEffect, useState } from "react";
import axios from "axios";
import { Video } from "../upload-video-page/person-video-page";

export const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  useEffect(() => {
    axios
      .get<Video>(`http://localhost:8080/videos/get_video/${id}`)
      .then((d) => setVideo(d.data));
  }, []);
  return (
    <div>
      <Player
        file={`http://localhost:8080/videos/s3?key=${video?.file_path}`}
      />
      <p style={{ fontWeight: "500", fontSize: "16px" }}>{video?.title}</p>
      <p style={{ fontSize: "13px" }}>{video?.description}</p>
    </div>
  );
};
