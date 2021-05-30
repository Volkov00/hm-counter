import React, { useState } from "react";
import style from "./style.scss";

function MyCounter(props) {
  const regEx = /[\-]/g;
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [btnStatus, setBtnStatus] = useState(true);
  const [minStep, setMinStep] = useState(1);
  const [maxStep, setMaxStep] = useState(100);
  const [inpValue, setInpValue] = useState(1);

  const toogleBtnFunc = () => {
    setBtnStatus(!btnStatus);
    console.log(btnStatus);
  };

  const currentCounter = () => {
    btnStatus === true ? setCount(count + step) : setCount(count - step);
  };

  const switchStep = ({ target: { value } }) => {
    if ((value.length <= 3 && value <= 100) || value === 1) {
      btnStatus === true ? setStep(step + 1) : setStep(step - 1 || 1);
      setStep(+value || 1);
      setInpValue(value);
    }
    if (regEx.test(value)) {
      setInpValue(1);
    }
  };
  return (
    <div className="container">
      <div className="contOut">Counter:{count}</div>
      <input
        min={minStep}
        max={maxStep}
        type="number"
        onChange={switchStep}
        value={inpValue}
      />
      <button onClick={currentCounter}>Enter Counter</button>
      <button onClick={toogleBtnFunc}>
        mode: {!btnStatus ? "decrement" : "increment "}
      </button>
    </div>
  );
}

export default MyCounter;
