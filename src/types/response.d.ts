interface GeneralResponse<T> {
    code: number;
    message: string;
    result: { count: number; rows: T };
}

interface ResponseMessage {
    message: {
        OK: "api.common.ok";
    };
}
