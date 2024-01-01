import React, { useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import MainInput from '../../MainInput'

export default function SearchModal({ show, onClose, list }) {
    return (
        <Transition
            show={show}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={'w-screen h-screen fixed overflow-scroll top-0 left-0 flex justify-center items-center bg-[#0000006d]'}
        >
            <div className='bg-white shadow-lg rounded-md w-[90%] lg:w-[30%]' >
                <div className='bg-[#C5C5C533] h-14 flex justify-between items-center px-10' >
                    <div className='font-semibold' ></div>
                    <button onClick={onClose} className='flex justify-center items-center text-app-gray-3' >
                        <XCircleIcon className='w-7 h-7' />
                    </button>
                </div>
                <MainInput
                    placeholder={"Search Here"}
                />
            </div>
        </Transition>
    )
}
