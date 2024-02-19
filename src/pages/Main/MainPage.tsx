import classes from "./MainPage.module.scss";
import rawData from "../../data.json";
import { IData } from "../../types/types";
import History from "../../components/History/History";

const data = (rawData as IData) || [];
const sortedData = data.map((period) => ({
  ...period,
  items: period.items.sort((a, b) => a.year - b.year),
}));

const MainPage = function () {
  return (
    <div className={classes.page}>
      <History className={classes.history} data={sortedData} />
    </div>
  );
};
export default MainPage;
