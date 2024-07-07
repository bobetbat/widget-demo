import '../styles/globals.css';
import type { AppProps } from 'next/app';
import EstimateGasWidget from 'estimate-gas-widget';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EstimateGasWidget />
  );
}

export default MyApp;
