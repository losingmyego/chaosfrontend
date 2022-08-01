import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core";
import axios from 'axios';
import useSWR from 'swr';
import { useLottie, useLottieInteractivity } from "lottie-react";
import { AnimatePresence, motion } from "framer-motion";
import { contractSelect, generateIpfs } from '../mint/utils';
import { useGlobalState } from '../utils/global-state';
import { batchOpenPack } from '../mint/utils';
import AnimationLottie from '../public/documents/chaos-unwrap-03.json';

const fetcher = (url: string) => axios.get(url).then(res => res.data.results);

const OpenPackAnimation = () => {
  const [frame, setFrame] = useGlobalState('currentFrame');
  const options = {
    animationData: AnimationLottie,
  };
  const lottieObj = useLottie(options);
  lottieObj.animationItem?.addEventListener("enterFrame", () => {
    setFrame(lottieObj.animationItem?.currentFrame as number);
  });

  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "scroll",
    actions: [
      {
        visibility: [0.3, 0.60],
        type: "seek",
        frames: [-50, 105]
      }
    ],
  });

  return Animation;
};

const WalletModal: NextPage = () => {
  const [selectValue, setSelectValue] = useState([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [inventory, setInventory] = useGlobalState('inventoryOpen');
  const [modal, setModal] = useGlobalState('modalOpen');
  const [frame] = useGlobalState('currentFrame');
  const context = useWeb3React();
  const {
    account,
    library,
    chainId
  } = context;

  const chain = chainId ? chainId : parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string);

  const OPENSEA_URL = contractSelect(chain).openseaUrl;
  const ETHERSCAN_URL = contractSelect(chain).etherscanUrl;
  const OPEN_CONTRACT = contractSelect(chain).songsAddress;

  const animation = {
    initial: {
      height: 0
    },
    animate: {
      height: "100%",
      minHeight: '88vh'
    },
    exit: {
      height: 0
    }
  };

  const { data: packs } = useSWR(`/api/packs/${account}?chainId=${chainId}`, fetcher);
  const { data: songs } = useSWR(`/api/songs/${account}?chainId=${chainId}`, fetcher);

  useEffect(() => {
    if (chainId !== undefined) {
      setCurrentItems([]);
    }
  }, [chainId])

  useEffect(() => {
    if (songs?.ownedNfts) {
      songs?.ownedNfts.map((song: any) => {
        setCurrentItems((currentItems: any) => [...currentItems, 'Act' + song?.metadata?.attributes?.[0]?.value + song?.metadata?.attributes?.[1]?.trait_type + song?.metadata?.attributes?.[1]?.value.replace(/\s/g, '')])
      });
    }
  }, [songs, setCurrentItems]);

  useEffect(() => {
    if (selectAll) {
      const packed = packs?.ownedNfts.map((pack: any) => {
        return pack?.id?.tokenId;
      });
      // console.log('what is packed::', packed);
      setSelectValue(packed as any);
    } else {
      setSelectValue([])
    }
  }, [selectAll, packs])

  const nameSelect = (str: string) => {
    if (!str) {
      return 'PACK';
    }
    const count = str.substring(0, str.indexOf('of') - 1);
    return `PACK #${count}`;
  }

  // console.log('packs::', packs);
  // console.log('songs::', songs);
  // console.log(currentItems);

  function isNegative(n: any) {
    return ((n = +n) || 1 / n) < 0;
  }

  const frames = ((frame - 44) / 10) * 1;
  const steadyFrames = isNegative(frames) ? 0 : frames;

  return (
    <AnimatePresence>
      <div className={`inventorycontainer ${inventory ? 'inventoryOpen' : 'inventoryClose'}`}>
        <div data-w-id="e7b24023-6088-7edd-8baf-f2a87658497d" className="inventorytopcontent" onClick={() => setInventory(!inventory)}>
          <div className="inventorytextwrap">
            <p className="caption">CHAOS&nbsp;INVENTORY</p>
            {(packs?.totalCount !== 0 && packs !== undefined) && <div className="inventorytopgradient" suppressHydrationWarning={true}>{packs?.totalCount} PACK{packs?.totalCount > 1 && "S"}</div>}
          </div>
          <div className="inventoryarrow"><img src={`images/inventory-arrow-${inventory ? 'down' : 'up'}.svg`} style={{ opacity: 1 }} alt="" className="inventory-up" /><img src="images/inventory-arrow-down.svg" style={{ opacity: 0 }} alt="" className="inventory-down" /></div>
        </div>
        {(packs?.totalCount !== 0 && packs !== undefined) && <div className="inventorytopbackground"></div>}
        {account !== undefined ?
          <motion.div initial={animation.initial} animate={animation.animate} exit={animation.exit} style={inventory ? { display: 'block' } : { display: 'none' }} className="chaosinventorycontent">
            {(packs?.totalCount !== 0 && packs !== undefined) &&
              <div>
                <div>
                  <div className="unpackwrap">
                    <motion.div initial={{ opacity: 0 }} animate={frame > 45 ? { scale: steadyFrames, opacity: steadyFrames } : {}} data-w-id="0335bc54-55e6-fa13-8a04-f135522094f4" className="unwrapmodalwrap">
                      <div className="unwrapmodal">
                        <div className="selectallwrap" style={{ cursor: 'pointer' }} onClick={() => setSelectAll(!selectAll)}>
                          <div data-w-id="c82eaccf-0343-4bb2-8a9b-3aeff46cd0f7" className="selectbox"><img src="images/icon-selected.svg" style={selectAll ? { opacity: 1 } : { opacity: 0 }} alt="" className="selectall" /></div>
                          <p className="caption">Select All</p>
                        </div>
                        <div className="selectpackwrap">
                          {packs?.ownedNfts.map((pack: any) => {
                            return (<div key={pack?.id?.tokenId} data-w-id="90251541-df61-04fd-fefb-c725db7e38fd" onClick={() => selectValue.includes(pack?.id?.tokenId as never) ? setSelectValue(selectValue.filter(item => item !== pack?.id?.tokenId)) : setSelectValue([...selectValue, pack.id.tokenId] as any)} style={{ backgroundColor: 'rgba(0,0,0,0)' }} className={`selectpackblock ${pack.id.tokenId === selectValue && 'selected-block'}`}>
                              <div>{nameSelect(pack?.metadata?.attributes?.[0]?.value)}</div>
                              <div style={selectValue.includes(pack?.id?.tokenId as never) ? { opacity: 1 } : { opacity: 0 }} className="selected-check"><img src="images/icon-selected.svg" alt="" /></div>
                            </div>)
                          })}
                        </div>
                        <button onClick={() => selectValue.length > 0 && batchOpenPack(library, selectValue, chainId)} className={`${selectValue.length === 0 ? 'button-primary disabled' : 'button-primary'} unwrap w-inline-block`} style={{ width: '100%' }}>
                          <div className={`button-bg ${selectValue.length === 0 && 'disabled'}`}>
                            <div className="button-text">{selectValue.length === 0 ? "Select packs" : `Open ${selectValue.length} Pack${selectValue.length > 1 ? 's' : ''}`}</div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                    <div className="unpackanimationwrap">
                      <OpenPackAnimation />
                    </div>
                  </div>
                </div>
              </div>}
            <div className="container chaoslibrary">
              <div className="librarytrackwrap">
                <p className="caption">your chaos library</p>
                <div className="track-amount">
                  <p className="user-address">{songs?.totalCount}</p>
                </div>
                <p className="caption bold">songs</p>
              </div>
              <div className="linkgroupwrap inventory" style={{ cursor: 'pointer' }}>
                <a href={`${OPENSEA_URL}/${account}`} target="_blank" className="textlink" rel="noreferrer">opensea</a>
                <a href={`${ETHERSCAN_URL}/token/${OPEN_CONTRACT}?a=${account})`} target="_blank" className="textlink" rel="noreferrer">etherscan</a>
              </div>
            </div>
            <div className="inventorygridwrap">
              <div className="w-layout-grid grid">
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a876584994-1dd4b639" className="inventorygridtextwrap" />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a876584995-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-I.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a876584997-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-II.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a876584999-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-III.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a87658499b-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-IV.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a87658499d-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-V.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a87658499f-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-VI.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849a1-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-VII.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849a3-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-VIII.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849a5-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-IX.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849a7-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-X.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849a9-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-XI.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849ab-1dd4b639" className="inventorygridtextwrap top"><img src="images/SCENE-XII.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849ad-1dd4b639" className="inventorygridtextwrap top"><img src="images/ALCHEMY-I.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849af-1dd4b639" className="inventorygridtextwrap top"><img src="images/ALCHEMY-II.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b1-1dd4b639" className="inventorygridtextwrap top"><img src="images/ALCHEMY-III.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b3-1dd4b639" className="inventorygridtextwrap"><img src="images/ACT-I.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b5-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b6-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b7-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b8-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneIV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849b9-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849ba-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneVI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849bb-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneVII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849bc-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneVIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849bd-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneIX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849be-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849bf-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneXI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c0-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneXII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c1-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneAlchemyI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c2-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneAlchemyII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c3-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActISceneAlchemyIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c4-1dd4b639" className="inventorygridtextwrap"><img src="images/ACT-II.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c6-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c7-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c8-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849c9-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneIV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849ca-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849cb-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneVI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849cc-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneVII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849cd-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneVIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849ce-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneIX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849cf-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d0-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneXI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d1-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneXII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d2-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneAlchemyI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d3-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneAlchemyII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d4-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIISceneAlchemyIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d5-1dd4b639" className="inventorygridtextwrap"><img src="images/ACT-III.svg" alt="" className="inventorytext" /></div>
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d7-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d8-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849d9-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849da-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneIV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849db-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneV") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849dc-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneVI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849dd-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneVII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849de-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneVIII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849df-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneIX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e0-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneX") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e1-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneXI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e2-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneXII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e3-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneAlchemyI") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e4-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneAlchemyII") && 'active'}`} />
                <div id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e5-1dd4b639" className={`inventorygridblock ${currentItems.includes("ActIIISceneAlchemyIII") && 'active'}`} />
              </div>
            </div>
            {songs?.totalCount !== 0 &&
              <div className="inventoryartwrap">
                <div className="w-layout-grid inventoryartgrid">
                  {songs?.ownedNfts.map((song: any, index: number) => { return (<div key={index} id="w-node-e7b24023-6088-7edd-8baf-f2a8765849e8-1dd4b639" className="inventoryartblock"><img alt="Chaos album art" src={generateIpfs(song?.metadata?.image)} /></div>) })}
                </div>
              </div>}
          </motion.div> :
          <motion.div initial={animation.initial} animate={animation.animate} exit={animation.exit} style={inventory ? { display: 'block' } : { display: 'none' }} className="chaosinventorycontent emptystate">
            <div className="inventoryemptywrap" style={{ height: '100vh' }}>
              <p className="center">CONNECT YOUR WALLET TO ENTER INTO THE CHAOS</p>
              <div className="button-wrap">
                <a data-w-id="1e44586a-883b-66cd-e613-7c649c9df93c" href="#" className="button-primary w-inline-block">
                  <div className="button-bg" onClick={() => setModal(!modal)}>
                    <div className="button-text">connect</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        }
      </div>
    </AnimatePresence>
  )
}

export default WalletModal;
