// import React, { useMemo, useState, useEffect } from "react";
// import { useLocations } from "../hooks/useLocations";

// // 🔥 logic dari MapView
// const getDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371e3;
//     const toRad = (x) => (x * Math.PI) / 180;

//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);

//     const a =
//         Math.sin(dLat / 2) ** 2 +
//         Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) ** 2;

//     return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// };

// const checkViolation = (current, all) => {
//     if (current.type !== "retail") return false;

//     return all.some((other) => {
//         if (other.type !== "pasar") return false;
//         return (
//             getDistance(current.lat, current.lng, other.lat, other.lng) < 500
//         );
//     });
// };

// const ViolationsPage = () => {
//     const rawLocations = useLocations() || [];

//     const [locations, setLocations] = useState([]);

//     // 🔥 LOAD LOCAL STORAGE
//     useEffect(() => {
//         try {
//             const saved = localStorage.getItem("locations");
//             if (saved) setLocations(JSON.parse(saved));
//         } catch (e) {
//             console.error("LocalStorage error:", e);
//         }
//     }, []);

//     // 🔥 FALLBACK DATA
//     useEffect(() => {
//         if (rawLocations.length > 0) {
//             setLocations(prev => (prev.length === 0 ? rawLocations : prev));
//         }
//     }, [rawLocations]);

//     // 🔥 SAVE LOCAL STORAGE
//     useEffect(() => {
//         if (locations.length > 0) {
//             localStorage.setItem("locations", JSON.stringify(locations));
//         }
//     }, [locations]);

//     const [search, setSearch] = useState("");
//     const [showOnlyViolation, setShowOnlyViolation] = useState(false);

//     // 🔥 NEW STATE (CONFIRM DELETE)
//     const [deleteId, setDeleteId] = useState(null);

//     // 🔥 EDIT STATUS
//     const handleStatusChange = (id, newStatus) => {
//         setLocations(prev =>
//             prev.map((loc, i) =>
//                 i === id ? { ...loc, manualStatus: newStatus } : loc
//             )
//         );
//     };

//     // 🔥 EDIT LIMIT & SATURATION
//     const handleFieldChange = (id, field, value) => {
//         setLocations(prev =>
//             prev.map((loc, i) =>
//                 i === id ? { ...loc, [field]: value } : loc
//             )
//         );
//     };

//     // 🔥 DELETE DATA
//     const handleDelete = (id) => {
//         setLocations((prev) => {
//             const updated = prev.filter((_, i) => i !== id);

//             localStorage.setItem("locations", JSON.stringify(updated));

//             return updated;
//         });
//     };

//     const violations = useMemo(() => {
//         return locations
//             .map((loc, i) => {
//                 if (!loc.lat || !loc.lng) return null;

//                 const isViolation =
//                     loc.type === "zonasi"
//                         ? loc.violation
//                         : checkViolation(loc, locations);

//                 const limit = loc.limit || 10;
//                 const saturation = loc.saturation || 0;

//                 let status = "Safe";

//                 if (loc.manualStatus) {
//                     status = loc.manualStatus;
//                 } else if (isViolation || saturation > 100) {
//                     status = "Critical";
//                 } else if (saturation > 80) {
//                     status = "Warning";
//                 }

//                 return {
//                     id: i,
//                     code: `#V-${i}`,
//                     name: loc.nama || "-",
//                     district: loc.kecamatan || "-",
//                     rule: "< 500m from Pasar",
//                     limit,
//                     saturation,
//                     status
//                 };
//             })
//             .filter(Boolean);
//     }, [locations]);

//     const filtered = violations
//         .filter((loc) =>
//             (loc?.name || "").toLowerCase().includes(search.toLowerCase())
//         )
//         .filter((loc) =>
//             showOnlyViolation ? loc.status === "Critical" : true
//         );

//     return (
//         <div className="ml-64 p-8 text-white">
//             <h1 className="text-2xl font-bold mb-6">All Violations</h1>

//             <button
//                 onClick={() => setShowOnlyViolation(prev => !prev)}
//                 className="mb-4 px-4 py-2 bg-purple-600 rounded"
//             >
//                 {showOnlyViolation ? "Show All" : "Show Violations Only"}
//             </button>

//             <input
//                 placeholder="Cari lokasi..."
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="mb-4 p-2 rounded bg-[#1f2937] w-full"
//             />

