import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import {
  useWeb3React,
} from "@web3-react/core";
import { useGlobalState } from '../utils/global-state';
import {
  injected,
  walletconnect,
} from "../mint/connectors";

const WalletModal: NextPage = () => {
  const [merror, setError] = useState(false);
  const [modal, setModal] = useGlobalState('modalOpen');
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useEffect(() => {
    if (account) {
      setModal(false);
    }
  }, [account])

  if (!modal) return null;
  return (
    <div className="modalblur">
    <div className="modalbackground">
      <div className="modal-signin">
        <div className="modaltop">
          <div className="exitwrapper" onClick={() => setModal(!modal)}>
            <h1 className="xl">Sign In</h1>
            <div data-w-id="55f88714-c404-be1f-8e8a-21d585743007" className="icon-exit"><img src="images/Cancel.svg"  alt="" className="icon-exit" /></div>
          </div>
          <p>Connect your Ethereum wallet to experience CHAOS</p>
        </div>
          {error && <div className="wrongnetworkwrap">
            <div className="warningheader">
              <div className="icon-warning"><img src="images/icon-warning.svg" alt="" /></div>
              <div className="warning-text div-block-2">
                <h1>{error.message}</h1>
              </div>
            </div>
            {/* <p>Please connect your wallet to the Ethereum network</p>
            <div className="button-wrap">
              <a href="#" className="button-primary w-inline-block">
                <div className="button-bg">
                  <div className="button-text">change network</div>
                </div>
              </a>
            </div> */}
          </div>}
          <div className="modalbuttons">
          <span onClick={() => {
            setActivatingConnector(injected as any);
            activate(injected);
          }} className="iconbutton w-inline-block">
            <div className="buttoniconwrap"><img src="images/icon-metamask.svg"  alt="" /></div>
            <div className="buttontextwrap" >
              <div className="iconbuttontext">MetaMask</div>
            </div>
          </span>
          <span onClick={() => {
            setActivatingConnector(walletconnect as any);
            activate(walletconnect);
          }} className="iconbutton w-inline-block">
            <div className="buttoniconwrap"><img src="images/icon-walletconnect.svg"  alt="" /></div>
            <div className="buttontextwrap">
              <div className="iconbuttontext">WalletConnect</div>
            </div>
          </span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default WalletModal;
