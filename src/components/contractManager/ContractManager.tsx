import React from "react";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-json';

import sampleABI from './sampleABI.json'

export function ContractManager() {
    const [abiInput, setAbiInput] = React.useState(
        // `function add(a, b) {\n  return a + b;\n}`
        JSON.stringify(sampleABI, null, 2)
      );

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
                    <div className="col-lg-6 px-4 mt-4 mt-lg-0">
                        <label htmlFor="exampleTextarea" className="form-label">
                            Contract ABI
                        </label>
                        <textarea className="form-control json-input" rows={15} defaultValue={""} />
                    </div>
                </div>
            </div>
        </div>
    );
}
  