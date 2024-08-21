import clsx from "clsx";
import { useState } from "react";
import { DashboardLayout } from "../components/layouts/DashboardLayout.tsx";
import { ApprovedRelaysTable } from "../components/relays/ApprovedRelaysTable.tsx";
import { RelayRequestsTable } from "../components/relays/RelayRequestsTable.tsx";

export const Relays: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <DashboardLayout>
      <div className="flex flex-col rounded shadow-sm bg-white overflow-hidden">
        <nav className="flex items-center border-b border-gray-200">
          <button
            onClick={() => setCurrentTab(0)}
            className={clsx(
              "px-3 md:px-5 font-medium -mb-px flex items-center space-x-2 py-4 border-b-2",
              currentTab === 0
                ? "text-indigo-500 border-indigo-500"
                : "text-gray-500 border-transparent hover:text-indigo-500 active:text-gray-500"
            )}
          >
            Relays
          </button>
          <button
            onClick={() => setCurrentTab(1)}
            className={clsx(
              "px-3 md:px-5 font-medium -mb-px flex items-center space-x-2 py-4 border-b-2",
              currentTab === 1
                ? "text-indigo-500 border-indigo-500"
                : "text-gray-500 border-transparent hover:text-indigo-500 active:text-gray-500"
            )}
          >
            Pending Requests
          </button>
        </nav>
        <div className="p-5 lg:p-6 grow w-full">
          {/* All Merchants */}
          {currentTab === 0 && <ApprovedRelaysTable />}

          {/* Pending Merchant Requests */}
          {currentTab === 1 && <RelayRequestsTable />}
        </div>
      </div>
    </DashboardLayout>
  );
};
