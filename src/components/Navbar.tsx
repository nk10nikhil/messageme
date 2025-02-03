"use client";
import React from "react";
import  Link  from 'next/link';
import { useSession, signOut } from "next-auth/react";
import {User} from "next-auth";



const Navbar = () => {

    const { data: session } = useSession();
    
    const user : User = session?.user as User;

    return (
        <nav className="p-4 md:p-6 shadow-sm">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#" className="text-xl font-bold mb-4 md:mb-0">Message ME</a>
                {
                    session ? (
                        <>
                        <span className="mr-4">
                            Welcome, {user?.username || user?.email}
                        </span>
                        <button className="w-full md:w-auto" onClick={() => signOut()}>Sign Out
                        </button>
                        </>
                    ) : (
                        <Link href="/sign-in">
                            <button className="w-full md:w-auto">
                                Login
                            </button>
                        </Link>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar; 
