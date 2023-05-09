import classes from "./button.module.css";
import { FC, PropsWithChildren } from "react";

type ButtonProps = {
  onClick?: VoidFunction;
  type?: HTMLButtonElement["type"];
  secondary?: boolean;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  secondary,
}) => {
  const className = `${classes.button} ${
    secondary ? classes.secondary : undefined
  }`;
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};
