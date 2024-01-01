import React from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import MainInput from '../../components/MainInput'
import MainButton from '../../components/MainButton'

export default function PasswordResetSend({ title }) {
    document.title = title
    return (
        <GuestLayout
            headerText={"Forgot Password ?"}
            secondaryHeaderText={"Don't worry! It happens. Please enter the address associated with your workspace account"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' >
                <MainInput
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                <MainButton
                    className="mt-5"
                >{"Send Link"}</MainButton>
            </form>
        </GuestLayout>
    )
}
