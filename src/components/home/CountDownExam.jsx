import React from "react";
import hourglass from "../../assets/img/icons/hourglass.png";
import Countdown, { zeroPad } from 'react-countdown';

// Renderer callback with condition
const renderer = (props) => {
  if (props.completed) {
    // Render a complete state
    return;
  } else {
    // Render a countdown
    return (
      <div className="flex flex-row space-x-3 justify-center items-center py-2">
        {
          props.days > 0 &&
          (<div className="text-center">
            <div className="text-3xl md:text-xl">{zeroPad(props.days)} Days,</div>
          </div>)
        }
        <div className="text-center">
          <div className="text-3xl md:text-xl">{zeroPad(props.hours)} Hours,</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-xl">{zeroPad(props.minutes)} Min,</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-xl">{zeroPad(props.seconds)} sec</div>
        </div>
      </div>
    );
  }
};
const CountDownExam = ({ id, title, img, date }) => {
  return (
    <div title={title} className="upcoming">
      <div className="mb-[0.82rem]">
        <img className="w-full" src={`${process.env.REACT_APP_FILES_HOST}/${img}`} alt={title} />
      </div>
      <div className="timer_container flex flex-row p-2 items-center">
          <div className="timer_container__timer grow">
            <Countdown date={date} renderer={renderer}></Countdown>
          </div>
          <div className="timer_container__icon">
            <span><img src={hourglass} alt="timer" className="h-6 w-full" /></span>
          </div>
      </div>
    </div>
  );
}

export default CountDownExam;
