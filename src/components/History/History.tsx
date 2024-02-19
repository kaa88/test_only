import { ComponentPropsWithoutRef, useState } from "react";
import classes from "./History.module.scss";
import { IActivePeriod, IData, PeriodChangeHandler } from "../../types/types";
import Title from "../Title/Title";
import Wheel from "../Wheel/Wheel";
import Slider from "../Slider/Slider";
import { transitionIsLocked } from "../../utils/transitionLock";
import ArrowButton from "../ArrowButton/ArrowButton";
import { getFormattedNumber } from "../../utils/utils";

export const ANIMATION_TIME = 1500;

interface HistoryProps extends ComponentPropsWithoutRef<"div"> {
  data: IData;
}

const History = function ({ className = "", data, ...props }: HistoryProps) {
  const defaultActivePeriod = 0;
  const [activePeriod, setActivePeriod] =
    useState<IActivePeriod>(defaultActivePeriod);

  const handlePeriodChange: PeriodChangeHandler = (value) => {
    if (!transitionIsLocked(ANIMATION_TIME)) setActivePeriod(value);
  };

  const handleButtonIncrement = () => {
    if (activePeriod < data.length - 1) handlePeriodChange(activePeriod + 1);
  };
  const handleButtonDecrement = () => {
    if (activePeriod > 0) handlePeriodChange(activePeriod - 1);
  };

  return (
    <div className={`${className} ${classes.wrapper}`} {...props}>
      <Title className={classes.title}>Исторические даты</Title>

      <Wheel
        className={classes.wheel}
        data={data}
        activePeriod={activePeriod}
        onPeriodChange={handlePeriodChange}
      />

      <div className={classes.periodNav}>
        <div className={classes.periodNavInfo}>{`${getFormattedNumber(
          activePeriod + 1
        )}/${getFormattedNumber(data.length)}`}</div>
        <div className={classes.periodNavButtons}>
          <ArrowButton
            onClick={handleButtonDecrement}
            disabled={activePeriod === 0}
          />
          <ArrowButton
            onClick={handleButtonIncrement}
            disabled={activePeriod === data.length - 1}
          />
        </div>
      </div>

      <Slider
        className={classes.slider}
        data={data}
        activePeriod={activePeriod}
      />
    </div>
  );
};
export default History;
