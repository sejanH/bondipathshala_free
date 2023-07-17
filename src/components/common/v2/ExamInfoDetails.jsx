
const types = {
  1:"daily",
  2:"weekly",
  3:"monthly",
};
function ExamInfoDetails({ examInfos }) {
  return (
    <div className="py-2 mx-6 text-white">
      <div className="btn-theme rounded-xl grid grid-rows-1 md:grid-rows-2 md:grid-rows-none grid-flow-col md:grid-flow-col divide-x">        
          <div className="px-2 py-1">
            <span>Exam name & Code: </span>
            <span className="font-bold">{examInfos.name}</span>
          </div>
          <div className="px-2 py-1">
            <span>Full Marks: </span>
            <span className="font-bold">{examInfos.totalMarksMcq}</span>
          </div>
          <div className="px-2 py-1">
            <span>Time: </span>
            <span className="font-bold">{examInfos.duration} min</span>
          </div>
          <div className="px-2 py-1">
            <span>Negative Marks: </span>
            <span className="font-bold">{examInfos.negativeMarks}%</span>
          </div>
          {/* <div>
            <span className="font-bold">Marks Per Question: </span>
            <span>{examInfos.marksPerMcq}</span>
          </div>
          <div>
            <span className="font-bold">Total Marks: </span>
            <span>{examInfos.totalMarksMcq}</span>
          </div>
          <div>
            <span className="font-bold">Negative Marks: </span>
            <span>{examInfos.negativeMarks}%</span>
          </div>
          <div>
            <span className="font-bold">Exam Type: </span>
            <span>{types[examInfos.examType]}</span>
          </div> */}
      </div>
    </div>
  );
}

export default ExamInfoDetails;
