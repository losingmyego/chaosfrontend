import type { NextPage } from 'next';
import { useWeb3React } from "@web3-react/core";
import { useEffect } from 'react';
import { useGlobalState } from '../utils/global-state';
import { totalSupply } from '../mint/utils';

const TotalSupply: NextPage = () => {
    const context = useWeb3React();
    const {
        chainId
    } = context;

    const [remaining, setRemaining] = useGlobalState("remaining");

    const selectedChain = process.env.NEXT_PUBLIC_CHAIN_ID;

    useEffect(() => {
        // Use library selected chain, or else use selected env var chain
        const chain = chainId ? chainId : parseInt(selectedChain as string);

        const getData = async () => {
            const result = await totalSupply(chain);
            setRemaining(result);
        }

        getData();

    });

    return (
        remaining <= 250 ? <p className="caption bold">SOLD OUT</p> : <p className="caption bold">{remaining === 5000 ? '-' : remaining}/5000</p>
    )
}

export default TotalSupply;
