import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "../components/navbar/Navbar";
import ParticleBackground from "../components/background/ParticleBackground";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/prism-synthwave84.css";

const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <ParticleBackground />
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
