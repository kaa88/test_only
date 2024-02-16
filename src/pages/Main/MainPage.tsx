import { ComponentProps } from "react";
import classes from "./MainPage.module.scss";

interface MainPageProps extends ComponentProps<"div"> {}

const MainPage = function ({
  className = "",
  children,
  ...props
}: MainPageProps) {
  return (
    <div className={`${className} ${classes.default}`} {...props}>
      {children}
    </div>
  );
};
export default MainPage;
