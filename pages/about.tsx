import type { NextPage } from 'next'
import { useState } from 'react';
import Lottie from "lottie-react";
import Image from 'next/image';
import { motion } from 'framer-motion'
import Animation from '../public/documents/chaos-lottie-light-grey.json';
import Header from '../components/header';

const FAQ = [{
  question: "How many Chaos Packs NFTs are there?",
  answer: "There are 5,000 Chaos Packs available for mint."
},
{
  question: "How many songs are in each Chaos Pack?",
  answer: "There are 4 songs inside each Chaos Pack."
},
{
  question: "Are the Chaos Packs themselves NFTs?",
  answer: "Yes."
},
{
  question: "Are the Chaos Songs also NFTs?",
  answer: "Yes."
},
{
  question: "How do I open my pack?",
  answer: "Once you have collected a pack, you can open your pack by navigating to your Chaos Inventory page. There you can select which pack(s) you want to open. Note that opening a pack is an on-chain action, and will cost you a small gas fee."
},
{
  question: "Is opening a pack an on-chain transaction?",
  answer: "Yes. Opening a pack is an on-chain transaction. Each time you open a pack, you will pay a gas fee."
},
{
  question: "Can I open multiple packs at once?",
  answer: "Yes, you can. Your gas fee will increase with the number of packs you open at once."
},
{
  question: "Why does opening a pack burn the pack NFT?",
  answer: "It is like opening a pack of Pokémon cards. When you open a pack of cards, you throw the pack wrapper away. What you're left with are those fresh Pokémon cards. :)"
},
{
  question: "I’ve opened my pack, now what?",
  answer: "Celebrate! And go listen to the 4 amazing songs you just minted."
},{
  question: "Do the Chaos Packs or Music NFTs confer commercial rights to collectors?",
  answer: "No, collectors do not receive commercial rights to the music or visual artwork.  Owners of NFTs are granted a license to download, access, and use the Art associated with their NFT(s) for noncommercial purposes, and to market and sell their NFT(s). You can view the full terms of agreement <a href='https://snapshot.org/#/headlesschaos.eth/proposal/0xf517dd9daf5dd0181b6e21233cb591c985c90b3da71ef31923fbecd48b19fbbb' class='inline' target='_blank' rel='noreferrer'>here</a>."
}, {
  question: "If and when all the packs are opened, how many music NFTs will there be?",
  answer: "Once all 5000 packs of 4 songs each are opened, 20,000 music NFTs will have been minted."
}, {
  question: "What is the total supply of music NFTs?",
  answer: "21,000."
}, {
  question: "You’re missing 1000 NFTs somewhere. What gives?",
  answer: "The remaining 1,000 Music NFTs are called Supercharged NFTs, and they were gifted to the 77 members of Chaos - the co-creators of this headless band. You can learn more about Supercharged NFTs <a href='https://songcamp.mirror.xyz/UkR2nfVcYYKuePHzck6UnWTY35zW4uFxRnXllkk99Hw' class='inline' target='_blank' rel='noreferrer'>here.</a>"
}, {
  question: "How many Supercharged NFTs are there?",
  answer: "There are a total 21,000 music NFTs. Of the total supply, 20,000 of them are arranged into Packs of 4 songs each. Thus, when all 5,000 Packs are opened, these 20,000 NFTs will have been minted. The remaining 1000 music NFTs are Supercharged NFTs and are reserved for the participants of Camp Chaos."
}
]

const variants = {
  open: { opacity: 1, x: 0, duration: 0.5 },
  closed: { opacity: 0, x: 0, duration: 0.5 },
}

