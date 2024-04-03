import Countdown, { zeroPad } from "react-countdown";
import timer from '../../assets/img/icons/timer.svg'

// Random component
const Completionist = () => <span>Time is up!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    // completedAction()
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <div className="flex space-x-3 justify-center items-center py-1 font-montserrat">
        <img src={timer} className="w-8 h-8 spin-spinback mr-2"/>
        <div className="text-center">
          <div className="text-2xl p-1 rounded-md bg-[#203a4aff] text-white">{zeroPad(hours)}</div>
        </div>
        <div className="text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="text-2xl p-1 rounded-md bg-[#203a4aff] text-white">{zeroPad(minutes)}</div>
        </div>
        <div className="text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="text-2xl p-1 rounded-md bg-[#203a4aff] text-white">{zeroPad(seconds)}</div>
        </div>
      </div>
    );
  }
};
function CountDownTwo({ date, completedAction,autoSubmit=true}) {
  return (
      <div className="">
       {
        autoSubmit ?
        <Countdown date={date} renderer={renderer} onComplete={completedAction} />:
        <Countdown date={date} renderer={renderer} />
      }

      </div>
  );
}

export default CountDownTwo;
