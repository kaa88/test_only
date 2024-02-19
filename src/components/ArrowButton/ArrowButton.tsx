import { ComponentPropsWithoutRef } from "react";
import classes from "./ArrowButton.module.scss";
import iconSprite from "../../assets/icons/sprite.svg";

interface ArrowButtonProps extends ComponentPropsWithoutRef<"button"> {
  children?: undefined;
  variant?: "default" | "slider";
}

const ArrowButton = function ({
  className = "",
  variant = "default",
  ...props
}: ArrowButtonProps) {
  const name = "icon-arrow-short";
  const path = `${iconSprite}#${name}`;

  return (
    <button
      className={`${className} ${classes[variant]}`}
      type="button"
      {...props}
    >
      <svg name={name}>
        <use href={path}></use>
      </svg>
    </button>
  );
};
export default ArrowButton;
