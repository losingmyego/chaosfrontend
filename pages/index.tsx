import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/header'
import Inventory from '../components/inventory';
import { useGlobalState } from '../utils/global-state';
import { CardProfile } from '../components/audio-player/script';
import  ChaosMode from '../components/chaos-mode'
import list from '../components/audio-player/list.json';

const Home: NextPage = () => {
  const [song] = useGlobalState('currentSong');

  return (
    <div className='body'>
      <Header />
      <ChaosMode />
      <div className="playcontentwrap wf-section">
        <div className="w-layout-grid playcontentgrid">
          <div id="w-node-_1b91cd3f-b6b9-b2d2-8de1-324d1f476d49-e6d4b62f" className="musicplayerwrap">
            <CardProfile />
          </div>
          <div id="img-wrap" className="img-wrap w-node-_2a926e6f-abe9-a758-2925-b0723e472c39-e6d4b62f"><Image width="600" height="600" quality="90" src={`/audio/album-art/${song + 1}.jpeg`} priority alt="Chaos Album Cover" className="img" /></div>
          <div id="w-node-_90c110c4-98ca-747d-7ebf-d32a3863aa3a-e6d4b62f" className="songinfowrap">
            <div className="container text bandinfo">
              <div id="w-node-_2a926e6f-abe9-a758-2925-b0723e472c53-e6d4b62f" className="containertextwrap">
                <div className="bandinfoheader">
                  <div className="scene-id">{list[song]['scene-id']}</div>
                  <div className="track-id">{list[song]['track-id']}</div>
                </div>
                <div className="song-details-wrap">
                  <div className="key">{list[song]['key']}</div>
                  <p className="caption">key</p>
                </div>
                <div className="song-details-wrap">
                  <div className="bpm">{list[song]['bpm']}</div>
                  <p className="caption">bpm</p>
                </div>
              </div>
            </div>
          </div>
          <div id="w-node-_2a926e6f-abe9-a758-2925-b0723e472c3b-e6d4b62f" className="chaosinfowrap">
            <div className="container text">
              <div className="inlinelogowrap"><img src="images/chaos-logo_light.svg" alt="" className="inlinelogo" /></div>
              <div id="w-node-f1affa89-3b01-7e32-eaca-8b55661ce784-e6d4b62f" className="containertextwrap">
                <p>Chaos is a headless band consisting of 80 artists including musicians, visual artists, engineers, writers, operatives + more.&nbsp;<br /><br />Over six weeks, the Chaos musicians created 45 distinct songs — rotating into new bands of 3 musicians every 2 weeks. The visual team generated 100s of unique visual layers that, when randomly sorted, create 1-of-a-kind cover artworks along a rarity spectrum. These sonic and visual pieces are combined to form a collection of 21,000 music NFTs — each containing one of the 45 songs plus a 1-of-a-kind cover artwork.&nbsp;<br /><br />‍<strong>These music NFTs are organized into Packs of 4</strong>. Upon minting a Pack, you will receive 1 Pack NFT. You then have the option to <em>open</em> your pack, which will burn the Pack NFT and randomly mint 4 music NFTs. <a target="_blank" href="https://songcamp.mirror.xyz/HAVvPjZ9O2rUuDfRXN1CMbFk11ih4-JnJ1UyZCPTXSs" className="inline" rel="noreferrer">Read More </a><br /></p>
              </div>
            </div>
            <div className="button-wrap">
              <Link href="/mint">
                <a className="button-primary play w-inline-block">
                  <div className="button-bg">
                    <div className="button-text">mint a pack</div>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Inventory />
    </div>
  )
}

export default Home
