import { FC, useState } from "react";
import ReactPlayer from "react-player";

type PlayerProps = {
  file?: File | string;
  imageOnly?: boolean;
  width?: number;
};

export const Player: FC<PlayerProps> = ({
  file,
  imageOnly = false,
  width = 600,
}) => {
  if (!file) {
    return (
      <img
        src={"https://www.gunungrajapaksi.com/upload/image/default.jpg"}
        alt={"Здесь должно быть видео"}
        width={width}
        height={(width / 16) * 9}
        style={{ boxShadow: "0 0 20px #0003" }}
      />
    );
  }
  return (
    <ReactPlayer
      url={file instanceof File ? URL.createObjectURL(file) : file}
      controls={!imageOnly}
      width={width}
      height={(width / 16) * 9}
      fallback={<p>Тут должно быть видево</p>}
    />
  );
};
