import Asset from "../types/assets";
import {CheckCircle} from "react-feather";

let defaultAssets: Array<Asset>;
defaultAssets = [
  {
    id: "0",
    name: "ALGO",
    verified: true
  },

  {
    id: "21582668",
    name: "TINYUSDC",
     verified: true

  },

  // {
  //   id: "22847688",
  //   name: "YLDY",
  // },
  {
    id: "10458941",
    name: "USDC",
     verified: true
  },
  {
    id: "27963203",
    name: "BOARD",
     verified: false
  },
  // {
  //   id: "12400859",
  //   name: "Monerium",
  // },
];

export { defaultAssets };
