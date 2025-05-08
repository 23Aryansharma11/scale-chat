import Link from "next/link";
import React from "react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition duration-200"
            >
                Go back home
            </Link>
        </div>
    );
};

export default NotFound;
