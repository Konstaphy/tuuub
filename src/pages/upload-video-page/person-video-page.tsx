import "./person-video-page.css";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../entities/user/model/user";
import { VideoUploadSection } from "./video-upload-section";

export const PersonVideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = useUserStore((st) => st.userId);
  return (
    <div className={"person-video-page"}>
      <div className={"person-videos"}>
        <div>video</div>
        <div>video</div>
      </div>
      {id === userId && <VideoUploadSection />}
    </div>
  );
};
