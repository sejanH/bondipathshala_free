import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="flex space-x-2 text-xl text-gray-600 font-semibold">
        <span className="animate-bounce [animation-delay:0ms]">L</span>
        <span className="animate-bounce [animation-delay:100ms]">o</span>
        <span className="animate-bounce [animation-delay:200ms]">a</span>
        <span className="animate-bounce [animation-delay:300ms]">d</span>
        <span className="animate-bounce [animation-delay:400ms]">i</span>
        <span className="animate-bounce [animation-delay:500ms]">n</span>
        <span className="animate-bounce [animation-delay:600ms]">g</span>
        <span className="animate-bounce [animation-delay:700ms]">.</span>
        <span className="animate-bounce [animation-delay:800ms]">.</span>
        <span className="animate-bounce [animation-delay:900ms]">.</span>
      </div>
    </div>
  );
}

export default Loader;
