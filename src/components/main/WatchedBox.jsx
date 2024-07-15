import React from "react";

function WatchedBox({
  children,
  setIsOpen2,
  isOpen2,
  avgUserRating,
  avgRuntime,
  avgImdbRating,
  watched,
}) {
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <div className="summary">{children}</div>
        </>
      )}
    </div>
  );
}
export default WatchedBox;
