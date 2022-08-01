import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/header';
import Inventory from '../components/inventory';
import { motion } from 'framer-motion';
import { useWeb3React } from "@web3-react/core";
import TotalSupply from '../components/total-supply';
import { useGlobalState } from '../utils/global-state';
import { mintPack } from '../mint/utils';

import ChaosPack from '../public/images/chaos-pack.png';

const Home: NextPage = () => {
  const [count, setCount] = useGlobalState('count');
  const [modal, setModal] = useGlobalState('modalOpen');
  const [remaining] = useGlobalState('remaining');

  const context = useWeb3React();
  const { account, library, chainId } = context;

  return (
    <div className='body'>
      <Header />
      <div>
        <div className="pagecontentwrap mint wf-section">
          <div className="mintimagewrap"><Image src={ChaosPack} width="640" height="640" priority placeholder="blur" alt="Chaos Pack Image" className="mintimage" /></div>
          <div className="mintmodalswrap">
            <div className="container">
              <p className="caption">packs available</p>
              <TotalSupply />
            </div>
            <div className="container mintmodal">
              <div className="mintmodalcost">
                <p className="gradientinline">{count} PACK{count > 1 && 'S'} = {Math.round((count * .2) * 100) / 100} ETH</p>
              </div>
              <div className="mintmodaltop">
                <div className="counterwrap">
                  <div onClick={() => count !== 1 ? setCount(count - 1) : null} className="countericon"><img src="images/counter-minus.svg" alt="" /></div>
                  <div className="countervalue">
                    <motion.div className="counter">{count}</motion.div>
                  </div>
                  <div onClick={() => count !== 100 ? setCount(count + 1) : null} className="countericon"><img src="images/counter-plus.svg" alt="" /></div>
                </div>
              </div>
              <div id="w-node-_60f98a91-65fc-68ea-c02f-5e4fc477f240-1b850a40" className="mintmodalbottom">
                { remaining <= 250 ? <a href="#" className="button-primary disabled w-inline-block" style={{cursor: 'not-allowed'}}>
                  <div className="button-primary-text">SOLD OUT</div>
                </a> :
                  <a href="#" className="button-primary w-inline-block">
                    {account === undefined ? <div className="button-bg" onClick={() => setModal(!modal)}>
                      <div className="button-text">connect wallet</div>
                    </div> : <div className="button-bg" style={{ minWidth: '160px' }} onClick={() => mintPack(library, count, chainId)}>
                      <div className="button-text">mint</div>
                    </div>}
                  </a>}
              </div>
            </div>
            <div className="container text">
              <div id="w-node-d2c3499e-fae7-e8b1-01fd-6450a234a53f-1dd4b639" className="containertextwrap">
                <p>Chaos Packs each contain 4 music NFTs created by Chaos, the headless band. After minting your Chaos Pack, you can choose to keep your pack closed or open your pack. You can open your Chaos Pack by navigating to the Inventory tab. &nbsp;Opening a Chaos Pack requires an additional on-chain transaction. <span className="gradientinline">This means that opening a pack will cost a gas fee.</span>&nbsp; Please read through the <Link href="/about"><a className="inline">FAQs</a></Link> on the about page before minting a Chaos Pack.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Inventory />
    </div>
  )
}

export default Home
