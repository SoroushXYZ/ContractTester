import React, { useEffect, useState } from "react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';
import sampleABI from './sampleABI.json'
import { VscDebugDisconnect } from "react-icons/vsc";
import { useChain } from "@thirdweb-dev/react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import ContractCard from "../contractCard/ContractCard";

export function ContractManager() {
    
    const selectedChain = useChain();

    const [contractAddress, setContractAddress] = useState('');
    const [abiInput, setAbiInput] = React.useState(
        JSON.stringify(sampleABI, null, 2)
    );
    const [contractCardComponents, setContractCardComponents] = useState<{ id: number; chainInfo: { id: number; name: string; imgUrl: string; }; abi: JSON, contractAddress: string }[]>([]);

    const handleContractAddressChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContractAddress(event.target.value);
    };
    const handleAddContractButton = () => {
        if(!selectedChain){
            Swal.fire(
                "Error",
                "Wallet not connected or unsupported chain.",
                "error"
              );
            return;
        }else if(!contractAddress){
            Swal.fire(
                "Error",
                "Contract Address not provided!",
                "error"
              );
            return;
        }
        
        let parsedABI: JSON
        try{
            parsedABI = JSON.parse(abiInput)
        }catch (e) {
            Swal.fire(
                "Failed to parse ABI to JSON",
                String(e),
                "error"
              );
            return;
        }

        const chainInfo = {
            id: selectedChain.chainId,
            name: selectedChain.name,
            imgUrl: selectedChain.icon?.url || "",
        };
        const newId = contractCardComponents.length > 0 ? Math.max(...contractCardComponents.map(child => child.id), 0) + 1 : 1; // Generate a new ID greater than existing IDs or start at 1 if no elements exist
        setContractCardComponents(prevState => [...prevState, { id: newId, chainInfo: chainInfo || {}, abi: parsedABI, contractAddress}]);
    };
    const handleDeleteContractButton = (index: number) => {
        const updatedChildren = contractCardComponents.filter(child => child.id !== index);
        setContractCardComponents(updatedChildren);
    };

    return (
        <div className="container px-lg-5">
            <h2 className="p-3 text-white fw-bold">Contract Manager</h2>
            <div className="p-3 p-lg-5 rounded-3 bg-dark">
                <div className="row">
                    <div className="col-lg-6 px-4">
                        <label htmlFor="exampleTextarea" className="form-label">
                            Contract ABI
                        </label>
                        <div className="container_editor_area">
                            <Editor
                                value={abiInput}
                                onValueChange={abiInput => setAbiInput(abiInput)}
                                highlight={(abiInput) => highlight(abiInput, languages.json, 'json')}
                                padding={10}
                                className="container__editor"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 px-4 mt-4 mt-lg-0 d-flex flex-column justify-content-center">
                        <div>
                            <label className="form-label">
                                Contract Address
                            </label>
                            <input className="p-3 form-control" aria-describedby="Contract Address" placeholder="0x0000000000000000000000000000000000000000" value={contractAddress} onChange={handleContractAddressChange}/>
                        </div>
                        <div className="p-4 mt-4 row justify-content-center">
                            <div className="col-lg-8 px-4 py-3 bg-dark2 rounded-3">
                                <div className="p-2 d-flex align-items-center justify-content-between">
                                    <span>Chain</span>
                                    <span>{selectedChain?.chain || <VscDebugDisconnect size={30} />}</span>
                                </div>
                                <div className="p-2 d-flex align-items-center justify-content-between">
                                    <span>Chain ID</span>
                                    <span>{selectedChain?.chainId || <VscDebugDisconnect size={30} />}</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 row justify-content-center">
                            <button onClick={handleAddContractButton} type="button" className="p-3 m-2 col-10 col-lg-6 btn btn-primary">
                                Add Contract
                            </button>
                        </div>
                    </div>
                </div>
                {contractCardComponents.length > 0 && (
                    <div className="mt-5">
                        <hr />
                        <div>
                        {contractCardComponents.map((index) => (
                            <ContractCard 
                                key={index.id}
                                id={index.id}
                                chainInfo={index.chainInfo}
                                abi={index.abi}
                                contractAdress={index.contractAddress}
                                onDelete={handleDeleteContractButton}
                            />
                        ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
  