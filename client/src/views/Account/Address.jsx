import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addressAction } from '~/store/actions';

const NewAddressModal = ({ open = false, setOpen = (val) => val }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        // initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      New Address
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Add new Address still on progress</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  // ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const AddressCard = ({ address = { detail: {} } }) => {
  return (
    <div className="flex px-5 py-8 border-b-2">
      <div className="w-full flex-col space-y-2">
        <div className="flex">
          <div className="w-1/5 text-right text-sm overflow-hidden">Name</div>
          <div className="w-4/5 pl-5">{address.name}</div>
        </div>
        <div className="flex">
          <div className="w-1/5 text-right text-sm overflow-hidden">Phone</div>
          <div className="w-4/5 pl-5">{address.phone}</div>
        </div>
        <div className="flex">
          <div className="w-1/5 text-right text-sm overflow-hidden">Address</div>
          <div className="w-4/5 pl-5">
            {address.detail.address}
            <br />
            {address.detail.district} - {address.detail.city}
            <br />
            {address.detail.province}
            <br />
            {address.detail.country} {address.detail.postal_code}
          </div>
        </div>
      </div>
      <div className="w-1/3"></div>
    </div>
  );
};

const Address = () => {
  const dispatch = useDispatch();
  const { addressFetchList } = bindActionCreators(addressAction, dispatch);
  const rsAddress = useSelector((state) => state.address);
  const [openNewAddress, setOpenNewAddress] = useState(false);

  useLayoutEffect(() => {
    addressFetchList();
    return () => {};
  }, []);

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <h1 className="text-lg">My Address</h1>
        <button
          className="px-2 py-1 rounded bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-sm"
          onClick={() => setOpenNewAddress(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Address
        </button>
      </div>
      <hr className="border border-black" />
      <div>
        {rsAddress.addresses.map((address) => (
          <AddressCard address={address} />
        ))}
      </div>
      {/* new address modal */}
      <NewAddressModal open={openNewAddress} setOpen={setOpenNewAddress} />
    </>
  );
};

export default Address;
