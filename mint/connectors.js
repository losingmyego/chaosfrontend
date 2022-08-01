import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const POLLING_INTERVAL = 12000;

const RPC_URLS = {
  1: `https://eth-mainnet.alchemyapi.io/v2/DWJQCea9guvFXcIsV8GYdwYXerOLIpGs`,
  4: `https://eth-rinkeby.alchemyapi.io/v2/kYeGR053gpU6p3-Ke-ORbTdVkz1nccrB`
};

export const chainNames = {
  1: "Mainnet",
  4: "Rinkeby"
};

export const injected = new InjectedConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  supportedChainIds: [1, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
    qrcodeModalOptions: {
        mobileLinks: [
          "rainbow",
          "metamask",
          "argent",
          "trust",
          "imtoken",
          "pillar",
        ],
  },
});
