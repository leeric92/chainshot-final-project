import React, { Fragment, useState, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Provider } from '../utils/provider';
import { Link } from 'react-router-dom';
import logo from '../logos/AirBlock-1.jpg';
import { DeployContractButton } from "./DeployContractButton";
import { ConnectWalletButton } from "./ConnectWalletButton";

const navigation = [
  { name: 'Home', current: true, to: '/', key: 0 },
  { name: 'Reservations', current: false, to: '/reservations', key: 1 },
  { name: 'Listings', current: false, to: '/listings', key: 2 },
  { name: 'Wallet', current: false, to: '/wallet', key: 3 }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export const Navigation = () => {
  const [currentTab, setCurrentTab] = useState('Home');
  const context = useWeb3React<Provider>();
  const { library, active } = context;

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="hidden lg:block w-48"
                    src={logo}
                    alt="AirBlock"
                  />
                </div>
                <div className="hidden sm:block lg:px-8 lg:py-8">
                  <div className="flex space-x-4 items-center">
                    {navigation.map((item) => (
                      <Link to={item.to} key={item.key}>
                        <span
                          key={item.name}
                          onClick={() => setCurrentTab(item.name)}
                          className={classNames(
                            window.location.pathname === item.to
                              ? 'bg-[#F55C40] text-white'
                              : 'text-gray-900 hover:bg-[#F55C40] hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    {active ? <DeployContractButton /> : <ConnectWalletButton />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};
