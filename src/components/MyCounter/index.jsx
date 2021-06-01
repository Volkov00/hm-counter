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
  const [delay, setDelay] = useState(1000);
  const [clicksPerSecond, setClicksPerSecond] = useState(1);

  const handleChangeMode = () => setIsIncrement(!isIncrement);

  const countHandler = () =>
    isIncrement ? setCount(count + step) : setCount(count - step);

  const changeStep = ({ target: { value } }) => {
    if (+value <= 100 || +value == 1) {
      isIncrement ? setStep(step + 1) : setStep(step - 1);
      setStep(+value || 1);
      setInpValue(+value);
    }
    if (+value < 0) {
      setInpValue(1);
    }
  };

  const toogleAutoClick = () => setIsAutoClick(!isAutoClick);

  const changeDelay = (event) => {
    const {
      target: { value },
    } = event;
    setClicksPerSecond((prevValue) => {
      if (value <= 0) return 1;
      if (value > 1000) return 1000;
      return value;
    });
    if (event.charCode === 13) {
      setDelay(1000 / clicksPerSecond);
    }
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
      <label>
        step:
        <input
          min={minStep}
          max={maxStep}
          type="number"
          onChange={changeStep}
          value={inpValue}
        />
      </label>
      <div>
        <label>
          clicks for second:
          <input
            type="number"
            onChange={changeDelay}
            onKeyPress={changeDelay}
            value={clicksPerSecond}
          />
        </label>
      </div>
      <Button
        handler={countHandler}
        caption={isIncrement ? "counter++" : "counter--"}
      />
      <Button
        handler={handleChangeMode}
        caption={!isIncrement ? " Mode : decrement" : " Mode: increment "}
      />
      <Button handler={toogleAutoClick} caption="AutoClick" />
    </div>
  );
}

export default MyCounter;
