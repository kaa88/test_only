import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import classes from "./Wheel.module.scss";
import { IActivePeriod, IData, PeriodChangeHandler } from "../../types/types";
import Counter from "../Counter/Counter";

interface WheelProps extends ComponentPropsWithoutRef<"div"> {
  data: IData;
  activePeriod: IActivePeriod;
  onPeriodChange: PeriodChangeHandler;
}

const Wheel = function ({
  className = "",
  data,
  activePeriod,
  onPeriodChange: setPeriod,
  ...props
}: WheelProps) {
  const buttonCount = data.length;

  const angles = useMemo(() => {
    const angles = [0];
    const angleDiff = Math.floor(360 / buttonCount);
    for (let i = 1; i < buttonCount; i++) {
      angles[i] = angles[i - 1] + angleDiff;
    }
    return angles;
  }, [buttonCount]);

  const startButtonsAngle = 120;

  // Wheel
  const [wheelLap, setWheelLap] = useState(0);
  const [prevWheelAngle, setPrevWheelAngle] = useState(0);
  const wheelAngle =
    angles[activePeriod] - prevWheelAngle <= 180
      ? angles[activePeriod]
      : angles[activePeriod] - 360;

  if (
    prevWheelAngle > 0 &&
    wheelAngle >= 0 &&
    wheelAngle < prevWheelAngle &&
    prevWheelAngle - wheelAngle >= 180
  )
    setWheelLap(wheelLap + 1);
  if (
    prevWheelAngle < 0 &&
    wheelAngle < 0 &&
    wheelAngle > prevWheelAngle &&
    prevWheelAngle - wheelAngle < -180
  )
    setWheelLap(wheelLap - 1);
  if (prevWheelAngle !== wheelAngle) setPrevWheelAngle(wheelAngle);

  const finalWheelAngle = wheelAngle + wheelLap * 360;
  // /Wheel

  // Counts
  const period = data[activePeriod];
  const counts = [
    period.items[0].year,
    period.items[period.items.length - 1].year,
  ];
  // /Counts

  return (
    <div className={`${className} ${classes.wrapper}`} {...props}>
      <div
        className={classes.wheel}
        style={{ transform: `rotate(${-finalWheelAngle}deg)` }}
      >
        {angles.map((angle, index) => {
          const spokeAngle = angle + startButtonsAngle;
          const buttonAngle = -spokeAngle + finalWheelAngle;
          return (
            <div
              className={classes.wheelSpoke}
              style={{ transform: `rotate(${spokeAngle}deg)` }}
              key={index}
            >
              <button
                className={`${classes.wheelButton} ${
                  activePeriod === index ? classes.active : ""
                }`}
                style={{ transform: `rotate(${buttonAngle}deg)` }}
                onClick={() => setPeriod(index)}
              >
                <div className={classes.wheelButtonInner}>
                  <span>{index + 1}</span>
                </div>
                <div className={classes.wheelButtonText}>
                  <span>{data[index].title}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      <div className={classes.counters}>
        <Counter value={counts[0]} />
        <Counter value={counts[1]} />
      </div>
    </div>
  );
};
export default Wheel;
