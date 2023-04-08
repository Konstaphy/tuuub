import { useState, FormEvent, ChangeEvent } from "react";
import { videosTransport } from "../../features/videos/api/videos-transport";

export const UploadVideoPage = () => {
  const [file, setFile] = useState<undefined | File>(undefined);
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
    <form className={"upload-video-page"} onSubmit={handleSubmit}>
      <input type={"file"} accept={".mp4"} onChange={handleFileChange} />
      <button type={"submit"}>Upload Video</button>
    </form>
  );
};
