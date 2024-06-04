import React from "react";

function EmptyCard({ imgSrc, message }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={imgSrc} alt="add-note-img" className="flex mt-20" />
      <p className="flex w-3/5 text-center">{message}</p>
    </div>
  );
}

export default EmptyCard;
{
}
