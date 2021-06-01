import React, { useEffect, useState } from "react";
import style from "./style.scss";
import Button from "./Button";

function MyCounter(props) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [isIncrement, setIsIncrement] = useState(true);
  const [minStep, setMinStep] = useState(1);
  const [maxStep, setMaxStep] = useState(100);
  const [inpValue, setInpValue] = useState(1);
  const [isAutoClick, setIsAutoClick] = useState(false);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [minDelay, setMinDelay] = useState(500);
  const [maxDelay, setMaxDelay] = useState(10000);

  const handleChangeMode = () => {
    setIsIncrement(!isIncrement);
  };

  const countHandler = () => {
    isIncrement ? setCount(count + step) : setCount(count - step);
  };

  const changeStep = ({ target: { value } }) => {
    if (value <= 100 || value == 1) {
      isIncrement ? setStep(step + 1) : setStep(step - 1 || 1);
      setStep(+value || 1);
      setInpValue(value);
    }
    if (+value < 0) {
      setInpValue(1);
    }
  };
  const autoClick = () => {
    setIsAutoClick(!isAutoClick);
  };
  const changeDelay = ({ target, target: { value } }) => {
    target.value = value;
    setDelay(+value);
  };

  useEffect(() => {
    let id = null;
    if (isAutoClick) {
      id = setTimeout(() => {
        countHandler();
      }, delay);
    }
    return () => clearTimeout(id);
  });

  return (
    <div className="container">
      <div className="contOut">Counter:{count}</div>
      <input
        min={minStep}
        max={maxStep}
        type="number"
        onChange={changeStep}
        value={inpValue}
      />
      <Button handler={countHandler} caption={" add counter"} />
      <Button
        handler={handleChangeMode}
        caption={!isIncrement ? "decrement" : "increment "}
      />
      <Button handler={autoClick} caption="AutoClick" />
      <input type="number" onKeyPress={changeDelay} />
    </div>
  );
}

export default MyCounter;
