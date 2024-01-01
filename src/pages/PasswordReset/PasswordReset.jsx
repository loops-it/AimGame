import React from 'react'
import GuestLayout from '../../layouts/GuestLayout'
import MainPasswordInput from '../../components/MainPasswordInput'
import MainButton from '../../components/MainButton'
export default function PasswordReset({ title }) {
    document.title = title
    return (
        <GuestLayout
            headerText={"Reset Password"}
            secondaryHeaderText={"Enter your new password"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' >
                <MainPasswordInput
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
                <MainPasswordInput
                    label={"Confirm Password"}
                    placeholder={"Enter Confirm Password"}
                />
                <MainButton
                    className="mt-5"
                >{"Reset Password"}</MainButton>
            </form>
        </GuestLayout>
    )
}
