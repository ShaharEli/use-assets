import { useState, useEffect, useCallback } from "react";
import { chainImageToName, getTree } from "./utils";
const importAll = async (r: any) => {
  return await Promise.all(r.keys().map(r));
};

type Obj = {
  [key: string]: string;
};

export const useAssets = () => {
  const [assetsPaths, setAssetsPaths] = useState<string[]>([]);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState<Obj>({});
  const [assetsTree, setAssetsTree] = useState<any>({});
  const fetchAssets = useCallback(async () => {
    try {
      const getAssetsData = () =>
        require.context(
          // @ts-ignore
          "../../../src",
          true,
          /\.(png|jpe?g|svg)$/,
          "lazy"
        );

      const allImagesPaths = getAssetsData().keys();
      let obj = {};
      setAssetsPaths(allImagesPaths);
      allImagesPaths
        .map((asset) => {
          const assetPaths = asset.split("/");
          assetPaths.splice(0, 1);
          return assetPaths;
        })
        .forEach((path) => {
          getTree(path, obj);
        });
      setAssetsTree(obj);
      const assetsImports = await importAll(getAssetsData());
      // @ts-ignore
      setAssets(chainImageToName(allImagesPaths, assetsImports));
      setLoadingAssets(false);
    } catch ({ message }) {
      setError(message);
    } finally {
      setLoadingAssets(false);
    }
  }, []);

  const printTree = useCallback(() => {
    console.log(JSON.stringify(assetsTree, null, 2));
  }, [assetsTree]);

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    loadingAssets,
    printTree,
    refetch: fetchAssets,
    assetsPaths,
    error,
    assets,
    assetsTree,
  };
};