//             <div className="bg-surface-container rounded-xl p-4">
//                 <table className="w-full text-sm">
//                     <thead className="text-left text-on-surface-variant">
//                         <tr>
//                             <th>ID</th>
//                             <th>Entity</th>
//                             <th>District</th>
//                             <th>Rule</th>
//                             <th>Limit</th>
//                             <th>Saturation</th>
//                             <th>Status</th>
//                             <th>Edit</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {filtered.map((item, i) => (
//                             <tr key={i} className="border-t border-white/5">
//                                 <td>{item.code}</td>
//                                 <td>{item.name}</td>
//                                 <td>{item.district}</td>
//                                 <td>{item.rule}</td>

//                                 <td>
//                                     <input
//                                         type="number"
//                                         value={item.limit}
//                                         className="w-16 bg-[#1f2937] rounded px-2"
//                                         onChange={(e) =>
//                                             handleFieldChange(item.id, "limit", Number(e.target.value))
//                                         }
//                                     />
//                                 </td>

//                                 <td>
//                                     <input
//                                         type="number"
//                                         value={item.saturation}
//                                         className="w-16 bg-[#1f2937] rounded px-2"
//                                         onChange={(e) =>
//                                             handleFieldChange(item.id, "saturation", Number(e.target.value))
//                                         }
//                                     />
//                                 </td>

//                                 <td>
//                                     <span
//                                         className={`px-2 py-1 rounded text-xs ${item.status === "Critical"
//                                                 ? "bg-red-500/20 text-red-400"
//                                                 : item.status === "Resolved"
//                                                     ? "bg-green-500/20 text-green-400"
//                                                     : "bg-yellow-500/20 text-yellow-400"
//                                             }`}
//                                     >
//                                         {item.status}
//                                     </span>
//                                 </td>

//                                 <td>
//                                     <select
//                                         className="bg-[#1f2937] text-white text-xs rounded px-2 py-1"
//                                         value={item.status}
//                                         onChange={(e) =>
//                                             handleStatusChange(item.id, e.target.value)
//                                         }
//                                     >
//                                         <option value="Critical">Critical</option>
//                                         <option value="Resolved">Resolved</option>
//                                     </select>
//                                 </td>

