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

    // 🔥 FIX: state + sync data
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        if (rawLocations.length > 0) {
            setLocations(rawLocations);
        }
    }, [rawLocations]);

    const [search, setSearch] = useState("");
    const [showOnlyViolation, setShowOnlyViolation] = useState(false);

    const handleStatusChange = (id, newStatus) => {
        setLocations((prev) =>
            prev.map((loc, i) =>
                i === id ? { ...loc, manualStatus: newStatus } : loc
            )
        );
    };

    const violations = useMemo(() => {
        const result = locations
            .map((loc, i) => {
                if (!loc.lat || !loc.lng) return null;

                const isViolation =
                    loc.type === "zonasi"
                        ? loc.violation
                        : checkViolation(loc, locations);

                return {
                    id: i,
                    code: `#V-${i}`,
                    name: loc.nama || "-",
                    district: loc.kecamatan || "-", // (nanti kita fix ini juga)
                    rule: "< 500m from Pasar",
                    status:
                        loc.manualStatus ||
                        (isViolation ? "Critical" : "Safe"),
                };
            })
            .filter(Boolean);

        console.log("TOTAL LOC:", locations.length);
        console.log("AFTER MAP:", result.length);

        // 🔥 sementara biar KELIHATAN DATA
        return result;
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
                    <thead className="text-left text-on-surface-variant">
                        <tr>
                            <th>ID</th>
                            <th>Entity</th>
                            <th>District</th>
                            <th>Rule</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((item, i) => (
                            <tr key={i} className="border-t border-white/5">
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.district}</td>
                                <td>{item.rule}</td>

                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${item.status === "Critical"
                                            ? "bg-red-500/20 text-red-400"
                                            : item.status === "Resolved"
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td>
                                    <select
                                        className="bg-[#1f2937] text-white text-xs rounded px-2 py-1"
                                        onChange={(e) =>
                                            handleStatusChange(item.id, e.target.value)
                                        }
                                    >
                                        <option value="Critical">Critical</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center mt-6 text-gray-400">
                        Tidak ada data
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViolationsPage;