export const getAllTokenJsons = async (hash, tokeIdArray) => {
  if (!hash) return;
  const gateway = "https://gateway.pinata.cloud/ipfs/";
  const fullHash = gateway + hash + "/";
  // console.log(fullHash);

  const jsons = tokeIdArray.map(async (tokenID) => {
    return await fetch(`${fullHash}${tokenID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
  });

  const jsonsResolved = await Promise.all(jsons).then((items) => {
    return items;
  });

  const resolved = await Promise.resolve(jsonsResolved);
  return resolved;
};