//                                 {/* 🔥 UPDATED DELETE */}
//                                 <td>
//                                     <button
//                                         onClick={() => setDeleteId(item.id)}
//                                         className="px-2 py-1 bg-red-600 text-white text-xs rounded"
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {filtered.length === 0 && (
//                     <div className="text-center mt-6 text-gray-400">
//                         Tidak ada data
//                     </div>
//                 )}
//             </div>

//             {/* 🔥 CONFIRM DELETE MODAL */}
//             {deleteId !== null && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-[#1f2937] p-6 rounded-lg w-[350px] text-white">
//                         <h2 className="text-lg font-bold mb-4">
//                             ⚠️ Hapus Data?
//                         </h2>

//                         <p className="text-sm mb-6 text-gray-300">
//                             Data ini akan dihapus permanen. Yakin?
//                         </p>

//                         <div className="flex justify-end gap-2">
//                             <button
//                                 onClick={() => setDeleteId(null)}
//                                 className="px-4 py-2 bg-gray-500 rounded"
//                             >
//                                 Cancel
//                             </button>

//                             <button
//                                 onClick={() => {
//                                     handleDelete(deleteId);
//                                     setDeleteId(null);
//                                 }}
//                                 className="px-4 py-2 bg-red-600 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViolationsPage;











import React, { useMemo, useState, useEffect } from "react";
import { useLocations } from "../hooks/useLocations";

// 🔥 logic dari MapView
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = (x) => (x * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const checkViolation = (current, all) => {
    if (current.type !== "retail") return false;

    return all.some((other) => {
        if (other.type !== "pasar") return false;
        return (
            getDistance(current.lat, current.lng, other.lat, other.lng) < 500
        );
    });
};

const ViolationsPage = () => {
    const rawLocations = useLocations() || [];

    const [locations, setLocations] = useState([]);

    // 🔥 NEW STATE UNDO
    const [deletedItem, setDeletedItem] = useState(null);

    // 🔥 LOAD LOCAL STORAGE
    useEffect(() => {
        try {
            const saved = localStorage.getItem("locations");
            if (saved) setLocations(JSON.parse(saved));
        } catch (e) {
            console.error("LocalStorage error:", e);
        }
    }, []);

    // 🔥 FALLBACK DATA
    useEffect(() => {
        if (rawLocations.length > 0) {
            setLocations(prev => (prev.length === 0 ? rawLocations : prev));
        }
    }, [rawLocations]);

    // 🔥 SAVE LOCAL STORAGE
    useEffect(() => {
        if (locations.length > 0) {
            localStorage.setItem("locations", JSON.stringify(locations));
        }
    }, [locations]);

    const [search, setSearch] = useState("");
    const [showOnlyViolation, setShowOnlyViolation] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // 🔥 EDIT STATUS
    const handleStatusChange = (id, newStatus) => {
        setLocations(prev =>
            prev.map((loc, i) =>
                i === id ? { ...loc, manualStatus: newStatus } : loc
            )
        );
    };

    // 🔥 EDIT LIMIT & SATURATION
    const handleFieldChange = (id, field, value) => {
        setLocations(prev =>
            prev.map((loc, i) =>
                i === id ? { ...loc, [field]: value } : loc
            )
        );
    };

    // 🔥 DELETE + SIMPAN UNTUK UNDO
    const handleDelete = (id) => {
        setLocations((prev) => {
            const itemToDelete = prev.find((_, i) => i === id);
            const updated = prev.filter((_, i) => i !== id);

            setDeletedItem(itemToDelete); // 🔥 simpan

            localStorage.setItem("locations", JSON.stringify(updated));

            return updated;
        });
    };

    // 🔥 UNDO FUNCTION
    const handleUndo = () => {
        if (!deletedItem) return;

        setLocations((prev) => {
            const updated = [...prev, deletedItem];

            localStorage.setItem("locations", JSON.stringify(updated));

            return updated;
        });

        setDeletedItem(null);
    };

    const violations = useMemo(() => {
        return locations
            .map((loc, i) => {
                if (!loc.lat || !loc.lng) return null;

                const isViolation =
                    loc.type === "zonasi"
                        ? loc.violation
                        : checkViolation(loc, locations);

                const limit = loc.limit || 10;
                const saturation = loc.saturation || 0;

                let status = "Safe";

                if (loc.manualStatus) {
                    status = loc.manualStatus;
                } else if (isViolation || saturation > 100) {
                    status = "Critical";
                } else if (saturation > 80) {
                    status = "Warning";
                }

                return {
                    id: i,
                    code: `#V-${i}`,
                    name: loc.nama || "-",
                    district: loc.kecamatan || "-",
                    rule: "< 500m from Pasar",
                    limit,
                    saturation,
                    status
                };
            })
            .filter(Boolean);
    }, [locations]);

    const filtered = violations
        .filter((loc) =>
            (loc?.name || "").toLowerCase().includes(search.toLowerCase())
        )
        .filter((loc) =>
            showOnlyViolation ? loc.status === "Critical" : true
        );

    return (
        <div className="ml-64 p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">All Violations</h1>

            {/* 🔥 UNDO UI */}
            {deletedItem && (
                <div className="mb-4 p-3 bg-yellow-500/20 text-yellow-300 rounded flex justify-between items-center">
                    <span>Data berhasil dihapus</span>

                    <button
                        onClick={handleUndo}
                        className="px-3 py-1 bg-yellow-500 text-black rounded text-xs"
                    >
                        Undo
                    </button>
                </div>
            )}

            <button
                onClick={() => setShowOnlyViolation(prev => !prev)}
                className="mb-4 px-4 py-2 bg-purple-600 rounded"
            >
                {showOnlyViolation ? "Show All" : "Show Violations Only"}
            </button>

            <input
                placeholder="Cari lokasi..."
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 p-2 rounded bg-[#1f2937] w-full"
            />

            <div className="bg-surface-container rounded-xl p-4">
                <table className="w-full text-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Entity</th>
                            <th>District</th>
                            <th>Rule</th>
                            <th>Limit</th>
                            <th>Saturation</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.district}</td>
                                <td>{item.rule}</td>

                                <td>
                                    <input
                                        type="number"
                                        value={item.limit}
                                        className="w-16 bg-[#1f2937] text-white border border-white/10 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        onChange={(e) =>
                                            handleFieldChange(item.id, "limit", Number(e.target.value))
                                        }
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        value={item.saturation}
                                        className="w-16 bg-[#1f2937] text-white border border-white/10 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        onChange={(e) =>
                                            handleFieldChange(item.id, "saturation", Number(e.target.value))
                                        }
                                    />
                                </td>

                                <td>{item.status}</td>

                                <td>
                                    <select
                                        value={item.status}
                                        onChange={(e) =>
                                            handleStatusChange(item.id, e.target.value)
                                        }
                                    >
                                        <option value="Critical">Critical</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => setDeleteId(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && <div>Tidak ada data</div>}
            </div>

            {/* MODAL DELETE */}
            {deleteId !== null && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-4">
                        <p>Yakin hapus?</p>
                        <button onClick={() => setDeleteId(null)}>Cancel</button>
                        <button
                            onClick={() => {
                                handleDelete(deleteId);
                                setDeleteId(null);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViolationsPage;