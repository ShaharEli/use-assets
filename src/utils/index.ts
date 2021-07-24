export const getTree = (paths: string[], obj: any) => {
  paths.forEach((acc, i) => {
    let curr = obj;
    for (let j = 0; j <= i; j++) {
      if (j === paths.length - 2) {
        if (curr[paths[j]]) {
          curr[paths[j]].push(acc);
        } else {
          curr[paths[j]] = [acc];
        }
        curr[paths[j]] = Array.from(new Set(curr[paths[j]])).filter(
          (val: any) => {
            const deepClonedPaths = [...paths];
            deepClonedPaths.splice(deepClonedPaths.length - 1, 1);
            return !deepClonedPaths.includes(val);
          }
        );
        break;
      }
      if (!curr[paths[j]]) curr[paths[j]] = {};
      curr = curr[paths[j]];
    }
  });
  return obj;
};
export const chainImageToName = (paths: string[], images: string[]) => {
  const imagesNames = paths.map((img) => {
    const splitted = img.split("/");
    return splitted[splitted.length - 1].split(".")[0];
  });
  return imagesNames.reduce((acc, curr: string, i: number) => {
    acc[curr] = images[i];
    return acc;
  }, {});
};
