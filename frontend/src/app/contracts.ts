import { getContract } from "thirdweb"
import { client } from "../utils/client"
import { chainById } from "../utils/chains"

export const contract = getContract({
    client: client,
    address: "",  // contract address
    chain: chainById,
});