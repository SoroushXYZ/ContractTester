import React, { useEffect, useState } from 'react'
import { useContract, useAddress , useSwitchChain, useChain, MediaRenderer} from "@thirdweb-dev/react";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClear } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { MdContentCopy } from "react-icons/md";
import ContractFunctions from '../contractFunctions/ContractFunctions';


interface ContractCardProps {
    id: number,
    chainInfo: { id: number; name: string; imgUrl: string; },
    abi: any,
    contractAdress: string,
    onDelete: (id: number) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ id, chainInfo, abi, contractAdress, onDelete }) => {
    const selectedChain = useChain();
    const switchChain = useSwitchChain();
    const connectedWalletAddress = useAddress();

    const [readConsoleText, setReadConsoleText] = useState("Logger for solidity `view` functions");
    const [writeConsoleText, setWriteConsoleText] = useState("Logger for solidity `write` functions");

    const [showAdditionalElements, setShowAdditionalElements] = useState(false);

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

    let readFunctions;
    let writeFunctions;
    
    try{
        readFunctions = abi.filter((item: { stateMutability: string; }) => item.stateMutability == "view");
        writeFunctions = abi.filter(
            (item: { stateMutability: string; type: string }) =>
              (item.stateMutability == "nonpayable" || item.stateMutability == "payable")
              && item.type !== 'fallback' //Used to ignore the fallback function.
              && item.type !== 'constructor' //Used to ignore the constructor function.
          );
    }catch{
        Swal.fire(
            "Error!",
            "Failed to parse the ABI",
            "error"
            );
        onDelete(id);
    }
    
    const logToConsole = (message: string, type: string) => {
        if(type == "read"){
            setReadConsoleText(prevLogs => `${prevLogs}\n${message}\n`);
        }else if(type == "write"){
            setWriteConsoleText(prevLogs => `${prevLogs}\n${message}\n`);
        }
    }; 

    const switchToThisChain = async () => {
        try{
            await switchChain(chainInfo.id)
        }catch{
            await Swal.fire(
                "Error!",
                "Failed to switch the network.",
                "error"
                );
            return
        }
    }

    async function handleFunctionCallButton(funcName: string, inputValues: { [key: string]: string; }, type: string, paybleValue: string): Promise<void> {
        if(isContractInstanceLoading || !connectedWalletAddress){
            return;
        }else if(selectedChain?.chainId != chainInfo.id){
            switchToThisChain();
            return;
        }

        let data = [];
        for(var i in inputValues) {
            if(i != "value"){
                data.push(inputValues[i]);
            }
        }

        let results;
        try{
            if(Number(paybleValue) < 0){
                results = (
                    await contractInstance?.call(funcName, data)
                );
            }else{
                results = (
                    await contractInstance?.call(funcName, data),
                    {value: paybleValue}
                );
            }
        }catch (e){
            logToConsole(funcName + " =>\n" + String(e), type);
            console.error(e)
            return;
        }
        logToConsole(funcName + " =>\n" + results, type);
    }

    function handleCleanReadTerminal(): void {
        setReadConsoleText("")
    }
    function handleCleanWriteTerminal(): void {
        setWriteConsoleText("")
    }

    function handleCopyContractAddressButton(): void {
        navigator.clipboard.writeText(contractAdress)
        .catch((err) => {
            console.error('Unable to copy text to clipboard', err);
        });
    }

    return (
    <div>
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
                            <h6 className='m-0'>
                                {shortenAddress(contractAdress)}
                                <a onClick={handleCopyContractAddressButton} className='mx-1 px-1' style={{cursor: "pointer"}}>
                                    <MdContentCopy size={15}/>
                                </a>
                            
                            </h6>
                        </div>
                    </div>
                </div>
                <div className='col-5 text-center'>
                    <h6 className='m-0'>{chainInfo.name}</h6>
                </div>
                <div className='col-2 col-lg-2 '>
                    <div className='row align-items-center text-center'>
                        <div className='col-7 col-lg-7 p-1 p-lg-4'>
                            <MediaRenderer src={chainInfo.imgUrl} style={{ width: "100%", height: "100%"}}/>
                        </div>
                        <div className='col-5 col-lg-5 p-1'>
                            <MdOutlineDelete className='p-1' style={{ cursor: 'pointer' }} onClick={() => onDelete(id)} size={32} />
                        </div>
                    </div>
                </div>
            </div>
            {showAdditionalElements && (
            /* Your additional elements here */
            <div className="mt-3">
                <hr />
                <div>
                    <h3 className='mt-2'>Read Functions</h3>
                    <div className='row'>
                        <div className='col-12 col-lg-8'>
                            {readFunctions.map((func: any, index: number) => (
                                <React.Fragment key={func.name}>
                                    <ContractFunctions name={func.name} type="read" inputs={func.inputs || []} isPayable={false} onFuncall={handleFunctionCallButton} />
                                    {index !== readFunctions.length - 1 && <hr className='mt-3' style={{ width: "90%", margin: "auto" }} />}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='col-12 col-lg-4 mt-3 mt-lg-0 p-0'>
                            <div className="d-flex justify-content-between bg-dark3 py-2">
                                <h5 className="mx-3 my-0">Logs</h5>
                                {/* <span className="mx-2 my-0">00</span> */}
                                <a className='mx-3' onClick={handleCleanReadTerminal} style={{cursor: "pointer"}}>
                                    <AiOutlineClear color='white' size={25}/>
                                </a>
                            </div>
                            <textarea
                                value={readConsoleText}
                                readOnly
                                className="form-control bg-black"
                                rows={15}
                            ></textarea>
                        </div>
                    </div>
                    <h3 className='mt-5'>Write Functions</h3>
                    <div className='row'>
                        <div className='col-12 col-lg-8'>
                            {writeFunctions.map((func: any, index: number) => (
                                <React.Fragment key={func.name}>
                                    <ContractFunctions name={func.name} type="write" inputs={func.inputs || []} isPayable={func.stateMutability == "payable"} onFuncall={handleFunctionCallButton}/>
                                    {index !== writeFunctions.length - 1 && <hr className='mt-3' style={{ width: "90%", margin: "auto" }} />}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='col-12 col-lg-4 mt-3 mt-lg-0 p-0'>
                            <div className="d-flex justify-content-between bg-dark3 py-2">
                                <h5 className="mx-3 my-0">Logs</h5>
                                {/* <span className="mx-2 my-0">00</span> */}
                                <a className='mx-3' onClick={handleCleanWriteTerminal} style={{cursor: "pointer"}}>
                                    <AiOutlineClear color='white' size={25}/>
                                </a>
                            </div>
                            <textarea
                                value={writeConsoleText}
                                readOnly
                                className="form-control bg-black"
                                rows={15}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
  )
}

export default ContractCard