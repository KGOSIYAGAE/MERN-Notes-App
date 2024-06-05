import React from "react";

function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgSrc} alt="add-note-img" />
      <p className="w-1/2 text-sm font-medium text-slate-700 leading-7 text-center mt-5">{message}</p>
    </div>
  );
}

export default EmptyCard;
{
}
