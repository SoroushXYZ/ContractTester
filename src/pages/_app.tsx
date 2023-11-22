import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "../components/navbar/Navbar";
import ParticleBackground from "../components/background/ParticleBackground";
import "../styles/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/prism-synthwave84.css";
import ActiveChain from "../components/ActiveChain/ActiveChain";
import { useState } from "react";
import Footer from "../components/footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const [activeChain, setActiveChain] = useState("arbitrum");
  
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <ActiveChain setActiveChain={setActiveChain}/>
      <ParticleBackground />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </ThirdwebProvider>
  );
}

export default MyApp;
