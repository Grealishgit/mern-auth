import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const showSidebar = () => setSidebarVisible(true);
    const hideSidebar = () => setSidebarVisible(false);
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-[url("/laptop.jpg")] bg-cover bg-center cursor-pointer'>
            <nav className="bg-gradient-to-br  from-black via-green-700 to-emerald-900 shadow-md">
                {/* Sidebar */}
                <ul
                    className={`fixed top-0 right-0 h-screen w-full bg-white bg-opacity-50 backdrop-blur-md shadow-lg list-none flex flex-col items-end justify-start transform transition-transform duration-300 ${isSidebarVisible ? "translate-x-0" : "translate-x-full"}`}
                >
                    <li>
                        <button
                            onClick={hideSidebar}
                            className="p-4 text-black hover:bg-gray-100 flex items-center w-full"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="26"
                                viewBox="0 96 960 960"
                                width="26"
                            >
                                <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <a href="/" className="p-2 text-black hover:bg-gray-100 rounded-md w-full block font-semibold">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#" className="p-4 text-black hover:bg-gray-100 rounded-se-md w-full block font-semibold">
                            Products
                        </a>
                    </li>
                    <li>
                        <a href="#" className="p-4 text-black hover:bg-gray-100 rounded-md w-full block font-semibold">
                            About
                        </a>
                    </li>
                    <li>
                        <a href="#" className="p-4 text-black hover:bg-gray-100 rounded-md w-full block font-semibold">
                            Contact
                        </a>
                    </li>
                    <li>
                        <a href="my-profile" className="p-4 text-black hover:bg-gray-100 rounded-md w-full block font-semibold">
                            Profile
                        </a>
                    </li>
                </ul>

                {/* Main Navbar */}
                <ul className="flex items-center justify-end px-4 py-2 space-x-4 list-none">
                    <li className="mr-auto">
                        <img src={assets.header_img} alt="" className='w-10 h-10 rounded-full' />
                    </li>
                    <li className="hidden md:block">
                        <a href="/" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            Home
                        </a>
                    </li>
                    <li className="hidden md:block">
                        <a href="#" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            Products
                        </a>
                    </li>
                    <li className="hidden md:block">
                        <a href="#" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            About
                        </a>
                    </li>
                    <li className="hidden md:block">
                        <a href="#" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            Contact
                        </a>
                    </li>
                    <li className="hidden md:block">
                        <a href="my-profile" className="text-black hover:bg-gray-100 rounded-md px-4 py-2">
                            Profile
                        </a>
                    </li>
                    <li className="block md:hidden">
                        <button
                            onClick={showSidebar}
                            className="text-black hover:bg-gray-100 p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="26"
                                viewBox="0 96 960 960"
                                width="26"
                            >
                                <path d="M120 816v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;
