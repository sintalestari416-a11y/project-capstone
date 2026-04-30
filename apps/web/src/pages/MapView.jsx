// import React, { useState, useMemo } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// // ❌ cluster dimatikan sementara
// // import MarkerClusterGroup from "react-leaflet-cluster";
// import 'leaflet/dist/leaflet.css';
// import L, { Icon } from 'leaflet';
// import { useLocations } from "../hooks/useLocations";
// import { useMap } from "../context/MapContext";

// // 🔥 FIX ICON
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// // ICON
// const blueIcon = new Icon({
//   iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
//   iconSize: [25, 41],
// });

// const redIcon = new Icon({
//   iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
//   iconSize: [25, 41],
// });

// // 🔥 DISTANCE
// const getDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371e3;
//   const toRad = (x) => (x * Math.PI) / 180;

//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);

//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRad(lat1)) *
//     Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) ** 2;

//   return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
// };

// // 🔥 CHECK VIOLATION
// const checkViolation = (current, all) => {
//   if (current.type !== "retail") return false;

//   return all.some((other) => {
//     if (other.type !== "pasar") return false;
//     return getDistance(current.lat, current.lng, other.lat, other.lng) < 500;
//   });
// };

// // 🔥 CLUSTER LOGIC
// const getClusterLevel = (target, all) => {
//   let count = 0;

//   all.forEach(loc => {
//     if (loc.id === target.id) return;
//     const d = getDistance(target.lat, target.lng, loc.lat, loc.lng);
//     if (d < 300) count++;
//   });

//   if (count > 15) return "high";
//   if (count > 8) return "medium";
//   return "low";
// };

// // 🔥 STATS
// const getStats = (locations = []) => {
//   let violations = 0;

//   locations.forEach(loc => {
//     if (loc.isViolation) {
//       violations++;
//     }
//   });

//   return {
//     total: locations.length,
//     violations,
//     safe: locations.length - violations
//   };
// };

// const MapView = () => {

//   const locations = useLocations() || [];

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [showRadius, setShowRadius] = useState(false);

//   // 🔥 NEW (Predict AI)
//   const [isPredictActive, setIsPredictActive] = useState(false);

//   const { setSelectedLocation } = useMap();

//   // 🔥 CLICK HANDLER
//   const handlePredict = () => {
//     setIsPredictActive(prev => !prev);
//   };

//   // 🔥 PREPROCESS
//   const processedLocations = useMemo(() => {
//     return locations.map(loc => {

//       if (!loc.lat || !loc.lng) {
//         return {
//           ...loc,
//           isViolation: false,
//           cluster: "low"
//         };
//       }

//       return {
//         ...loc,
//         isViolation:
//           loc.type === "zonasi"
//             ? loc.violation
//             : checkViolation(loc, locations),

//         cluster: getClusterLevel(loc, locations)
//       };
//     });
//   }, [locations]);

//   const filteredLocations = processedLocations.filter(loc =>
//     (loc?.nama || "").toLowerCase().includes(search.toLowerCase())
//   );

//   const finalLocations = filteredLocations
//     .filter(loc => {
//       if (filter === "violation") return loc.isViolation;
//       if (filter === "safe") return !loc.isViolation;
//       if (filter === "retail") return loc.type === "retail";
//       if (filter === "pasar") return loc.type === "pasar";
//       return true;
//     })
//     .slice(0, 200);

//   const stats = getStats(finalLocations);

//   return (
//     <div className="h-screen w-full">

//       {/* 🔥 PREDICT BUTTON */}
//       <button
//         onClick={handlePredict}
//         style={{
//           position: "absolute",
//           top: "200px", // 🔥 lebih kebawah (sebelumnya 140px)
//           right: "20px",
//           zIndex: 1000,
//           padding: "10px 16px",
//           background: isPredictActive ? "#22c55e" : "#7c3aed",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           fontWeight: "bold",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.2)" // 🔥 biar lebih "keangkat"
//         }}
//       >
//         {isPredictActive ? "AI ON" : "Predict AI"}
//       </button>
//       {/* 🔥 INDICATOR */}
//       {isPredictActive && (
//         <div
//           style={{
//             position: "absolute",
//             bottom: "20px",
//             left: "20px",
//             zIndex: 1000,
//             background: "#22c55e",
//             color: "white",
//             padding: "8px 12px",
//             borderRadius: "6px",
//             fontSize: "12px"
//           }}
//         >
//           AI Prediction Active
//         </div>
//       )}

