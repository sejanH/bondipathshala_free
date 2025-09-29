import React from 'react'

function NoExams(props) {
  return (
    <div className="col-span-2 border border-border-color-3 bg-white rounded-lg px-5 py-5 text-[24px]">
        {props.message}
    </div>
  )
}

export default NoExams