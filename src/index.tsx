import { useState, useEffect, useCallback } from "react";
import { chainImageToName, getTree } from "./utils";
const importAll = async (r: any): Promise<Pic[]> => {
  return await Promise.all(r.keys().map(r));
};

type Obj = {
  [key: string]: string;
};

interface Module {
  default: string;
  Symbol: Symbol;
}
type Pic = Module | string;

let cachedAssets: Obj | null = null;
export const useAssets = () => {
  const [assetsPaths, setAssetsPaths] = useState<string[]>([]);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(!!cachedAssets);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState<Obj>(cachedAssets || {});
  const [assetsTree, setAssetsTree] = useState<any>({});
  const fetchAssets = useCallback(async () => {
    if (cachedAssets) return; //make sure the the assets only imported once
    try {
      const getAssetsData = () =>
        require.context("../../../src", true, /\.(png|jpe?g|svg)$/, "lazy");

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
      const assetsImports = await (
        await importAll(getAssetsData())
      )
        // @ts-ignore
        .map((pic: Pic) => (pic?.default ? pic.default : pic));
      const formattedAssets = chainImageToName(allImagesPaths, assetsImports);
      setAssets(formattedAssets);
      setLoadingAssets(false);
      cachedAssets = formattedAssets;
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
    refetch: async () => {
      cachedAssets = null;
      await fetchAssets();
    },
    assetsPaths,
    error,
    assets,
    assetsTree,
  };
};
