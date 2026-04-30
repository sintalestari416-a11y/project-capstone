import React, { useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import { useLocations } from "../hooks/useLocations";


// 🔥 SEARCH HANDLER (AMAN)
const MapSearchHandler = ({ searchQuery, locations }) => {
  const map = useMap();

  useEffect(() => {
    if (!searchQuery || locations.length === 0) return;

    const found = locations.find(
      (loc) =>
        loc.nama?.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !isNaN(Number(loc.lat)) &&
        !isNaN(Number(loc.lng))
    );

    if (found) {
      map.setView([Number(found.lat), Number(found.lng)], 15, {
        animate: true,
      });
    }
  }, [searchQuery, locations, map]);

  return null;
};


// 🔥 SAFE CREATE CIRCLE (ANTI ERROR TURF)
const createCircle = (lat, lng) => {
  const latNum = Number(lat);
  const lngNum = Number(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    console.warn("INVALID COORD:", lat, lng);
    return null;
  }

  return turf.circle([lngNum, latNum], 0.6, {
    units: "kilometers",
    steps: 64,
  });
};


// 🔥 HITUNG OVERLAP (SAFE)
const getIntersection = (loc1, loc2) => {
  const c1 = createCircle(loc1.lat, loc1.lng);
  const c2 = createCircle(loc2.lat, loc2.lng);

  if (!c1 || !c2) return null;
  if (!c1.geometry || !c2.geometry) return null;

  try {
    return turf.intersect(c1, c2);
  } catch {
    return null;
  }
};


// 🔥 HITUNG JARAK (TETAP)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const toRad = (x) => (x * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};


// 🔥 CEK OVERLAP (AMAN)
const checkOverlap = (loc1, loc2) => {
  if (
    isNaN(Number(loc1.lat)) ||
    isNaN(Number(loc1.lng)) ||
    isNaN(Number(loc2.lat)) ||
    isNaN(Number(loc2.lng))
  ) {
    return false;
  }

  const distance = getDistance(
    Number(loc1.lat),
    Number(loc1.lng),
    Number(loc2.lat),
    Number(loc2.lng)
  );

  return distance < 1000;
};


// 🔥 MAIN COMPONENT
const MapSection = ({ searchQuery }) => {
  const rawLocations = useLocations();

  // 🔥 CLEAN DATA (PENTING BANGET)
  const locations = useMemo(() => {
    return rawLocations.filter(
      (loc) =>
        loc &&
        !isNaN(Number(loc.lat)) &&
        !isNaN(Number(loc.lng))
    );
  }, [rawLocations]);

  console.log("CLEAN LOCATIONS:", locations);

  // 🔥 HITUNG OVERLAP AREA (SAFE)
  const overlaps = useMemo(() => {
    const result = [];

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const inter = getIntersection(locations[i], locations[j]);
        if (inter) result.push(inter);
      }
    }

    return result;
  }, [locations]);

  console.log("OVERLAPS LENGTH:", overlaps.length);

  return (
    <div className="lg:col-span-8 flex flex-col gap-6">
      <div className="bg-surface-container-high/70 backdrop-blur-md outline outline-1 outline-outline-variant/20 rounded-xl overflow-hidden h-[400px] flex flex-col relative">

        {/* HEADER */}
        <div className="p-5 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-highest/50 absolute top-0 w-full z-20 backdrop-blur-sm">
          <h2 className="font-headline font-bold text-lg">
            Jakarta Selatan Heatmap
          </h2>
        </div>

        {/* MAP */}
        <div className="flex-1 relative overflow-hidden">
          <MapContainer
            center={[-6.25, 106.8]}
            zoom={13}
            className="h-full w-full z-0"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* SEARCH */}
            <MapSearchHandler
              searchQuery={searchQuery}
              locations={locations}
            />

            {/* MARKER + CIRCLE */}
            {locations.map((loc) => {
              const isOverlapping = locations.some((other) => {
                if (other.id === loc.id) return false;

                if (loc.type === "retail" && other.type === "pasar") {
                  return checkOverlap(loc, other);
                }

                return false;
              });

              return (
                <React.Fragment key={loc.id}>
                  <Marker position={[Number(loc.lat), Number(loc.lng)]}>
                    <Popup>
                      <strong>{loc.nama}</strong>
                      <br />
                      {loc.type}
                      <br />
                      Status: {isOverlapping ? "Violation ❌" : "Safe ✅"}
                    </Popup>
                  </Marker>

                  <Circle
                    center={[Number(loc.lat), Number(loc.lng)]}
                    radius={500}
                    pathOptions={{
                      color:
                        loc.type === "pasar"
                          ? "blue"
                          : isOverlapping
                            ? "red"
                            : "green",
                      fillOpacity: 0.15,
                    }}
                  />
                </React.Fragment>
              );
            })}

            {/* OVERLAP AREA */}
            {overlaps.map((area, idx) => (
              <GeoJSON
                key={idx}
                data={area}
                style={{
                  color: "yellow",
                  fillColor: "yellow",
                  fillOpacity: 0.8,
                }}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapSection;