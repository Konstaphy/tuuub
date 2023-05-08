import { useState, FormEvent, ChangeEvent } from "react";
import { videosTransport } from "../../features/videos/api/videos-transport";
import "./person-video-page.css";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../entities/user/model/user";

export const PersonVideoPage = () => {
  const [file, setFile] = useState<undefined | File>(undefined);
  const { id } = useParams<{ id: string }>();
  const userId = useUserStore((st) => st.userId);

  const handleFileChange = (event?: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setFile(event?.target?.files?.[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    if (file) {
      formData.append("video", file);
      videosTransport.uploadVideo(formData).then(console.log);
    }
  };
  return (
    <div className={"person-video-page"}>
      <div className={"person-videos"}>
        <div>video</div>
        <div>video</div>
      </div>
      {id === userId && (
        <form className={"upload-video-form"} onSubmit={handleSubmit}>
          {/*<img src={"http://localhost:8080/videos/s3?key=videos/Indoor-logo.jpg"} />*/}
          <input type={"file"} accept={".mp4"} onChange={handleFileChange} />
          <button type={"submit"}>Upload Video</button>
        </form>
      )}
    </div>
  );
};
