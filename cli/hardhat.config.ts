import "@nomicfoundation/hardhat-toolbox";
import { config as envConfig } from "dotenv";

import path from "path";

import type { HardhatUserConfig } from "hardhat/config";

// import { DEFAULT_ETH_PROVIDER } from "./ts/utils/defaults";

envConfig();

const parentDir = __dirname.includes("build") ? ".." : "";

const config: HardhatUserConfig = {
  defaultNetwork: "linea",
  networks: {
    // localhost: {
    //   url: process.env.ETH_PROVIDER || DEFAULT_ETH_PROVIDER,
    //   // accounts: [process.env.ETH_SK || DEFAULT_ETH_SK],
    //   accounts: {
    //     mnemonic: TEST_MNEMONIC,
    //     path: "m/44'/60'/0'/0",
    //     initialIndex: 0,
    //     count: 10,
    //   },
    //   loggingEnabled: false,
    // },
    polygon: {
      url: "https://polygon-zkevm-testnet.drpc.org",
      chainId: 1442,
      accounts: [process.env.ETH_SK as unknown as string],
    },
    linea: {
      url: "https://linea-goerli.blockpi.network/v1/rpc/public",
      chainId: 59140,
      accounts: [process.env.ETH_SK as unknown as string],
    },
    scroll: {
      url: "https://scroll-testnet-public.unifra.io",
      chainId: 534351,
      accounts: [process.env.ETH_SK as unknown as string],
    },
    ThunderCore: {
      // TODO:
      url: "https://testnet-rpc.thundercore.com",
      chainId: 18,
      accounts: [process.env.ETH_SK as unknown as string],
    },
    op: {
      url: process.env.OPTIMISM_TESTNET_RPC,
      accounts: [process.env.ETH_SK as unknown as string],
    },
  },
  paths: {
    sources: path.resolve(__dirname, parentDir, "../contracts/contracts"),
    artifacts: path.resolve(__dirname, parentDir, "../contracts/artifacts"),
  },
};

export default config;
