/* eslint-disable */
import { useEffect, useState } from "react";
function Question({ question, index, handleQuestionSelect }) {
  const [counter, NULL] = useState(index + 1);
  const [options, setOptions] = useState(question.options);
  useEffect(() => {
    if (question.type === false) {
      setOptions(Array.from(Array(question.optionCount)).map((e, i) => String.fromCharCode(65 + parseInt(i))));
    }
  }, [question]);

  return (
    <div className="mb-6">
      <div className="mb-3 rounded-lg shadow-[0px_0px_6px_2px_rgba(0,0,0,0.75)]">
        {/* {counter}.{" "} */}
        {question.type == false ? (
          <div>
            <img className="rounded-lg"  src={`${process.env.REACT_APP_FILES_HOST}/${question.question}`} />
          </div>
        ) : (
          <span>{question.question}</span>
        )}
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-x-8 gap-y-2">
        {
          options.map((opt, idx) => (
            <div className="odd:justify-self-end even:justify-items-start" key={`opt.${idx}`}>
              <label className="custom-label cursor-pointer inline-flex items-center relative rounded-lg py-1 px-12">
                <input
                  onChange={(e) => handleQuestionSelect(e, index)}
                  type="radio"
                  className="custom-radio"
                  value={idx}
                  checked={question.answeredOption == idx}
                  disabled={question.answeredOption !== "-1" && question.answeredOption != idx}
                />
                <span className="absolute left-[50%] -translate-x-[50%]"> {opt}</span>
              </label>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Question;
