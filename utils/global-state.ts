import { createGlobalState } from 'react-hooks-global-state';

export const { useGlobalState } = createGlobalState({ count: 1, walletAddress: '', modalOpen: false, inventoryOpen: false, connectMetamask: false, connectWalletconnect: false, chaos: false, currentSong: 0, currentFrame: 0, remaining: 5000 });