
// const types = {
//   1:"daily",
//   2:"weekly",
//   3:"monthly",
// };
function ExamInfoDetails({ examInfos }) {
  return (
    <div className="mx-6 rounded-xl border border-2">
      <div className="grid grid-rows-1 md:grid-rows-2 grid-flow-col divide-x">        
          <div className="px-2 py-1">
            <span>Questions: </span>
            <span className="font-bold text-title-2">{examInfos.totalQuestionMcq}</span>
          </div>
          <div className="px-2 py-1">
            <span>Full Marks: </span>
            <span className="font-bold text-title-2">{examInfos.totalMarksMcq}</span>
          </div>
          <div className="px-2 py-1">
            <span>Time: </span>
            <span className="font-bold text-title-2">{examInfos.duration} min</span>
          </div>
          <div className="px-2 py-1">
            <span>Negative Marks: </span>
            <span className="font-bold text-title-2">{examInfos.negativeMarks}%</span>
          </div>
      </div>
    </div>
  );
}

export default ExamInfoDetails;
