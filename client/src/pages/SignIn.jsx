
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'


export default function SignIn() {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    // console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signin',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            );
            const data = await res.json();
            console.log(data);
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/');

        } catch (error) {
            setLoading(false);
            setError(error.message);
        }

    };
    return (
        <div className="p-3 max-w-lg max-auto">
            <h1 className="text-3xl text-center font-semibold my-7">SignIn </h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg" // Fixed typo in class name
                    id="email" onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={handleChange}
                />
                <button disabled={loading}

                    className="bg-slate-700 text-white p-3 rounded-lg uppercase:hover:opacity-95" type="submit">
                    {loading ? 'Loading...' : 'SignIn'}
                </button> {/* Added type="submit" to the button */}
            </form>
            <div>
                <h1>Dont Have an account?</h1>
                <Link to={"/sign-up"}>
                    <span className="text-blue-700">Sign up</span>

                </Link>
                <div>
                    {error && <p className="text-red-500 mt-5">{error}</p>}
                </div>

            </div>
        </div>

    );
}
