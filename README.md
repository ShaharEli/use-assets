# use-assets

> Assets import never been easier 🚀
> <br><br>
> No more searching for images paths in your project! 🔍🙅🏻‍♂️
> <br><br>
> useAssets will build assets tree for all the images in your src folder and import it to you automatically with cache

[![NPM](https://img.shields.io/npm/v/use-assets.svg)](https://www.npmjs.com/package/use-assets) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-assets
```

## Usage

1. Put all your images in the src folder (the order don`t matter use as many subdirs as you want)
2. Make sure all images have unique name (the name of the pic is the key in the assets object)
3. Enjoy

```tsx
import * as React from "react";

import { useAssets } from "use-assets";

const Example = () => {
  const { assets, loadingAssets, assetsPaths, assetsTree, assetsError } =
    useAssets();

  if (assetsError) {
    return <span>Error occurred...</span>;
  }

  if (loadingAssets) {
    return <span>Loading assets...</span>;
  }
  return (
    <div>
      <img src={assets.cow} />
    </div>
  );
};
```

## Preview

[gh pages (check the example folder in github for reference)](https://shahareli.github.io/use-assets/)

## License

MIT © [ShaharEli](https://github.com/ShaharEli)
