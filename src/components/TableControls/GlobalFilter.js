import React from 'react'

function GlobalFilter({ filter, setFilter }) {
    return (
      <div className="m-5">
        <span>
          Search:{""}
          <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-zinc-600"
          />
        </span>
      </div>
    );
  };
  
export default GlobalFilter