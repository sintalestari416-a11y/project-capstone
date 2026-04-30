// import React, { useState } from 'react';
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Header = ({ onSearch }) => {

//   // 🔥 STATE HELP
//   const [showHelp, setShowHelp] = useState(false);

//   //auth
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // 🔥 STATE NOTIF
//   const [showNotif, setShowNotif] = useState(false);

//   // 🔥 STATE SEARCH
//   const [search, setSearch] = useState("");

//   const notifications = [
//     "Tebet masuk CRITICAL",
//     "5 lokasi violation baru",
//     "Data berhasil diperbarui"
//   ];

//   return (
//     <header className="relative flex items-center justify-between px-8 py-3 ml-64 w-[calc(100%-16rem)] sticky top-0 z-30 bg-[#0b1326]/60 backdrop-blur-md h-16 border-b border-white/5 shadow-none">

//       {/* 🔍 Search Bar */}
//       <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg outline outline-1 outline-outline-variant/30 focus-within:outline-primary/50 focus-within:shadow-[0_4px_20px_rgba(124,58,237,0.15)] transition-all duration-300 w-96">
//         <span className="material-symbols-outlined text-on-surface-variant mr-3 text-sm">search</span>

//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               console.log("Search:", search);

//               // 🔥 KIRIM KE DASHBOARD
//               if (onSearch) {
//                 onSearch(search);
//               }
//             }
//           }}
//           className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full placeholder:text-on-surface-variant/50"
//           placeholder="Search coordinates, districts..."
//           type="text"
//         />
//       </div>

//       {/* Actions & Profile */}
//       <div className="flex items-center gap-4">

//         {/* 🔔 NOTIFICATION */}
//         <div className="relative">
//           <button
//             onClick={() => setShowNotif(!showNotif)}
//             className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
//           >
//             <span className="material-symbols-outlined">notifications</span>

//             {/* 🔴 BADGE */}
//             <span className="absolute top-1 right-1 text-[10px] bg-primary text-white px-1.5 rounded-full">
//               {notifications.length}
//             </span>
//           </button>

//           {/* DROPDOWN */}
//           {showNotif && (
//             <div className="absolute right-0 top-12 w-72 bg-[#1e293b] text-white p-4 rounded-xl shadow-xl border border-white/10 z-50 text-sm">
//               <h3 className="font-bold mb-2">Notifications</h3>

//               {notifications.map((notif, i) => (
//                 <div key={i} className="py-1 border-b border-white/5 last:border-none">
//                   {notif}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ❓ HELP */}
//         <button
//           onClick={() => setShowHelp(!showHelp)}
//           className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
//         >
//           <span className="material-symbols-outlined">help_outline</span>
//         </button>

//         {/* POPUP HELP */}
//         {showHelp && (
//           <div className="absolute top-16 right-6 w-96 bg-[#1e293b] text-white p-5 rounded-xl shadow-2xl border border-white/10 z-50 text-sm space-y-4">

//             <h2 className="text-lg font-bold text-primary-container">Zonify Help</h2>

//             <div>
//               <p className="font-semibold">📊 Dashboard</p>
//               <p>• Violations = jumlah pelanggaran jarak antar minimarket</p>
//               <p>• Safe Locations = lokasi yang tidak melanggar aturan</p>
//               <p>• Compliance Rate = persentase lokasi aman</p>
//             </div>

//             <div>
//               <p className="font-semibold">🗺️ Map</p>
//               <p>• Klik titik untuk melihat detail lokasi</p>
//               <p>• Lingkaran merah = radius aturan (500m)</p>
//               <p>• Jika overlap → dianggap violation</p>
//             </div>

//             <div>
//               <p className="font-semibold">⚠️ Status</p>
//               <p>• CRITICAL → pelanggaran tinggi</p>
//               <p>• WARNING → mendekati batas</p>
//               <p>• SAFE → tidak ada pelanggaran</p>
//             </div>

//             <div>
//               <p className="font-semibold">📏 Rules</p>
//               <p>• Radius minimal antar minimarket: 500 meter</p>
//               <p>• Overlap → over-saturation</p>
//             </div>

//             <div>
//               <p className="font-semibold">🎯 Tujuan</p>
//               <p>Zonify membantu analisis kepadatan retail untuk mencegah over-saturation.</p>
//             </div>

//           </div>
//         )}

//         <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>

//         {/* PROFILE (AUTH LOGIN / LOGOUT) */}
//         <button
//           onClick={() => {
//             if (!user) {
//               navigate("/login"); // 🔥 ke halaman login
//             } else {
//               logout(); // 🔥 logout
//             }
//           }}
//           className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-lg transition-colors"
//         >
//           <img
//             alt="Administrator Profile"
//             className="w-8 h-8 rounded-md object-cover border border-outline-variant/30"
//             src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Gdn6nE9_qIpBPyYGtSBMGuPjCu9gJOkYt59GaV4Gqy9ToDFNxxDKowdTvYBo8T85Ke-EoyojlScLsM-e8JXvf9-68s6IG6CTSzGWU6JWDseHcW0QyTPLFX1M7aO8_-kGpV8bAeGlkGcsk7zh406hBjSx_e0m4APEo5hCyuh4JRmbegvDIUYH7tX2fel54LFtIy1dDiPyyQzbdLxJx8L2X7XRo9dbXJzVYxbDuPa6UHKbVpc-AuC-wr_sS2yDHi7OBns-0soOPfpj"
//           />

//           <span className="text-sm font-medium">
//             {user ? "Logout" : "Admin"}
//           </span>
//         </button>

//         <span className="text-sm font-medium">
//           {user ? user.email : "Admin"}
//         </span>
//       </div>
//     </header>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch }) => {

  // 🔥 STATE HELP
  const [showHelp, setShowHelp] = useState(false);

  // 🔥 AUTH
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 🔥 STATE NOTIF
  const [showNotif, setShowNotif] = useState(false);

  // 🔥 STATE SEARCH
  const [search, setSearch] = useState("");

  const notifications = [
    "Tebet masuk CRITICAL",
    "5 lokasi violation baru",
    "Data berhasil diperbarui"
  ];

  return (
    <header className="relative flex items-center justify-between px-8 py-3 ml-64 w-[calc(100%-16rem)] sticky top-0 z-30 bg-[#0b1326]/60 backdrop-blur-md h-16 border-b border-white/5 shadow-none">

      {/* 🔍 Search Bar */}
      <div className="flex items-center bg-surface-container-lowest px-4 py-2 rounded-lg outline outline-1 outline-outline-variant/30 focus-within:outline-primary/50 focus-within:shadow-[0_4px_20px_rgba(124,58,237,0.15)] transition-all duration-300 w-96">
        <span className="material-symbols-outlined text-on-surface-variant mr-3 text-sm">search</span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("Search:", search);

              if (onSearch) {
                onSearch(search);
              }
            }
          }}
          className="bg-transparent border-none focus:ring-0 text-sm text-on-surface w-full placeholder:text-on-surface-variant/50"
          placeholder="Search coordinates, districts..."
          type="text"
        />
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">

        {/* 🔔 NOTIFICATION */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
          >
            <span className="material-symbols-outlined">notifications</span>

            <span className="absolute top-1 right-1 text-[10px] bg-primary text-white px-1.5 rounded-full">
              {notifications.length}
            </span>
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-72 bg-[#1e293b] text-white p-4 rounded-xl shadow-xl border border-white/10 z-50 text-sm">
              <h3 className="font-bold mb-2">Notifications</h3>

              {notifications.map((notif, i) => (
                <div key={i} className="py-1 border-b border-white/5 last:border-none">
                  {notif}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ❓ HELP */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>

        {/* POPUP HELP */}
        {showHelp && (
          <div className="absolute top-16 right-6 w-96 bg-[#1e293b] text-white p-5 rounded-xl shadow-2xl border border-white/10 z-50 text-sm space-y-4">

            <h2 className="text-lg font-bold text-primary-container">Zonify Help</h2>

            <div>
              <p className="font-semibold">📊 Dashboard</p>
              <p>• Violations = jumlah pelanggaran jarak antar minimarket</p>
              <p>• Safe Locations = lokasi yang tidak melanggar aturan</p>
              <p>• Compliance Rate = persentase lokasi aman</p>
            </div>

            <div>
              <p className="font-semibold">🗺️ Map</p>
              <p>• Klik titik untuk melihat detail lokasi</p>
              <p>• Lingkaran merah = radius aturan (500m)</p>
              <p>• Jika overlap → dianggap violation</p>
            </div>

            <div>
              <p className="font-semibold">⚠️ Status</p>
              <p>• CRITICAL → pelanggaran tinggi</p>
              <p>• WARNING → mendekati batas</p>
              <p>• SAFE → tidak ada pelanggaran</p>
            </div>

            <div>
              <p className="font-semibold">📏 Rules</p>
              <p>• Radius minimal antar minimarket: 500 meter</p>
              <p>• Overlap → over-saturation</p>
            </div>

            <div>
              <p className="font-semibold">🎯 Tujuan</p>
              <p>Zonify membantu analisis kepadatan retail untuk mencegah over-saturation.</p>
            </div>

          </div>
        )}

        <div className="h-6 w-px bg-outline-variant/30 mx-2"></div>

        {/* 🔥 PROFILE */}
        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
            } else {
              logout();
            }
          }}
          className="flex items-center gap-3 hover:bg-white/5 p-1 pr-3 rounded-lg transition-colors"
        >
          <img
            alt="Profile"
            className="w-8 h-8 rounded-md object-cover border border-outline-variant/30"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Gdn6nE9_qIpBPyYGtSBMGuPjCu9gJOkYt59GaV4Gqy9ToDFNxxDKowdTvYBo8T85Ke-EoyojlScLsM-e8JXvf9-68s6IG6CTSzGWU6JWDseHcW0QyTPLFX1M7aO8_-kGpV8bAeGlkGcsk7zh406hBjSx_e0m4APEo5hCyuh4JRmbegvDIUYH7tX2fel54LFtIy1dDiPyyQzbdLxJx8L2X7XRo9dbXJzVYxbDuPa6UHKbVpc-AuC-wr_sS2yDHi7OBns-0soOPfpj"
          />

          {/* 🔥 FIX: TIDAK DOUBLE LAGI */}
          <span className="text-sm font-medium">
            {user ? user.email : "Admin"}
          </span>
        </button>

      </div>
    </header>
  );
};

export default Header;