import React from 'react'

interface ContractCardProps {
    id: number,
    chain: string
    onDelete: (id: number) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ id, chain, onDelete }) => {

    return (
    <div>
        {/* {chain}
        <h1>{id}</h1>
        <button onClick={() => onDelete(id)}>asdf</button> */}

    </div>
  )
}

export default ContractCard