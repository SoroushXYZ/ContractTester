import React, { useEffect, useState } from 'react'
import { useContract, useAddress , useSwitchChain, useChain, MediaRenderer} from "@thirdweb-dev/react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import ContractFunctions from '../contractFunctions/ContractFunctions';


interface ContractCardProps {
    id: number,
    chainInfo: { id: number; name: string; imgUrl: string; },
    abi: any,
    contractAdress: string,
    onDelete: (id: number) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ id, chainInfo, abi, contractAdress, onDelete }) => {

    const [showAdditionalElements, setShowAdditionalElements] = useState(true);

    const toggleAdditionalElements = () => {
        setShowAdditionalElements(prevState => !prevState);
    };

    const {
        contract: contractInstance,
        isLoading: isContractInstanceLoading,
        isError: contractInstanceError,
    } = useContract(contractAdress, abi);

    useEffect(() => {
        if(contractInstanceError){
            Swal.fire(
                "Error",
                "Failed instantiating the contract.",
                "error"
              );
            return;
        }
    }, [contractInstanceError]);

    function shortenAddress(address: string): string {
        const prefix = address.slice(0, 3);
        const suffix = address.slice(-5);
        return `${prefix}...${suffix}`;
      }
    
    const readFunctions = abi.filter((item: { constant: any; }) => item.constant);
    const writeFunctions = abi.filter((item: { constant: any; }) => !item.constant);
    

    return (
    <div>
        {/* {chain}
        <h1>{id}</h1>
        <button onClick={() => onDelete(id)}>asdf</button> */}

        <div className='px-4 py-2 mt-4 bg-dark2 rounded-4'>
            <div className='row align-items-center justify-content-between'>
                <div className='col-5 col-lg-3'>
                    <div className='row align-items-center'>
                        <a className='col-2 p-0' style={{ cursor: 'pointer' }} onClick={toggleAdditionalElements}>
                            {showAdditionalElements ? (
                                <IoIosArrowDown size={30} />
                                ) : (
                                <IoIosArrowForward size={30} />
                            )}
                        </a>
                        <div className='col-10'>
                            <h6 className='m-0'>{shortenAddress(contractAdress)}</h6>
                        </div>
                    </div>
                </div>
                <div className='col-5 text-center'>
                    <h6 className='m-0'>{chainInfo.name}</h6>
                </div>
                <div className='col-2 col-lg-2 '>
                    <div className='row align-items-center text-center'>
                        <div className='col-7 col-lg-7 p-1 p-lg-3'>
                            <MediaRenderer src={chainInfo.imgUrl} style={{ width: "100%", height: "100%"}}/>
                        </div>
                        <div className='col-5 col-lg-5 p-1' style={{ cursor: 'pointer' }} onClick={() => onDelete(id)}>
                            <MdOutlineDelete className='p-1' size={32} />
                        </div>
                    </div>
                </div>
            </div>
            {showAdditionalElements && (
            /* Your additional elements here */
            <div className="mt-3">
                <hr />
                <div>
                    <div>
                        <h3>Read Functions</h3>
                        {readFunctions.map((func: any) => (
                        <ContractFunctions key={func.name} name={func.name} type="read" inputs={func.inputs || []} />
                        ))}
                    </div>
                    <div>
                        <h3>Write Functions</h3>
                        {writeFunctions.map((func: any) => (
                        <ContractFunctions key={func.name} name={func.name} type="write" inputs={func.inputs || []} />
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default ContractCard