/* eslint-disable */
import { useEffect, useState } from 'react'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
function Question({ question, index, handleQuestionSelect }) {
  const [counter, NULL] = useState(index + 1)
  const [options, setOptions] = useState(question.options)
  useEffect(() => {
    if (question.type === false) {
      setOptions(
        Array.from(Array(question.optionCount)).map((e, i) =>
          String.fromCharCode(65 + parseInt(i))
        )
      )
    }
  }, [question])

  return (
    <div className="mb-6 relative">
      <span className="questionNo">{counter}</span>
      <div className="mb-3 rounded-lg shadow-[0px_0px_6px_2px_rgba(0,0,0,0.75)]">
        {/* {counter}.{" "} */}
        {question.type == false ? (
          <div>
            <img
              className="rounded-lg"
              src={`${process.env.REACT_APP_FILES_HOST}/${question.question}`}
            />
          </div>
        ) : (
          <div className="rounded-lg text-[1.5rem] font-bold p-4">
            <Latex> {question.question}</Latex>
          </div>
        )}
      </div>
      {question.type === false ? (
        <div className="grid grid-cols-2 grid-flow-row gap-x-8 gap-y-2">
          {options.map((opt, idx) => (
            <div
              className="odd:justify-self-end even:justify-items-start"
              key={`opt.${idx}`}
            >
              <label className="custom-label cursor-pointer inline-flex items-center relative rounded-lg py-1 px-12">
                <input
                  onChange={(e) => handleQuestionSelect(e, index)}
                  type="radio"
                  className="custom-radio"
                  value={idx}
                  checked={question.answeredOption == idx}
                  disabled={
                    question.answeredOption !== '-1' &&
                    question.answeredOption != idx
                  }
                />
                <span className="absolute left-[50%] -translate-x-[50%]">
                  {' '}
                  {opt}
                </span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-start  gap-x-8 gap-y-5">
          {options.map((opt, idx) => (
            <>
              {/* <div className="md:hidden"></div> */}
              <div className="" key={`opt.${idx}`}>
                <label className="custom-label text-lg cursor-pointer inline-flex relative rounded-lg py-1 px-2 justify-center items-center">
                  <div className="relative flex justify-start items-center">
                    <input
                      onChange={(e) => handleQuestionSelect(e, index)}
                      type="radio"
                      className="custom-radio custom-radio2"
                      value={idx}
                      checked={question.answeredOption == idx}
                      disabled={
                        question.answeredOption !== '-1' &&
                        question.answeredOption != idx
                      }
                    />
                    <span className="absolute ml-1 font-bold ">
                      {String.fromCharCode(65 + parseInt(idx))}
                    </span>
                  </div>
                  <p className="ml-3">
                    <Latex>{opt}</Latex>
                  </p>
                </label>
              </div>
              {/* <div className="md:hidden"></div> */}
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default Question
