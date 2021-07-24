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

let rendered = false;
export const useAssets = () => {
  const [assetsPaths, setAssetsPaths] = useState<string[]>([]);
  const [loadingAssets, setLoadingAssets] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState<Obj>({});
  const [assetsTree, setAssetsTree] = useState<any>({});
  const fetchAssets = useCallback(async () => {
    if (rendered) return; //make sure the the assets only imported once
    rendered = true;
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
    refetch: async () => {
      rendered = false;
      await fetchAssets();
    },
    assetsPaths,
    error,
    assets,
    assetsTree,
  };
};
