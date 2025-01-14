import React, { useState, useEffect } from 'react';
import { Provider } from '../utils/provider';
import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';

import AirBlockArtifact from '../artifacts/contracts/AirBlock.sol/AirBlock.json';

export const DeployContractButton = () => {
  const context = useWeb3React<Provider>();
  const { library, active } = context;
  const [signer, setSigner] = useState<Signer>();
  const [deploying, setDeploying] = useState(false);
  const [airBlockContractAddr, setAirBlockContractAddr] = useState<string>();
  // '0xF765822f3843a1d2c093B461318466e9fb60D2bA'
  const [airBlockContract, setAirBlockContract] = useState<Contract>();
  // new ethers.Contract(airBlockContractAddr, AirBlockArtifact.abi, signer)

  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  const handleDeployContract = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('handleDeployContract', airBlockContract, signer);
    event.preventDefault();

    // only deploy the Greeter contract one time, when a signer is defined
    if (airBlockContract || !signer) {
      return;
    }

    setDeploying(true);

    async function deployAirBlockContract(signer: Signer): Promise<void> {
      const AirBlock = new ethers.ContractFactory(
        AirBlockArtifact.abi,
        AirBlockArtifact.bytecode,
        signer
      );

      try {
        const newAirBlockContract = await AirBlock.deploy();

        await newAirBlockContract.deployed();

        setAirBlockContract(newAirBlockContract);

        console.log(`AirBlock deployed to: ${newAirBlockContract.address}`);

        setAirBlockContractAddr(newAirBlockContract.address);
        setDeploying(false);
      } catch (error: any) {
        console.error(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
        setDeploying(false);
      }
    }

    deployAirBlockContract(signer);
  };

  return (
    <button
      type="button"
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={handleDeployContract}
    >
      {deploying ? <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg> : null}
      Deploy contract
    </button>
  );
};
