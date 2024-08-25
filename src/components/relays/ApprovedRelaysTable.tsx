import React, { useState } from "react";
import {
  apiSlice,
  IRelayData,
  useListRelaysQuery
} from "../../store/slices/apiSlice";
import { store } from "../../store/store";
import { ConfirmModal } from "../common/ConfirmModal";


export const ApprovedRelaysTable: React.FC = () => {
  // const data = useSelector((state: RootState) => state.merchants.approved);
  const [selectedRelay, setSelectedRelay] = useState<IRelayData | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const {
    isFetching,
    isError,
    data=[],
    error,
    refetch: refetchRelays,
  } = useListRelaysQuery();



  const handleOnShowDeleteModalClick = (item: IRelayData) => {
    setSelectedRelay(item);
    setIsDeleteModalVisible(true);
  };

  const onDeleteRelay = async (id: string) => {
    const { error } = await store.dispatch(
      apiSlice.endpoints.deleteRelay.initiate(id)
    );
    if (error) {
      alert(
        `Failed to delete relay with error: ${
          (error as unknown as { error: string }).error
        }`
      );

      // refetch merchants
      refetchRelays();
      return;
    }
  };

  // Delete Relay modal
  if (isDeleteModalVisible && selectedRelay) {
    return (
      <ConfirmModal
        title="Delete Relay"
        content="Are you sure you want to delete this relay?"
        cancelButtonText="Cancel"
        successButtonText="Yes Delete it!"
        onCancelClick={() => {
          setSelectedRelay(null);
          setIsDeleteModalVisible(false);
        }}
        onSuccessClick={async () => {
          await onDeleteRelay(selectedRelay.pubkey);
          setSelectedRelay(null);
          setIsDeleteModalVisible(false);
        }}
      />
    );
  }

  if (!!isError || !!isFetching) {
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
                <pre>{JSON.stringify(item.contactDetails, null, 2)}</pre>
              </td>
              <td className="p-3">{item.pricing}</td>
              <td className="p-3 text-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleOnShowDeleteModalClick(item)}
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
