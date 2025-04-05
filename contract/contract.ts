import { ethers } from "ethers";
import abi from "./abi";

declare let window: any;

export const getProvider = () => {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  const signer = await provider.getSigner();
  return signer;
};

// export const getContract = async () => {
//   const signer = await getSigner();
//   const address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

//   if (!address) throw new Error("Missing contract address");

//   return new ethers.Contract(address, abi, signer);
// };

export const getContract = async () => {
  const signer = await getSigner();

  const address = "0x70BD5C50b89f064438fE0fb2372188B4577B6837"; // atau dari process.env
  console.log("Creating contract with address:", address);
  console.log(
    "ABI has getAuctions:",
    abi.some((f) => f.name === "getAuctions")
  );

  const contract = new ethers.Contract(address, abi, signer);
  console.log("Contract instance:", contract);

  return contract;
};
