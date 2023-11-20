// import { ContractManager } from './../components/contractManager/ContractManager';
import { ContractManager } from "../components/contractManager/ContractManager";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
        {/* Header */}
        <div style={{ padding: '3vw' }}></div>
        <header className="py-5">
            <div className="container  px-lg-5">
                <div className="p-4 p-lg-5 text-center">
                    <div className="m-4 m-lg-5">
                        <h1 className="display-5 fw-bold">Solidity Contract Tester</h1>
                        <p className="fs-4">
                        This App simplifies testing and validating smart contracts deployed on EVM chains, providing an intuitive interface for easy interaction and thorough functionality assessment.
                        </p>
                        <a className="btn btn-primary btn-lg" href="#!">
                        Click To Begin
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <div style={{ padding: '3vw' }}></div>

        {/* Contract Manager */}
        <div style={{ padding: '2vw' }}></div>
        <ContractManager />

    </div>
  );
};

export default Home;
