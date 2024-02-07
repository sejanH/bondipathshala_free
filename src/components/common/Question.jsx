/* eslint-disable */
import { useEffect, useState } from "react";
function Question({ question, index, handleQuestionSelect }) {
  const [counter, NULL] = useState(index + 1);
  const [px, setPx] = useState('px-12');
  const [options, setOptions] = useState(question.options);
  useEffect(() => {
    if (question.type === false) {
      setOptions(Array.from(Array(question.optionCount)).map((e, i) => String.fromCharCode(65 + parseInt(i))));
    }else{
      setPx('px-1');
    }
  }, [question]);

  return (
    <div className="mb-6 relative">
    <span className="questionNo">{counter}</span>
      <div className="mb-3 rounded-lg shadow-[0px_0px_6px_2px_rgba(0,0,0,0.75)]">
        {/* {counter}.{" "} */}
        {question.type == false ? (
          <div>
            <img className="rounded-lg" src={`${process.env.REACT_APP_FILES_HOST}/${question.question}`} />
          </div>
        ) : (
          <div className="py-2 px-3">{question.question}</div>
        )}
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-x-8 gap-y-2">
        {
          options.map((opt, idx) => (
            <div className="odd:justify-self-end even:justify-items-start" key={`opt.${idx}`}>
              <label className={`custom-label cursor-pointer inline-flex items-center relative rounded-lg py-1 ${px}`}>
                <input
                  onChange={(e) => handleQuestionSelect(e, index)}
                  type="radio"
                  className="custom-radio"
                  value={idx}
                  checked={question.answeredOption == idx}
                  disabled={question.answeredOption !== "-1" && question.answeredOption != idx}
                />
                {
                  question.type == false ?
                    <span className="absolute left-[50%] -translate-x-[50%]"> {opt}</span>:
                    <div className="min-w-[5.5rem]">
                      <span className="absolute left-[10%] -translate-x-[25%]"> {String.fromCharCode(65 + parseInt(idx))}</span>
                      <span className="optionValue">{opt}</span>
                    </div>
                }
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Question;
