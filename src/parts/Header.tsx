import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import HamburgerIcon from '@public/images/hamburger-menu.svg';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useUser } from '@data/useUser';
import { injected } from '@utils/Connector';
import { login, logout } from '@services/auth';
export default function Header() {
  const { user, loading, mutate } = useUser({});

  const [showNavbar, setShowNavbar] = useState(false);

  const toggle = () => {
    setShowNavbar(!showNavbar);
  };

  const {
    active,
    account,
    chainId,
    library,
    connector,
    error,
    activate,
    deactivate,
  } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.error(error);
    }
  }

  async function disconnect() {
    try {
      await logout();
      deactivate();
    } catch (error) {
      console.error(error);
      return Promise.reject();
    }
  }

  useEffect(() => {
    if (error) {
      if (error instanceof UnsupportedChainIdError) {
        toast.error(error.message);
      }
    }
  }, [error]);

  useEffect(() => {
    if (account) {
      mutate(
        login({
          address: account,
        })
      );
    }
  }, [account]);

  useEffect(() => {
    if (user?.address) {
      connect();
    }
  }, [user]);

  return (
    <>
      <header id="header" className="sticky w-full z-30 top-0 bg-white">
        <div className="h-full w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 px-3">
          <Link href="/" passHref>
            <div className="flex items-center justify-center cursor-pointer">
              <Image
                src="/images/fluence.png"
                alt="logo"
                width={20}
                height={20}
              />
              <a className="font-bold ml-1 text-2lg">OpenPond</a>
            </div>
          </Link>
          <div className="block lg:hidden">
            <button
              onClick={toggle}
              id="nav-toggle"
              className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <HamburgerIcon />
            </button>
          </div>
          <div
            className={`w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 ${
              showNavbar ? '' : 'hidden'
            }`}
            id="nav-content"
          >
            <ul className="list-reset lg:flex justify-center flex-1 items-center"></ul>

            <div className="inline-flex flex-col lg:flex-row text-left justify-start">
              {!active && (
                <button
                  className="inline-block border rounded-full px-5 py-2 text-left"
                  onClick={connect}
                >
                  Connect Metamask
                </button>
              )}

              {active && (
                <li className="flex items-center">
                  <div className="dropdown flex items-center justify-between cursor-pointer py-3 px-4">
                    <Link href={`#`}>
                      <a className="overflow-ellipsis overflow-hidden whitespace-nowrap max-w-100px font-bold text-sm ml-2">
                        {account}
                      </a>
                    </Link>

                    <div className="dropdown-menu">
                      <div className="arrow-icon"></div>
                      <ul>
                        <li className="flex items-center ">
                          <Link href="/my-collections">
                            <a className="hover:text-gray-300 text-sm font-semibold px-4 py-3">
                              My Collections
                            </a>
                          </Link>
                        </li>
                        <li className="flex items-center ">
                          <button
                            className="hover:text-gray-300 text-sm font-semibold px-4 py-3"
                            onClick={disconnect}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              )}
            </div>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </header>
    </>
  );
}
