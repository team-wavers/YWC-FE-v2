import instance from "./base";

const voucher = {
    getVouchersByCoord: ({
        lat,
        lng,
        distance,
    }: {
        lat: number;
        lng: number;
        distance?: number;
    }) =>
        instance().get(`stores/nearby`, {
            params: { latitude: lat, longitude: lng, distance: distance },
        }),
    getVouchersByKeyword: ({
        q,
        page,
        size,
        city,
    }: {
        q: string;
        page?: number;
        size?: number;
        city?: string;
    }) =>
        instance().get(`stores`, {
            params: { q: q, page: page, size: size, city: city },
        }),
};

export { voucher };
