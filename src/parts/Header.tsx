import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import HamburgerIcon from '@public/images/hamburger-menu.svg';

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useUser } from '@data/useUser';
import { injected } from '@utils/Connector';
import { login, logout } from '@services/auth';

import UAuth from '@uauth/js';
export default function Header() {
  const { user, loading, mutate } = useUser({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showNavbar, setShowNavbar] = useState(false);

  const [authUD, setAuthUD] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);

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
      mutate();
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
    const uauth = new UAuth({
      clientID: process.env.NEXT_PUBLIC_UNSTOPPABLE_CLIENT_ID,
      redirectUri: process.env.NEXT_PUBLIC_UNSTOPPABLE_REDIRECT_URI,
    });

    setAuthUD(uauth);
  }, []);

  const handlerLoginUnstoppable = async () => {
    try {
      const authorization = await authUD.loginWithPopup();
      console.log(authorization);
      const account = {
        domain: authorization.idToken.sub,
        wallet: authorization.idToken.wallet_address,
      };
      await login({
        account,
        method: 'UNSTOPPABLE',
      });
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(user);
    console.log(currentAccount);
  }, [user]);

  return (
    <>
      <header id="header" className="sticky w-full z-30 top-0 bg-white">
        <div className="h-full w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 px-3">
          <Link href="/" passHref>
            <div className="flex items-center justify-center cursor-pointer">
              <Image src="/images/fluence.png" alt="logo" width={20} height={20} />
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

            <div className="inline-flex flex-col lg:flex-row text-left justify-start gap-x-3">
              {!user?.isLoggedIn && (
                <>
                  <button
                    className="inline-block border rounded-full px-5 py-2 text-left"
                    onClick={connect}
                  >
                    Connect Metamask
                  </button>
                  <button
                    className="inline-block border rounded-full px-5 py-2 text-left bg-blue-500 text-white hover:bg-blue-600"
                    onClick={handlerLoginUnstoppable}
                  >
                    Login with Unstoppable {isLoggedIn}
                  </button>
                </>
              )}
              {user?.isLoggedIn && (
                <li className="flex items-center">
                  <div className="dropdown flex items-center justify-between cursor-pointer py-3 px-4">
                    <Link href={`#`}>
                      <a className="border px-5 py-2 border rounded-full font-bold text-sm ml-2">
                        {user?.account?.domain}
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
