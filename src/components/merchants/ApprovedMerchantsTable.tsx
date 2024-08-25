import React, { useState } from "react";
import {
  apiSlice,
  IMerchantData,
  useListMerchantsQuery,
} from "../../store/slices/apiSlice";
import { store } from "../../store/store";
import { EditMerchantModal } from "./EditMerchantModal";

export const ApprovedMerchantsTable: React.FC = () => {
  const [selectedMerchant, setSelectedMerchant] =
    useState<IMerchantData | null>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const {
    isFetching,
    data = [],
    error,
    refetch: refetchMerchants,
  } = useListMerchantsQuery();

  const handleOnShowEditModalClick = (item: IMerchantData) => {
    setSelectedMerchant(item);
    setIsEditModalVisible(true);
  };

  const onDeleteMerchant = async (id: string) => {
    const { error } = await store.dispatch(
      apiSlice.endpoints.deleteMerchant.initiate(id)
    );
    if (error) {
      alert(
        `Failed to delete merchant with error: ${
          (error as unknown as { error: string }).error
        }`
      );

      // refetch merchants
      refetchMerchants();
      return;
    }
  };


  const onEditMerchant = async (data: {pubkey: string; approved_till:string, balance: number }) => {
    const { error } = await store.dispatch(
      apiSlice.endpoints.editMerchant.initiate({pubkey: data.pubkey, approved_till: data.approved_till,balance: data.balance })
    );
    if (error) {
      alert(
        `Failed to edit merchant with error: ${
          (error as unknown as { error: string }).error
        }`
      );

      // refetch merchants
      refetchMerchants();
      return;
    }
  };

  // Edit Relay modal
  if (isEditModalVisible && selectedMerchant !== null) {
    return (
      <EditMerchantModal
        merchant={selectedMerchant}
        onCancelClick={() => {
          setSelectedMerchant(null);
          setIsEditModalVisible(false);
        }}
        onUpdateClick={async (data) => {
          if(!data.approvedTill){
            alert("approved till data must be set before saving");
            return;
          }
          await onEditMerchant({pubkey: data.pubkey,approved_till:data.approvedTill, balance: data.balance});
          setSelectedMerchant(null);
          setIsEditModalVisible(false);
        }}
      />
    );
  }

  if (error || isFetching) {
    return (
      <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
        <div className="flex items-center justify-center rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 text-gray-400 py-64">
          {isFetching ? "Please wait while we load merchants..." : null}
          {error ? (error as unknown as { error: string }).error : null}
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded overflow-x-auto min-w-full bg-white">
      <table className="min-w-full text-sm align-middle whitespace-nowrap">
        {/* Table Header */}
        <thead>
          <tr>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Name
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              Description
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-left">
              pricing
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Contact Details
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Balance
            </th>
            <th className="p-3 text-gray-700 bg-gray-100 font-semibold text-sm tracking-wider uppercase text-center">
              Actions
            </th>
          </tr>
        </thead>
        {/* END Table Header */}
        {/* Table Body */}
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-3 text-center">{item.name}</td>
              <td className="p-3">{item.description}</td>
              <td className="p-3">{item.pricing}</td>
              <td className="p-3 text-center">
                <pre>{JSON.stringify(item.contact_details, null, 2)}</pre>
              </td>
              <td className="p-3">{item.balance}</td>
              <td className="p-3 text-center space-x-3">
                <button
                  onClick={() => handleOnShowEditModalClick(item)}
                  type="button"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                >
                  <svg
                    className="hi-solid hi-pencil inline-block w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => onDeleteMerchant(item.pubkey)}
                  type="button"
                  className="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-2 py-1 leading-5 text-sm rounded border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none"
                >
                  <svg
                    className="hi-solid hi-trash inline-block w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* END Table Body */}
      </table>
    </div>
  );
};
