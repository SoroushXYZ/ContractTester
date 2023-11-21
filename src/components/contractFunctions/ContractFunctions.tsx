import React, { useState } from 'react';

type FunctionType = 'read' | 'write';

interface ContractFunctionsProps {
  name: string;
  type: FunctionType;
  inputs: { name: string; type: string }[];
}

const ContractFunctions: React.FC<ContractFunctionsProps> = ({ name, type, inputs }) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (inputName: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleButtonClick = () => {
    console.log(`Calling ${type} function "${name}" with inputs:`, inputValues);
  };

  return (
    <div key={name}>
      <h3>{name}</h3>
      {inputs.map((input) => (
        <div key={input.name}>
          <label>{input.name}</label>
          <input type="text" value={inputValues[input.name] || ''} onChange={(e) => handleInputChange(input.name, e.target.value)} />
        </div>
      ))}
      <button onClick={handleButtonClick}>{type === 'read' ? 'Read' : 'Write'}</button>
    </div>
  );
};

export default ContractFunctions;