//       {/* SEARCH */}
//       <input
//         placeholder="Cari lokasi..."
//         onChange={(e) => setSearch(e.target.value)}
//         className="absolute top-4 right-4 z-[1000] p-2 rounded"
//       />

//       {/* FILTER */}
//       <div className="absolute top-16 right-4 z-[1000] bg-white p-2 rounded shadow">
//         <select onChange={(e) => setFilter(e.target.value)}>
//           <option value="all">All</option>
//           <option value="violation">Violation</option>
//           <option value="safe">Safe</option>
//           <option value="retail">Retail</option>
//           <option value="pasar">Pasar</option>
//         </select>
//       </div>

//       {/* TOGGLE */}
//       <div className="absolute top-28 right-4 z-[1000] bg-white p-2 rounded shadow">
//         <button
//           onClick={() => setShowRadius(prev => !prev)}
//           className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
//         >
//           {showRadius ? "Hide Radius" : "Show Radius"}
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="absolute top-4 left-4 z-[1000] bg-black text-white p-3 rounded">
//         <div>Total: {stats.total}</div>
//         <div>Violation: {stats.violations}</div>
//         <div>Safe: {stats.safe}</div>
//       </div>

//       {/* MAP */}
//       <MapContainer
//         center={[-6.2, 106.8]}
//         zoom={13}
//         preferCanvas={true}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* MARKER */}
//         {finalLocations.map((item) => {

//           if (isNaN(item.lat) || isNaN(item.lng)) return null;

//           return (
//             <Marker
//               key={item.id}
//               position={[item.lat, item.lng]}
//               icon={
//                 item.type === "pasar"
//                   ? blueIcon
//                   : item.cluster === "high"
//                     ? redIcon
//                     : item.cluster === "medium"
//                       ? redIcon
//                       : item.isViolation
//                         ? redIcon
//                         : blueIcon
//               }
//               eventHandlers={{
//                 click: () => setSelectedLocation(item)
//               }}
//             >
//               <Popup>
//                 <b>{item.nama}</b><br />

//                 {item.type === "zonasi" && (
//                   <>
//                     Jarak: {Math.round(item.jarak)} m<br />
//                     Pasar: {item.pasarTerdekat}<br />
//                   </>
//                 )}

//                 <b style={{ color: item.isViolation ? 'red' : 'green' }}>
//                   {item.isViolation ? 'VIOLATION (<500m)' : 'SAFE'}
//                 </b>

//                 <br />
//                 Cluster: <b>{item.cluster}</b>
//               </Popup>
//             </Marker>
//           );
//         })}

//         {/* CIRCLE */}
//         {showRadius && finalLocations.map((item, index) => {
//           if (isNaN(item.lat) || isNaN(item.lng)) return null;

//           return (
//             <Circle
//               key={`circle-${index}`}
//               center={[item.lat, item.lng]}
//               radius={500}
//               pathOptions={{
//                 color: item.type === "pasar" ? "blue" : "red",
//                 fillOpacity: 0.05
//               }}
//             />
//           );
//         })}

//       </MapContainer>
//     </div>
//   );
// };

// export default MapView;
import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';
import { useLocations } from "../hooks/useLocations";
import { useMap } from "../context/MapContext";

// 🔥 FIX ICON
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// ICON
const blueIcon = new Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [25, 41],
});

const redIcon = new Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
  iconSize: [25, 41],
});

// 🔥 ORANGE (PREDICT)
const orangeIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// 🔥 DISTANCE
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

// 🔥 CHECK VIOLATION
const checkViolation = (current, all) => {
  if (current.type !== "retail") return false;

  return all.some((other) => {
    if (other.type !== "pasar") return false;
    return getDistance(current.lat, current.lng, other.lat, other.lng) < 500;
  });
};

// 🔥 CLUSTER
const getClusterLevel = (target, all) => {
  let count = 0;

  all.forEach(loc => {
    if (loc.id === target.id) return;
    const d = getDistance(target.lat, target.lng, loc.lat, loc.lng);
    if (d < 300) count++;
  });

  if (count > 15) return "high";
  if (count > 8) return "medium";
  return "low";
};

// 🔥 STATS
const getStats = (locations = []) => {
  let violations = 0;

  locations.forEach(loc => {
    if (loc.isViolation) violations++;
  });

  return {
    total: locations.length,
    violations,
    safe: locations.length - violations
  };
};

