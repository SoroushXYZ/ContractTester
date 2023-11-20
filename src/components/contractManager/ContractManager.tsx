import React, { useState } from "react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';

import sampleABI from './sampleABI.json'

export function ContractManager() {
    const [contractAddress, setContractAddress] = useState('');
    

    const [abiInput, setAbiInput] = React.useState(
        // `function add(a, b) {\n  return a + b;\n}`
        JSON.stringify(sampleABI, null, 2)
      );

    const handleContractAddressChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContractAddress(event.target.value);
    };
    
    const handleAddContractButton = () => {
        // Perform actions when the "Add Contract" button is clicked
        // For example, you can add logic to handle contract addition
        console.log('Contract added!');
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
                            <label htmlFor="exampleTextarea" className="form-label">
                                Contract Address
                            </label>
                            <input className="p-3 form-control" aria-describedby="Contract Address" placeholder="0x0000000000000000000000000000000000000000" value={contractAddress} onChange={handleContractAddressChange}/>
                        </div>
                        <div className="p-4 mt-4 row justify-content-center">
                            <div className="col-lg-8 p-4 bg-dark2 rounded-3 d-flex align-items-center justify-content-between">
                                <span>Chain ID</span>
                                <span>0</span>
                            </div>
                        </div>
                        <div className="p-4 row justify-content-center">
                            <button onClick={handleAddContractButton} type="button" className="p-3 m-2 col-10 col-lg-6 btn btn-primary">
                                Add Contract
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
  