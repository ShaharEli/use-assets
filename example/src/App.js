import React from "react";
import Block from "./Block";
import { useAssets } from "use-assets";

const App = () => {
  const { loadingAssets, assetsPaths, assetsTree, assets } = useAssets();
  if (loadingAssets) {
    return <span>Loading assets...</span>;
  }
  return (
    <div>
      <img src={assets.cow} />
      <img src={assets.grass} />
      <img src={assets.bob} />
      <img src={assets.john} />
      <Block
        title="Assets paths:"
        data={JSON.stringify(assetsPaths, null, 2)}
      />
      <Block title="Assets tree:" data={JSON.stringify(assetsTree, null, 2)} />
    </div>
  );
};
export default App;
