import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from "next/router";
import Blockies from 'react-blockies';
import { AnimatePresence, motion, useCycle } from "framer-motion";
import Link from 'next/link';
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect } from '../mint/hooks';
import { useGlobalState } from '../utils/global-state';
import { Toaster } from 'react-hot-toast';

const Header: NextPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useCycle(false, true);
  const [chaos, setChaos] = useGlobalState('chaos');
  const [modal, setModal] = useGlobalState('modalOpen');
  const [inventory, setInventory] = useGlobalState('inventoryOpen');

  const context = useWeb3React();
  const {
    account,
    deactivate
  } = context;

  useEagerConnect();

  return (
    <div>
      <Toaster />
      {router.pathname === '/' &&
        <div className="chaosswitchwrap" style={chaos ? {mixBlendMode: 'difference'} : {}}>
          <div className="switchtextwrap">
            <h1 className="switch-text">chaos mode</h1>
          </div>
          <div className="switch-wrap" onClick={() => setChaos(!chaos)}>
            <motion.div data-w-id="bf4af565-c0ea-fc9f-93f9-d6d0a1c467f3" className="switch-button" animate={chaos ? { transform: 'translate3d(48px, 0px, 0px)' } : { transform: 'translate3d(0px, 0px, 0px)' }} />
            <div style={{ opacity: 1 }} className={`switch-base ${chaos ? 'on' : 'off'}`} />
            <div className={`switch-base ${chaos ? 'on' : 'off'}`} />
          </div>
        </div>}
      <div data-animation="default" data-collapse="medium" data-duration={400} data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav" style={chaos ? {mixBlendMode: 'difference'} : {}}>
        <div className="nav-inner">
          <div className="nav-logo-wrap">
            <Link href="/"><a className="brand w-nav-brand"><img src="images/chaos-logo_light.svg" alt="" className="image" /></a></Link>
          </div>
          <div className="nav-menu-wrap">
            <nav role="navigation" className="nav-menu w-nav-menu">
              <Link href="/"><a className={`nav-link w-nav-link ${router.pathname == "/" && 'w--current'}`}>PLAY</a></Link>
              <Link href="/mint"><a aria-current="page" className={`nav-link w-nav-link ${router.pathname == "/mint" && 'w--current'}`}>Mint</a></Link>
              <a href="https://songcamp.mirror.xyz/HAVvPjZ9O2rUuDfRXN1CMbFk11ih4-JnJ1UyZCPTXSs" target="_blank" className={`nav-link w-nav-link`} rel="noreferrer">HOW IT WORKS</a>
              {/* <Link href="/splits"><a className={`nav-link w-nav-link ${router.pathname == "/splits" && 'w--current'}`}>SPLITS</a></Link> */}
              <Link href="/about" ><a className={`nav-link w-nav-link ${router.pathname == "/about" && 'w--current'}`}>ABOUT</a></Link>
            </nav>
            {account === undefined ? <a href="#" className="button-primary w-inline-block">
              <div className="button-bg">
                <div className="button-text" onClick={() => setModal(!modal)}>connect</div>
              </div>
            </a> : <div data-hover="false" data-delay={0} className="w-dropdown" onClick={() => setOpen(!open)}>
              <div className="dropdown-toggle w-dropdown-toggle">
                <div className="avatardropdownwrap">
                  <div className="blockies-wrap">
                    <Blockies
                      seed={account as string}
                      size={10}
                      scale={4}
                      // color="#ffc179"
                      // bgColor="#fff"
                      // spotColor="#ff8c61"
                      className="blockies-create"
                    />
                  </div>
                </div>
              </div>
              <nav className="dropdown-list w-dropdown-list" style={open ? { display: 'block', margin: '10px -95px' } : { display: 'none' }}>
                <span className="usermodalblock user w-dropdown-link">      {account === undefined
                  ? "..."
                  : account === null
                    ? "None"
                    : `${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`}</span>
                <span onClick={() => setInventory(!inventory)} className="usermodalblock w-dropdown-link">Chaos Inventory</span>
                <span onClick={() => deactivate()} className="usermodalblock w-dropdown-link">Disconnect</span>
              </nav>
            </div>}
            <div data-w-id="c5706f32-09e2-75bc-0f5e-7b6019b39b42" className="menu-button-2 w-nav-button" onClick={setMobile as any}>
              <div className="menu-nav"><img src="images/menu-white.svg" alt="" className="icon-menu" /></div>
              <div className="close-nav"><img src="images/Cancel.svg" alt="" className="icon-close" width={24} height={24} /></div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobile &&
            <motion.div 
              initial={{ height: 0 }}
              animate={{
                height: '100vh'
              }}
              exit={{
                height: 0,
                transition: { duration: 0.3 }
              }}
              className="w-nav-overlay" data-wf-ignore id="w-nav-overlay-0" style={{ height: '100vh', display: 'block', position: 'absolute' }}>
              <nav role="navigation" className="nav-menu unauthenticated w-nav-menu" data-nav-menu-open style={{height: '100vh'}}>
                <Link href="/"><a className={`nav-link w-nav-link w--nav-link-open ${router.pathname == "/" && 'w--current'}`}>PLAY</a></Link>
                <Link href="/mint"><a className={`nav-link w-nav-link w--nav-link-open ${router.pathname == "/mint" && 'w--current'}`}>MINT</a></Link>
                <a href="https://songcamp.mirror.xyz/HAVvPjZ9O2rUuDfRXN1CMbFk11ih4-JnJ1UyZCPTXSs" target="_blank" className={`nav-link w-nav-link w--nav-link-open`} rel="noreferrer">HOW IT WORKS</a>
                {/* <Link href="/splits"><a className={`nav-link w-nav-link w--nav-link-open ${router.pathname == "/splits" && 'w--current'}`}>SPLITS</a></Link> */}
                <Link href="/about" ><a className={`nav-link w-nav-link w--nav-link-open ${router.pathname == "/about" && 'w--current'}`}>ABOUT</a></Link>
              </nav>
            </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Header;
