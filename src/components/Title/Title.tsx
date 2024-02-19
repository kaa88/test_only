import { ComponentPropsWithoutRef } from "react";
import classes from "./Title.module.scss";

interface TitleProps extends ComponentPropsWithoutRef<"div"> {}

const Title = function ({ className = "", children, ...props }: TitleProps) {
  return (
    <div className={`${className} ${classes.wrapper}`} {...props}>
      <h1>{children}</h1>
    </div>
  );
};
export default Title;
