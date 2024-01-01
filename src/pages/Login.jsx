import React from 'react'
import GuestLayout from '../layouts/GuestLayout'
import MainButton from '../components/MainButton'
import MainInput from '../components/MainInput'
import MainPasswordInput from '../components/MainPasswordInput'
import Link from '../components/Link'

export default function Login({ title }) {
    document.title = title

    return (
        <GuestLayout
            headerText={"Sign In"}
            secondaryHeaderText={"We suggest using the email address you use at work."}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' >
                <MainInput
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                <MainPasswordInput
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
                <div className='flex justify-end' >
                    <Link href={"#"} >{"Forget Password ?"}</Link>
                </div>
                <MainButton
                    className="mt-5"
                >{"Sign in"}</MainButton>
            </form>
        </GuestLayout>
    )
}
