import '../../tailwindcss/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

function getLibrary(provider) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false);
  Router.events.on('routeChangeStart', () => {
    setIsLoading(true);
  });
  Router.events.on('routeChangeComplete', () => setIsLoading(false));
  Router.events.on('routeChangeError', () => setIsLoading(false));

  return (
    <>
      <Web3ReactProvider getLibrary={getLibrary}>
        {/* <Loader isOpen={isLoading} shouldCloseOnOverlayClick={false} /> */}
        <Component {...pageProps} />
        <ToastContainer position="top-center"></ToastContainer>
      </Web3ReactProvider>
    </>
  );
}
export default MyApp;
