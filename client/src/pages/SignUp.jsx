import React from "react";
import { Link } from 'react-router-dom'
export default function SignUp() {
    return (
        <div className="p-3 max-w-lg max-auto">
            <h1 className="text-3xl text-center font-semibold my-7">SignUp </h1>

            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                />

                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg" // Fixed typo in class name
                    id="email"
                />

                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <button className="bg-slate-700 rounded-lg uppercase:hover:opacity-95" type="submit">SignUp</button> {/* Added type="submit" to the button */}
            </form>
            <div>
                <h1>Have an account?</h1>
                <Link to={"/sign-in"}>
                    <span className="text-blue-700">Sign in</span>

                </Link>

            </div>
        </div>

    );
}
