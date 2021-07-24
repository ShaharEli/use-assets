import React from "react";
import { useAssets } from "use-assets";

export default function Block({ title, data }) {
  const { assets } = useAssets();
  console.log(assets?.cow);
  console.log(assets);

  return (
    <div>
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
}