const MapView = () => {

  const locations = useLocations() || [];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showRadius, setShowRadius] = useState(false);
  const [isPredictActive, setIsPredictActive] = useState(false);

  const { setSelectedLocation } = useMap();

  const handlePredict = () => {
    setIsPredictActive(prev => !prev);
  };

  // 🔥 PREPROCESS + AI
  const processedLocations = useMemo(() => {
    return locations.map(loc => {

      if (!loc.lat || !loc.lng) {
        return {
          ...loc,
          isViolation: false,
          cluster: "low",
          predicted: false
        };
      }

      const isViolation =
        loc.type === "zonasi"
          ? loc.violation
          : checkViolation(loc, locations);

      const cluster = getClusterLevel(loc, locations);

      return {
        ...loc,
        isViolation,
        cluster,
        predicted: cluster === "high" && !isViolation
      };
    });
  }, [locations]);

  const filteredLocations = processedLocations.filter(loc =>
    (loc?.nama || "").toLowerCase().includes(search.toLowerCase())
  );

  const finalLocations = filteredLocations
    .filter(loc => {
      if (filter === "violation") return loc.isViolation;
      if (filter === "safe") return !loc.isViolation;
      if (filter === "retail") return loc.type === "retail";
      if (filter === "pasar") return loc.type === "pasar";
      return true;
    })
    .slice(0, 200);

  const stats = getStats(finalLocations);

  return (
    <div className="h-screen w-full">

      {/* 🔥 SEARCH */}
      <input
        placeholder="Cari lokasi..."
        onChange={(e) => setSearch(e.target.value)}
        className="absolute top-4 right-4 z-[1000] p-2 rounded"
      />

      {/* 🔥 FILTER */}
      <div className="absolute top-16 right-4 z-[1000] bg-white p-2 rounded shadow">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="violation">Violation</option>
          <option value="safe">Safe</option>
          <option value="retail">Retail</option>
          <option value="pasar">Pasar</option>
        </select>
      </div>

      {/* 🔥 TOGGLE RADIUS */}
      <div className="absolute top-28 right-4 z-[1000] bg-white p-2 rounded shadow">
        <button
          onClick={() => setShowRadius(prev => !prev)}
          className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
        >
          {showRadius ? "Hide Radius" : "Show Radius"}
        </button>
      </div>

      {/* 🔥 PREDICT BUTTON */}
      <button
        onClick={handlePredict}
        style={{
          position: "absolute",
          top: "200px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 16px",
          background: isPredictActive ? "#22c55e" : "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold"
        }}
      >
        {isPredictActive ? "AI ON" : "Predict AI"}
      </button>

      {/* 🔥 STATS */}
      <div className="absolute top-4 left-4 z-[1000] bg-black text-white p-3 rounded">
        <div>Total: {stats.total}</div>
        <div>Violation: {stats.violations}</div>
        <div>Safe: {stats.safe}</div>
      </div>

      {/* 🔥 MAP */}
      <MapContainer
        center={[-6.2, 106.8]}
        zoom={13}
        preferCanvas={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* MARKER */}
        {finalLocations.map((item) => {
          if (isNaN(item.lat) || isNaN(item.lng)) return null;

          return (
            <Marker
              key={item.id}
              position={[item.lat, item.lng]}
              icon={
                item.type === "pasar"
                  ? blueIcon
                  : item.isViolation
                    ? redIcon
                    : isPredictActive && item.predicted
                      ? orangeIcon
                      : blueIcon
              }
              eventHandlers={{
                click: () => setSelectedLocation(item)
              }}
            >
              <Popup>
                <b>{item.nama}</b><br />

                <b style={{ color: item.isViolation ? 'red' : 'green' }}>
                  {item.isViolation ? 'VIOLATION (<500m)' : 'SAFE'}
                </b>

                {isPredictActive && item.predicted && (
                  <>
                    <br />
                    <b style={{ color: "orange" }}>
                      POTENTIAL VIOLATION
                    </b>
                  </>
                )}

                <br />
                Cluster: <b>{item.cluster}</b>
              </Popup>
            </Marker>
          );
        })}

        {/* 🔥 CIRCLE */}
        {showRadius && finalLocations.map((item, index) => {
          if (isNaN(item.lat) || isNaN(item.lng)) return null;

          return (
            <Circle
              key={`circle-${index}`}
              center={[item.lat, item.lng]}
              radius={500}
              pathOptions={{
                color: item.type === "pasar" ? "blue" : "red",
                fillOpacity: 0.05
              }}
            />
          );
        })}

      </MapContainer>
    </div>
  );
};

export default MapView;