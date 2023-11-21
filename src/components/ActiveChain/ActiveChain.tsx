import React, { useEffect } from 'react';
import { useChain } from "@thirdweb-dev/react";

interface ActiveChainProps {
  setActiveChain: (chain: string) => void;
}

function ActiveChain({ setActiveChain }: ActiveChainProps) {
  const selectedChain = useChain();

  useEffect(() => {
    // Call setActiveChain when selectedChain changes
    if (selectedChain) {
      setActiveChain(String(selectedChain.slug));
    }
  }, [selectedChain, setActiveChain]);

  return (
    <div>
      
    </div>
  );
}
export default ActiveChain;