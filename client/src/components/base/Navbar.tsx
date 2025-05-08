"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import LoginModal from "../auth/LoginModal";
import { User } from "@/app/api/auth/[...nextauth]/options";

const Navbar = ({ user }: { user?: User }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="w-full shadow-sm bg-white fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-blue-600">ScaleChat</h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="#features"
                        className="text-sm font-medium hover:underline"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm font-medium hover:underline"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#contact"
                        className="text-sm font-medium hover:underline"
                    >
                        Contact
                    </Link>
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium hover:underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <LoginModal />
                    )}
                </nav>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden px-6 pb-4 space-y-3 bg-white shadow-md">
                    <Link
                        href="#features"
                        className="block text-sm font-medium hover:underline"
                    >
                        Features
                    </Link>
                    <Link
                        href="#pricing"
                        className="block text-sm font-medium hover:underline"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#contact"
                        className="block text-sm font-medium hover:underline"
                    >
                        Contact
                    </Link>
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium hover:underline"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <LoginModal />
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
