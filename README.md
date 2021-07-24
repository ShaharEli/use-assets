# use-assets

> Assets import never been easier

[![NPM](https://img.shields.io/npm/v/use-assets.svg)](https://www.npmjs.com/package/use-assets) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-assets
```

## Usage

1. Put all your images in the src folder
2. Make sure all images have uniq name
3. Enjoy

```tsx
import * as React from "react";

import { useAssets } from "use-assets";

const Example = () => {
  const { loadingAssets, assetsPaths, assetsTree, assets, assetsError } =
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

## License

MIT © [ShaharEli](https://github.com/ShaharEli)
