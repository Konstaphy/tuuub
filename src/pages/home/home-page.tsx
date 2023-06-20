import { useEffect, useState } from "react";
import { authTransport } from "../../features/auth/api/auth-transport";
import { Player } from "../../widgets/player/player";
import { url } from "../../shared/api/transport";
import { VideosTransport } from "../../features/videos/api/videos-transport";
import { useUserStore } from "../../app";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const userStore = useUserStore();
  const [videos, setVideos] = useState<
    { id: string; file_path: string; title: string }[]
  >([]);
  const navigate = useNavigate();
  useEffect(() => {
    new VideosTransport(userStore)
      .getAllVideos()
      .then((res) => setVideos(res.videos || []));
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gap: "20px",
        margin: "20px",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
      }}
    >
      {videos.map((v) => {
        return (
          <div
            onClick={() => navigate("/video/" + v.id)}
            style={{ display: "grid", gridTemplateRows: "1fr 30px" }}
          >
            <Player
              imageOnly
              width={250}
              file={`${url}/videos/s3?key=${v.file_path}`}
            />
            <p
              style={{
                fontWeight: "500",
                width: "250px",
                textAlign: "center",
                padding: "5px",
              }}
            >
              {v.title || "Без названия"}
            </p>
          </div>
        );
      })}
    </div>
  );
};
