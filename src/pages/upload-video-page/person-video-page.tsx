import "./person-video-page.css";
import { useNavigate, useParams } from "react-router-dom";
import { VideoUploadSection } from "./video-upload-section";
import { useUserStore } from "../../app";
import { useEffect, useState } from "react";
import axios from "axios";
import { Player } from "../../widgets/player/player";
import { url } from "../../shared/api/transport";

export type Video = {
  description: string;
  file_path: string;
  id: string;
  photo_path: string;
  title: string;
  user_id: string;
};

export const PersonVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useUserStore();
  const [videos, setVideos] = useState<Video[]>();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get<Video[]>("http://localhost:8080/videos/get_by_id", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((d) => setVideos(d.data));
  }, [token]);
  return (
    <div className={"person-video-page"}>
      <div
        className={"person-videos"}
        style={{
          display: "grid",
          gap: "20px",
          margin: "20px",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {videos?.map((v) => {
          return (
            <div
              onClick={() => navigate("/video/" + v.id)}
              style={{
                display: "grid",
                gridTemplateRows: "1fr 30px",
                height: "100px",
              }}
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
      {id === user?.id && <VideoUploadSection />}
    </div>
  );
};