const Home: NextPage = () => {
  const [show, setShow] = useState<number | null>(null);
  return (
    <div className='body about'>
      <Header />
      <div>
        <div className="about-content-wrapper">
          <div id="section-1" className="section-1 wf-section">
            <div className="sectionsplit text">
              <div className="headerabout"><img src="images/Let-the-CHAOS-begin.svg" alt="" className="aboutheader" /><img src="images/t-the-CHAOS-begin-mobile.svg"  alt="" className="aboutheadermobile" /></div>
              <div className="lottiemobilewrap">
                <div className="lottie-mobile" data-w-id="c248f802-bd57-691d-2072-7f79ee82d846" data-animation-type="lottie" data-src="documents/chaos-lottie-light-grey.json" data-loop={1} data-direction={1} data-autoplay={1} data-is-ix2-target={0} data-renderer="svg" data-default-duration="4.295963001124551" data-duration={0} />
              </div>
              <div className="abouttextwrap">
                <div className="abouttextheader">
                  <h1 className="xl">A headless band called CHAOS</h1>
                </div>
                <div className="abouttextparagraph">
                  <p>80 human beings from all over the world have converged on the Songcamp server and committed to 8 weeks of collective creation. Of these 80 individuals: 45 are musicians, 9 visual artists, 6 engineers, 5 radio producers, 3 economists, 2 lore masters and 7 operatives gluing it all together.<br /><br />The result: a headless band called Chaos, accompanied by a music nft project like you’ve never seen before.</p>
                </div>
                <div className="aboutarrow"><img src="images/inventory-arrow-down.svg"  alt="" /></div>
              </div>
            </div>
            <div className="sectionsplit lottie">
              <div className="lottie-wrap">
                <div className="chaos-lottie" data-w-id="65059f9a-be4d-a4f5-5273-d13832ae2f55"> <Lottie loop={true} autoPlay={true} renderer="svg" animationData={Animation} /></div>
                {/* data-w-id="65059f9a-be4d-a4f5-5273-d13832ae2f55" data-animation-type="lottie" data-src="documents/chaos-lottie-light-grey.json" data-loop={1} data-direction={1} data-autoplay={1} data-is-ix2-target={0} data-renderer="svg" data-default-duration="4.295963001124551" data-duration={0} /> */}
              </div>
            </div>
          </div>
          <div id="section-2" className="section-2 wf-section">
            <div className="sectionsplit text">
              <div className="abouttextwrap">
                <div className="abouttextheader">
                  <h1 className="xl">The CHAOS collection</h1>
                </div>
                <div className="abouttextparagraph">
                  <p>The Chaos debut release includes 45 songs chaotically co-created over this 8-week period. These songs have been pressed into 100s of edition each, with some songs being rarer to mint than others.<br /><br />The cover artwork is composed of multiple generative visual layers, each with varying rarity traits. This means that the cover artwork is unique for every single edition.<br /><br />The full collection consists of 21,000 NFTs — each with one of these songs plus a 1-of-a-kind cover artwork. <br /><br />These music NFTs are collected by first minting a Chaos Pack.</p>
                </div>
              </div>
            </div>
            <div className="sectionsplit">
              <div className="collectionimagewrap"><Image src="/images/chaos-collection-image.png" width="360" height="520"  alt="" /></div>
            </div>
          </div>
          <div id="section-3" className="section-3 wf-section">
            <div className="sectionsplit text">
              <div className="abouttextwrap">
                <div className="abouttextheader">
                  <h1 className="xl">CHAOS packs</h1>
                </div>
                <div className="abouttextparagraph">
                  <p>There are 5000 Packs available for mint. Each Pack is an NFT that contains 4 music NFTs — much like a pack of Pokémon cards that contains several Pokémon cards.<br /><br />After minting a Pack, the collector has the choice to either keep their pack closed (and thus in ~ mint condition ~) or open their pack. Opening the pack will reveal the 4 music NFTs inside. Behind the scenes, hitting the Open Pack button actually burns the Pack token then automatically mints 4 new song tokens. The 4 songs you’ll receive are determined by a randomizing function that runs at the time of opening your pack.<br /><br />If and when all 5000 Packs are opened, the resulting music NFT collection will have 20,000 unique editions.<br /><br />The remaining 1,000 music NFTs are reserved for the artists involved in Camp Chaos — aka the creation period of this project. These NFTs have a special quality to them, and we are calling them <span className="gradientinline">Supercharged NFTs.</span></p>
                </div>
              </div>
            </div>
            <div className="sectionsplit">
              <div className="packsimagewrap"><Image src="/images/chaos-packs-02.png"  width="848" height="882" sizes="100vw" alt="" className="packs" /></div>
            </div>
          </div>
          <div id="section-4" className="section-4 wf-section">
            <div className="sectionsplit text">
              <div className="abouttextwrap">
                <div className="abouttextheader">
                  <h1 className="xl gradient">Supercharged NFTs</h1>
                </div>
                <div className="abouttextparagraph">
                  <p>These 1000 NFTs are a part of the Chaos music NFT collection. But beyond containing Chaos music and cover art, they have the added trait of being supercharged with liquid split technology - something being built right here in Camp Chaos. <br /><br />Chaos is collaborating with <a href="https://www.0xsplits.xyz/" className="inline" target="_blank" rel="noreferrer">0xSplits</a> to create a liquid split that all secondary royalties from the Chaos collection will flow into. By liquid split, we mean a split contract that is editable (or “mutable”) based on what wallet addresses own these 1000 NFTs. As the Supercharged NFTs move to different wallets, so too do the percentage points of the 100% split. Before paying out secondary royalties, the liquid split checks where these NFTs reside and mutates the split accordingly. This effectively makes the split percentages tradeable, or liquid. <br /><br />Because there are 1000 Supercharged NFTs within the collection, each one represents a claim on 0.1% of the liquid split. All 1000 Supercharged NFTs have been airdropped to Chaos campers, aka the 77 participants who’ve co-created this headless band. <br /><br /></p>
                  {/* You can see what addresses own the Supercharged NFTs, as well as actually updating the addresses & distributing the split’s funds by navigating to the <Link href="/splits"><a className="inline">Splits</a></Link> page.</p> */}
                </div>
              </div>
            </div>
            <div className="sectionsplit">
              <div className="packsimagewrap"><Image src="/images/327.jpg" width="1000" height="1000" sizes="100vw" alt="" className="packs" /></div>
            </div>
          </div>
          <div id="section-4" className="section-5 wf-section">
            <div className="sectionsplit text">
              <div className="abouttextwrap">
                <div className="abouttextheader">
                  <h1 className="xl">FAQs</h1>
                </div>
              </div>
            </div>
            <div className="sectionsplit faq">
              <div className="faqwrap">
                <div className="w-richtext">
                  {FAQ.map((item, index): any => (<span style={{ cursor: 'pointer' }} key={index} onClick={() => index === show ? setShow(null) : setShow(index)}><p><strong>{item.question} <svg style={index === show ? { position: 'absolute', right: '30px', transform: 'rotate(180deg)' } : { position: 'absolute', right: '30px' }} fill="#FFFDF8" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"></path><path d="M0-.75h24v24H0z" fill="none"></path></svg><br /></strong><motion.span animate={show === index ? "open" : "closed"}
                    variants={variants} style={show !== index ? { display: 'none' } : { display: 'block' }}><span dangerouslySetInnerHTML={{__html: item.answer as string}}/></motion.span></p><br /></span>))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-about-fixed">
          <div className="footerlink">
            <a href="https://opensea.io/collection/chaos-packs" target="_blank" className="textlink" rel="noreferrer">chaos packs</a>
          </div>
          <div className="footerlink">
            <a href="https://opensea.io/collection/chaos-songs" target="_blank" className="textlink" rel="noreferrer">chaos songs</a>
          </div>
          <div className="footerlink">
            <a href="https://pod.link/1614481393" target="_blank" className="textlink" rel="noreferrer">chaos radio</a>
          </div>
          <div className="footerlink">
            <a href="https://twitter.com/headless_chaos" target="_blank" className="textlink" rel="noreferrer">twitter</a>
          </div>
          <div className="footerlink">
            <a href="https://discord.gg/YFZ22tA5AG" target="_blank" className="textlink" rel="noreferrer">discord</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
