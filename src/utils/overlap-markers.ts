const getOverlapMarkers = (markers: IVoucher[]) => {
    const markerList = new Map();
    const duplMarkerList = new Map();

    markers.forEach((voucher) => {
        const key = `${voucher.latitude}:${voucher.longitude}`;
        if (markerList.has(key)) {
            if (!duplMarkerList.get(key)) {
                duplMarkerList.set(key, [markerList.get(key), voucher]);
            } else {
                duplMarkerList.get(key).push(voucher);
            }
        } else {
            markerList.set(key, voucher);
        }
    });

    return Array.from(duplMarkerList.values());
};

export { getOverlapMarkers };
