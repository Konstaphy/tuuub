import { FC, useState } from "react";
import ReactPlayer from "react-player";

type PlayerProps = {
  file?: File | string;
};

export const Player: FC<PlayerProps> = ({ file }) => {
  if (!file) {
    return (
      <img
        src={"https://www.gunungrajapaksi.com/upload/image/default.jpg"}
        alt={"Здесь должно быть видео"}
        width={600}
        height={(600 / 16) * 9}
        style={{ clip: "rect(0 0 600 400)", boxShadow: "0 0 20px #0003" }}
      />
    );
  }
  return (
    <ReactPlayer
      url={file instanceof File ? URL.createObjectURL(file) : file}
      controls
      fallback={<p>Тут должно быть видево</p>}
    />
  );
};
