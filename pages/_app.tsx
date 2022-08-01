import '../styles/normalize.css';
import '../styles/webflow.css';
import '../styles/chaos-minting-site.webflow.css';
import '../styles/globals.css';
import '../styles/audio-player.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import {
  Web3ReactProvider
} from "@web3-react/core";

import { Web3Provider } from "@ethersproject/providers";
import WalletModal from '../components/wallet-modal';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

function MyApp({ Component, pageProps }: AppProps) {
  return <div className="main-body" style={{ maxWidth: '100vw' }}>
    <NextSeo
      title="CHAOS"
      description="77 artists. 1 headless band. A music collection like no other."
      openGraph={{
        title: 'Chaos',
        description: '77 artists. 1 headless band. A music collection like no other.',
        images: [
          {
            url: '/images/chaos_opengraph.jpg',
            alt: 'Chaos ALT',
            type: 'image/jpeg',
          },
        ],
        site_name: 'Chaos',
      }}
    />
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-61NK269W88"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-61NK269W88');
        `}
    </Script>
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletModal />
      <Component {...pageProps} />
    </Web3ReactProvider>
  </div>
}

export default MyApp
