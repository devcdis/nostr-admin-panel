import React, { useState } from "react";
import { IMerchantData } from "../../store/slices/apiSlice";

export interface IEditMerchantModalProps {
  merchant: IMerchantData;
  onCancelClick: () => void;
  onUpdateClick: (merchant: IMerchantData) => void;
}

export const EditMerchantModal: React.FC<IEditMerchantModalProps> = ({
  merchant,
  onCancelClick,
  onUpdateClick,
}) => {
  const [data, setData] = useState(merchant);

  return (
    <div>
      <div
        className="z-90 fixed inset-0 overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-75 p-4 lg:p-8"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="tk-modal-with-form"
        aria-hidden="false"
      >
        <div
          className="flex flex-col rounded shadow-sm bg-white overflow-hidden w-full max-w-md mx-auto"
          role="document"
        >
          <div className="py-4 px-5 lg:px-6 w-full bg-gray-50 flex justify-between items-center">
            <h3 className="font-medium flex items-center space-x-2">
              <svg
                className="hi-solid hi-user-add inline-block w-5 h-5 opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
              <span>Edit Merchant Data</span>
            </h3>
            <div className="-my-4">
              <button
                type="button"
                className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-transparent text-gray-600 hover:text-gray-400 focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:text-gray-600"
              >
                <svg
                  className="hi-solid hi-x inline-block w-4 h-4 -mx-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-5 lg:p-6 grow w-full">
            <p className="text-gray-600 mb-5">Merchant Name</p>
            <input
              className="w-full block border text-gray-600 cursor-not-allowed border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              type="text"
              value={data.name}
              disabled
            />
          </div>
          <div className="p-5 lg:p-6 grow w-full">
            <p className="text-gray-600 mb-5">Balance</p>
            <input
              className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              type="number"
              placeholder="2000"
              onChange={(event) =>
                setData({ ...data, balance: Number(event.target.value) || 0 })
              }
              value={data.balance}
            />
          </div>
          <div className="p-5 lg:p-6 grow w-full">
            <p className="text-gray-600 mb-5">Advertised Till</p>
            <input
              className="w-full block border border-gray-200 rounded px-3 py-2 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              type="date"
              onChange={(event) =>
                setData({ ...data, approvedTill: event.target.value })
              }
              value={data.approvedTill}
            />
          </div>

          <div className="py-4 px-5 lg:px-6 w-full bg-gray-50 text-right space-x-1">
            <button
              onClick={() => onCancelClick()}
              type="button"
              className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-transparent text-indigo-600 hover:text-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:text-indigo-600"
            >
              Cancel
            </button>
            <button
              onClick={() => onUpdateClick({...data})}
              type="button"
              className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-5 text-sm rounded border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-800 hover:border-indigo-800 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 active:bg-indigo-700 active:border-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
        {/* END Modal Dialog */}
      </div>
      {/* END Modal Backdrop */}
    </div>
  );
};
