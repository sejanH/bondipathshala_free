
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import cross from "../../../assets/img/icons/cross.svg";
import 'react-circular-progressbar/dist/styles.css';

function ResultSummery({ title = 'Exam Result', result = {}, bgColor = 'warning', customWidth = '', hideCloseBtn = false }) {
    let wrongPercentage = (result.totalWrongAnswer / result.totalMarksMcq) * 100;
    if (parseFloat(result.totalObtainedMarks) < 0) {
        wrongPercentage = 100;
    }
    const noOfQuestions = parseInt(result.totalMarksMcq / result.marksPerMcq);
    let myRank = result?.rank;
    if (typeof result.totalStudent != "undefined") {
        myRank = result.rank + '/' + result.totalStudent;
    }
    return (
        <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            {/* {
                result.examName && ( */}
                    <div className="modal modal-middle">
                        <div className={`modal-box rounded-2xl p-0 relative bg-${bgColor} ${customWidth}`}>
                            <h3 className="text-3xl font-bold py-1 text-center text-white bg-title-2">{title}</h3>
                            {!hideCloseBtn && (<label htmlFor="my-modal-4" className="btn bg-inactive border-0 btn-xs btn-circle absolute right-2 top-2"><img className="w-3 h-3" src={cross} /></label>)}
                            <div className="relative md:min-h-[18rem] overflow-auto p-4">
                                <h2 className="text-3xl font-bold mb-2">{result.examName} (Free Exam)</h2>
                                <div className="grid tab:grid-cols-5 grid-flow-rows gap-x-4 tab-max:grid-cols-2 sm-min:grid-cols-2 gap-y-4 place-content-center resultSummery">
                                    <div className="resultSummery_col">
                                        <span className="resultSummery_col_top">Total Questions</span>
                                        <span className="resultSummery_col_bottom">{result.totalMarksMcq / result.marksPerMcq}</span>
                                        <div className='text-center text-xl text-slate-700'>Full Marks
                                            <span className='pl-1 font-bold text-title-2'>{result.totalMarksMcq}</span>
                                        </div>
                                    </div>
                                    <div className="resultSummery_col">
                                        <span className="resultSummery_col_top">Correct Answers</span>
                                        <span className="resultSummery_col_bottom">{result.totalCorrectAnswer}</span>
                                        <div className='text-center text-xl text-slate-800 font-bold'>{result.totalCorrectAnswer} x {result.marksPerMcq}</div>
                                    </div>
                                    <div className="resultSummery_col">
                                        <span className="resultSummery_col_top">Wrong Answers</span>
                                        <span className="resultSummery_col_bottom">{result.totalWrongAnswer}</span>
                                        <div className='text-center text-xl text-slate-800 font-bold'>({result.marksPerWrong}) x {result.totalWrongAnswer}</div>
                                    </div>
                                    <div className="resultSummery_col">
                                        <span className="resultSummery_col_top">Not Answered</span>
                                        <span className="resultSummery_col_bottom">{result.totalNotAnswered}</span>
                                        <div className='text-center text-xl text-slate-800 font-bold'>{result.totalNotAnswered}</div>
                                    </div>
                                    <div className="resultSummery_col_circle tab-max:col-span-2">
                                        <CircularProgressbarWithChildren value={wrongPercentage == 100 ? 0 : result.totalCorrectAnswer}
                                            maxValue={noOfQuestions}
                                            styles={buildStyles({
                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',
                                                // How long animation takes to go from one percentage to another, in seconds
                                                pathTransitionDuration: 0.5,
                                                // Colors
                                                pathColor: '#00e500',
                                                textColor: '#000',
                                                trailColor: '#646464',
                                                border: 'none'
                                            })}
                                        >
                                            <div className='marksContainer'>
                                                <span className='top'>{result.totalObtainedMarks}</span>
                                                <span className='bottom'>{result.totalMarksMcq}</span>
                                            </div>
                                            <CircularProgressbar
                                                value={wrongPercentage == 100 ? noOfQuestions : result.totalWrongAnswer}
                                                maxValue={noOfQuestions}
                                                styles={buildStyles({
                                                    rotation: wrongPercentage == 100 ? 0 : parseFloat(result.totalCorrectAnswer / noOfQuestions),
                                                    trailColor: "transparent",
                                                    pathColor: "#ff0000",
                                                    strokeLinecap: "butt",
                                                    border: 'none'
                                                })}
                                            />
                                        </CircularProgressbarWithChildren>
                                        <div className="text-3xl">Your Marks</div>
                                    </div>
                                </div>
                                <div className='text-center p-2 text-white text-xl'>
                                    <span className='py-1 px-3 btn-theme rounded-s-3xl'>Your Merit Position</span>
                                    <span className='py-1 px-3  bg-[#203a4a] rounded-e-3xl'>{result?.rank == "-1" ? "Pending" : myRank}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* )
            } */}
        </>
    )
}

export default ResultSummery