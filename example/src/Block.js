import React from "react";
export default function Block({ title, data }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
}
