import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  // https://chainlist.org/
  // please refer to this link to know your chain id

  //   1: Ethereum Mainnet - ETH
  //   3: Ethereum Testnet - ROP
  //   4: Ethereum Testnet - RIN
  //   80001: Polygon Testnet - MATIC
  supportedChainIds: [1, 3, 4, 80001],
});
