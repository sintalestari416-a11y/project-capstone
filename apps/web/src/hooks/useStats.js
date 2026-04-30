import { useLocations } from "./useLocations";

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

export const useStats = () => {
    const locations = useLocations();

    const retail = locations.filter((l) => l.type === "retail");
    const pasar = locations.filter((l) => l.type === "pasar");

    let violations = 0;

    retail.forEach((r) => {
        const isViolation = pasar.some((p) => {
            const distance = getDistance(r.lat, r.lng, p.lat, p.lng);
            return distance < 500; // 🔥 aturan utama
        });

        if (isViolation) violations++;
    });

    const safe = retail.length - violations;

    const compliance =
        retail.length === 0
            ? 0
            : ((safe / retail.length) * 100).toFixed(1);

    return {
        total: retail.length,
        violations,
        safe,
        compliance,
    };
};