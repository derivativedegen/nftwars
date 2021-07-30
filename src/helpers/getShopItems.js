import { convertItem } from "./convertItem";

export const getShopItems = async (shopContract) => {
  const items = await shopContract.fetchMarketItems().then((items) => {
    const converted = items.map((item) => {
      const itemJson = convertItem(item);
      return itemJson;
    });
    return converted;
  });
  return items;
};
