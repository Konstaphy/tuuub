import { FC, useState, ChangeEvent, FormEvent } from "react";
import { videosTransport } from "../../features/videos/api/videos-transport";
import { Player } from "../../widgets/player/player";
import { Button } from "../../shared/ui/button/button";

export const VideoUploadSection: FC = () => {
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
    <form className={"upload-video-form"} onSubmit={handleSubmit}>
      <div className={"upload-video-form__video"}>
        <Player file={file} />
      </div>
      {/*<img src={"http://localhost:8080/videos/s3?key=videos/Indoor-logo.jpg"} />*/}
      <div className="upload-video-form__controls">
        <label
          htmlFor={"file-upload"}
          style={{ cursor: "pointer", height: "100%" }}
        >
          <input
            onChange={handleFileChange}
            type={"file"}
            id={"file-upload"}
            accept={".mp4"}
          />
          <p className={"secondary"}>Выбрать файл</p>
        </label>

        <Button type={"submit"}>Сохранить видео</Button>
      </div>
    </form>
  );
};
