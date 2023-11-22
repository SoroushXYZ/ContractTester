// import { ContractManager } from './../components/contractManager/ContractManager';
import { useRef } from "react";
import { ContractManager } from "../components/contractManager/ContractManager";
import { NextPage } from "next";

const Home: NextPage = () => {
  const contractManagerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div>
        {/* Header */}
        <div style={{ padding: '2rem' }}></div>
        <header className="py-5">
            <div className="container  px-lg-5">
                <div className="p-4 p-lg-5 text-center">
                    <div className="m-4 m-lg-5">
                        <h1 className="display-5 fw-bold">Solidity Contract Tester</h1>
                        <p className="fs-4">
                        This App simplifies testing and validating smart contracts deployed on EVM chains, providing an intuitive interface for easy interaction and thorough functionality assessment.
                        </p>
                        <a onClick={() => {
                            if (contractManagerRef.current) {
                                contractManagerRef.current.scrollIntoView({ behavior: 'smooth' });
                            }
                            }} className="btn btn-primary btn-lg">
                        Click To Begin
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div style={{ padding: '5rem' }}></div>

        {/* Contract Manager */}
        <div ref={contractManagerRef} style={{ padding: '2rem' }}></div>
        <ContractManager />
        <div style={{ padding: '2rem' }}></div>

    </div>
  );
};

export default Home;
