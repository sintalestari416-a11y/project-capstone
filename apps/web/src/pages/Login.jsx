// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//     const { login } = useAuth();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleLogin = () => {
//         const success = login(email, password);

//         if (success) {
//             alert("Login berhasil ✅");
//         } else {
//             alert("Email / Password salah ❌");
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-[#0b1326] text-white">
//             <div className="bg-[#1e293b] p-6 rounded-xl w-80">
//                 <h2 className="text-lg font-bold mb-4">Login Admin</h2>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full mb-3 p-2 rounded bg-black/30"
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full mb-4 p-2 rounded bg-black/30"
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <button
//                     onClick={handleLogin}
//                     className="w-full bg-primary py-2 rounded"
//                 >
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 🔥 AUTO REDIRECT kalau sudah login
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    // 🔥 HANDLE LOGIN
    const handleLogin = (e) => {
        e.preventDefault();

        const success = login(email, password);

        if (success) {
            navigate("/"); // 🔥 langsung ke dashboard
        } else {
            alert("Email / Password salah ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020817]">
            <div className="bg-[#1e293b] p-6 rounded-xl w-80 shadow-lg">

                <h2 className="text-white text-lg font-bold mb-4 text-center">
                    Login Admin
                </h2>

                {/* EMAIL */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 px-3 py-2 rounded bg-gray-300 text-black"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded bg-gray-300 text-black"
                />

                {/* BUTTON LOGIN */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-purple-400 py-2 rounded text-white font-semibold hover:opacity-90 transition"
                >
                    Login
                </button>

            </div>
        </div>
    );
};

export default Login;