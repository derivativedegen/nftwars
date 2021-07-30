import { convertBigNum } from "./convertBigNum";
import { convertBigNumEth } from "./convertBigNumEth";

export const convertItem = (item) => {
  const itemJson = {
    itemId: convertBigNum(item[0]),
    nftContract: item[1],
    tokenId: convertBigNum(item[2]),
    seller: item[3],
    owner: item[4],
    price: convertBigNumEth(item[5]),
    sold: item[6],
  };

  return itemJson;
};

// struct MarketItem {
//     uint itemId;
//     address nftContract;
//     uint256 tokenId;
//     address payable seller;
//     address payable owner;
//     uint256 price;
//     bool sold;
// }
