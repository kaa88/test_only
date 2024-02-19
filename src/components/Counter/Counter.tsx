import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import bezier from "../../utils/bezier";
import { ANIMATION_TIME } from "../History/History";

interface CounterProps extends ComponentPropsWithoutRef<"div"> {
  value: number;
}

const Counter = function ({ className = "", value, ...props }: CounterProps) {
  const [count, setCount] = useState(value);

  const requestRef = useRef<number>(0);
  const bezierTimeRef = useRef<number>(0);

  useEffect(() => {
    runAnimation(value);
  }, [value]);

  const runAnimation = (newCountValue: number) => {
    if (newCountValue === count) return;

    const totalDuration = ANIMATION_TIME / 1000;
    const frameRate = 60;
    const totalFrame = totalDuration * frameRate;
    const increment = 1 / totalFrame;
    const diff = count - newCountValue;

    const animate = () => {
      if (bezierTimeRef.current * totalDuration >= totalDuration) {
        cancelAnimationFrame(requestRef.current);
        setCount(newCountValue);
      } else {
        const currentValue =
          getBezierValue(bezierTimeRef.current) * -diff + count;
        setCount(currentValue);
        bezierTimeRef.current += increment;
        requestRef.current = requestAnimationFrame(animate);
      }
    };
    bezierTimeRef.current = 0;
    requestRef.current = requestAnimationFrame(animate);
  };

  return (
    <p className={className} {...props}>
      {Math.round(count)}
    </p>
  );
};
export default Counter;

const getBezierValue = bezier({ x: 0.15, y: 0.33 }, { x: 0, y: 1 });
