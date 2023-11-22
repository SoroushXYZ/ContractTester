import React, { useState } from 'react';

type FunctionType = 'read' | 'write';

interface ContractFunctionsProps {
  name: string;
  type: FunctionType;
  inputs: { name: string; type: string }[];
  isPayable: boolean;
  onFuncall: (funcName: string, inputValues: {[key: string]: string;}, type: string, paybleValue: string) => void;
}

const ContractFunctions: React.FC<ContractFunctionsProps> = ({ name, type, inputs, isPayable, onFuncall}) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [paybleValue, setPayableValue] = useState("0");

  const handleInputValuesChange = (inputName: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [inputName]: value }));
  };
  
  const handlePayableValuesChange = (value: string) => {
    setPayableValue(value)
  };

  const handleFunctionClickButton = () => {
    // console.log(`Calling ${type} function "${name}" with inputs:`, inputValues);
    onFuncall(name, inputValues, type, paybleValue);
  };

  return (
    <div>
      <div className='row align-items-center mt-3' key={name}>
        <p className='col-4 col-lg-3 my-0'>{name}</p>
        <button className='col-2 btn btn-secondary' onClick={handleFunctionClickButton}>{type === 'read' ? 'Read' : 'Write'}</button>
        <div className='col-6 col-lg'>
          {inputs.map((input) => (
            <div className="col-12 px-lg-4 my-1 form-floating" key={input.name}>
              <input type="text" className="form-control" id="floatingInput" placeholder="" value={inputValues[input.name] || ''} onChange={(e) => handleInputValuesChange(input.name, e.target.value)}/>
              <label className='mx-lg-4' htmlFor="floatingInput">{input.name}({input.type})</label>
            </div>
          ))}
          {isPayable && (
            <div className="col-12 px-lg-4 my-1 form-floating">
              <input type="number" className="form-control" id="floatingInput" placeholder="" value={paybleValue} onChange={(e) => handlePayableValuesChange(e.target.value)}/>
              <label className='mx-lg-4' htmlFor="floatingInput">ETH value(wei)</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractFunctions;
