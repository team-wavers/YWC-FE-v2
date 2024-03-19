interface IVoucher {
    _id: number;
    number: number;
    name: string;
    category: string;
    bank: "NH" | "GJ" | "NH/GJ";
    address: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    latitude: number;
    longitude: number;
}
