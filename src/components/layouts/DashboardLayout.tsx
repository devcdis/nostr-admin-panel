import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Routes } from "../../common/Routes";
import clsx from "clsx";

export const DashboardHeader: React.FC = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="flex flex-none items-center bg-white shadow-sm z-1">
      <div className="container xl:max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between py-4">
          {/* Left Section */}
          <div className="flex items-center">
            {/* Logo */}
            <Link
              to={Routes.MERCHANTS}
              className="group inline-flex items-center space-x-2 font-bold text-lg tracking-wide text-gray-700 hover:text-indigo-600 active:text-gray-700"
            >
              <span>Admin Panel</span>
            </Link>
            {/* END Logo */}
          </div>
          {/* END Left Section */}
          {/* Right Section */}
          <div className="flex items-center space-x-1 lg:space-x-5">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-2">
              <Link
                to={Routes.MERCHANTS}
                className={clsx(
                  "text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border",
                  location.pathname === Routes.MERCHANTS
                    ? "border-indigo-50 bg-indigo-50 text-indigo-500"
                    : "text-gray-600 border-transparent hover:text-indigo-500 hover:bg-indigo-50 hover:border-indigo-50 active:bg-indigo-100 active:border-indigo-100"
                )}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-50 hi-solid hi-user-circle inline-block w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Merchants</span>
              </Link>
              <Link
                to={Routes.RELAYS}
                className={clsx(
                  "text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border",
                  location.pathname === Routes.RELAYS
                    ? "border-indigo-50 bg-indigo-50 text-indigo-500"
                    : "text-gray-600 border-transparent hover:text-indigo-500 hover:bg-indigo-50 hover:border-indigo-50 active:bg-indigo-100 active:border-indigo-100"
                )}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-50 hi-solid hi-briefcase inline-block w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <span>Relays</span>
              </Link>
            </nav>
            {/* END Desktop Navigation */}
            {/* Toggle Mobile Navigation */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                type="button"
                className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="hi-solid hi-menu inline-block w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            {/* END Toggle Mobile Navigation */}
          </div>
          {/* END Right Section */}
        </div>
        {/* Mobile Navigation */}

        <div className={clsx("lg:hidden", !isMobileNavOpen ? "hidden" : null)}>
          <nav className="flex flex-col space-y-2 py-4 border-t">
            <Link
              to={Routes.MERCHANTS}
              className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded border border-indigo-50 bg-indigo-50 text-indigo-500"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50 hi-solid hi-home inline-block w-5 h-5"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Merchants</span>
            </Link>
            <Link
              to={Routes.RELAYS}
              className="text-sm font-medium flex items-center space-x-2 px-3 py-2 rounded text-gray-600 border border-transparent hover:text-indigo-500 hover:bg-indigo-50 hover:border-indigo-50 active:bg-indigo-100 active:border-indigo-100"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-50 hi-solid hi-user-circle inline-block w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Relays</span>
            </Link>
          </nav>
        </div>
        {/* END Mobile Navigation */}
      </div>
    </header>
  );
};

interface IDashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<IDashboardLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex flex-col mx-auto w-full min-h-screen bg-gray-100">
      <DashboardHeader />
      <main id="page-content" className="flex flex-auto flex-col max-w-full">
        <div className="container xl:max-w-7xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
