import React from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import MainOtpInput from '../../components/MainOtpInput'


export default function PasswordResetVerify({title}) {
    document.title = title
    return (
        <GuestLayout
            headerText={"Check your email for a code"}
            secondaryHeaderText={`We've sent a 6-digit code to yourworspace@business.com. The code expires shortly, please enter it soon`}
        >
            <form className='flex flex-col  gap-5 w-[90%] lg:w-[450px] mt-10' >
                <MainOtpInput
                    onOtpComplete={value => console.log({value})}
                />
            </form>
            <form className='flex flex-col items-center justify-center gap-5 w-[90%] lg:w-[400px] mt-10' >
                <div className='flex flex-col justify-center items-center text-center' >
                    <div className='text-sm lg:text-base' >Can't find your code? Check your spam folder!</div>
                    <button className='text-app-blue' >Resend</button>
                </div>
            </form>
        </GuestLayout>
    )
}
