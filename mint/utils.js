import { Contract } from "@ethersproject/contracts";
import { parseEther, } from "@ethersproject/units";
import toast from 'react-hot-toast';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import mintContract from "../mint/chaos-packs.json";
import openContract from "../mint/chaos-songs.json";

export const contracts = {
    1: {
        packAddress: process.env.NEXT_PUBLIC_PACK_CONTRACT_MAINNET,
        songsAddress: process.env.NEXT_PUBLIC_SONGS_CONTRACT_MAINNET,
        etherscanUrl: process.env.NEXT_PUBLIC_ETHERSCAN_URL_MAINNET,
        openseaUrl: process.env.NEXT_PUBLIC_OPENSEA_URL_MAINNET,
        alchemyUrl: 'https://eth-mainnet.alchemyapi.io/v2/DWJQCea9guvFXcIsV8GYdwYXerOLIpGs',
    },
    4: {
        packAddress: process.env.NEXT_PUBLIC_PACK_CONTRACT_RINKEBY,
        songsAddress: process.env.NEXT_PUBLIC_SONGS_CONTRACT_RINKEBY,
        etherscanUrl: process.env.NEXT_PUBLIC_ETHERSCAN_URL_RINKEBY,
        openseaUrl: process.env.NEXT_PUBLIC_OPENSEA_URL_RINKEBY,
        alchemyUrl: 'https://eth-rinkeby.alchemyapi.io/v2/kYeGR053gpU6p3-Ke-ORbTdVkz1nccrB'
    }
};

export const contractSelect = (chainId) => {
    if (chainId === undefined) {
        return contracts[1];
    }
    return contracts[chainId];
}

export const generateIpfs = (link) => {
    if (!link) {
        return '';
    }
    const ipfsLink = link.replace('ipfs://', '');
    const gateway = `https://nftstorage.link/ipfs/${ipfsLink}`;
    return gateway;
}

const notify = (alert, url, icon) => toast.loading((t) => (
    <span onClick={() => toast.dismiss(t.id)}>
        {alert} {url ? <a className="inline" href={url} rel="noreferrer" target="_blank">View Transaction.</a> : ''}
    </span>
), {
    // duration: 'loading',
    position: 'top-center',
    icon: icon ? icon : '🏗️',
    iconTheme: {
        primary: '#0a0',
        secondary: '#fff',
    },
    style: {
        border: '1px solid #FFFDF8',
        padding: '8px 12px',
        color: '#FFFDF8',
        backgroundColor: '#1E1E1E',
        maxWidth: '400px'
    },
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
});

export const mintPack = async (library, count, chainId) => {
    const contractInteract = new Contract(contracts[chainId].packAddress, mintContract, library.getSigner());
    const tx = await contractInteract.purchase(count, { value: parseEther((count * 0.2).toString()) });
    const url = `${contracts[chainId].etherscanUrl}/tx/${tx.hash}`;
    if (tx?.hash) {
        notify(`Minting ${count} pack${count > 1 ? 's' : ''} in progress.`, url);
        console.log('TX HASH::', tx.hash);
    } else {
        console.log('mintPack TX::', tx);
    }
}

export const totalSupply = async (chainId) => {
    const web3 = createAlchemyWeb3(
        contracts[chainId].alchemyUrl,
    );
    const contractInteractSong = new web3.eth.Contract(openContract, contracts[chainId].songsAddress);
    const songSupply = await contractInteractSong.methods.totalSupply().call();

    const contractInteractPack = new web3.eth.Contract(openContract, contracts[chainId].packAddress);
    const packSupply = await contractInteractPack.methods.totalSupply().call();

    return (5000 - packSupply - ((songSupply - 1000) / 4));
}


export const batchOpenPack = async (library, packs, chainId) => {
    const contractInteract = new Contract(contracts[chainId].songsAddress, openContract, library.getSigner());
    const bigNumber = await contractInteract.estimateGas.batchOpenPack(packs);
    const gas = parseInt(bigNumber._hex, 16);
    gas += 40000;
    const tx = await contractInteract.batchOpenPack(packs, { gasLimit: gas });
    const url = `${contracts[chainId].etherscanUrl}/tx/${tx.hash}`;
    if (tx?.hash) {
        notify(`Opening ${packs.length} pack${packs.length > 1 ? 's' : ''} in progress.`, url);
        console.log('TX HASH::', tx.hash);
    } else {
        console.log('openPack TX::', tx);
    }
}