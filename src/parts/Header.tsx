import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import HamburgerIcon from '@public/images/hamburger-menu.svg';

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggle = () => {
    setShowNavbar(!showNavbar);
  };

  const handlerLogout = async () => {
    // await logout();
    toast.success('Success logout');
  };

  return (
    <>
      <header id="header" className="sticky w-full z-30 top-0 bg-white">
        <div className="h-full w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2 px-3">
          <Link href="/" passHref>
            <div className="flex items-center justify-center cursor-pointer">
              <Image src="/images/logo.png" alt="logo" width={20} height={20} />
              <a className="font-bold ml-1 text-2lg">$Dollar$</a>
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
            <ul className="list-reset lg:flex justify-center flex-1 items-center">
              {/* <li className="">
                <Link href="/">
                  <a className="inline-block py-2 px-4 text-black">
                    How it Works
                  </a>
                </Link>
              </li> */}
            </ul>

            <div className="inline-flex flex-col lg:flex-row text-left justify-start">
              <Link href="/signup">
                <a className="inline-block border rounded-full px-5 py-2 text-left">
                  Connect Metamask
                </a>
              </Link>
            </div>
          </div>
        </div>
        <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
      </header>
    </>
  );
}
