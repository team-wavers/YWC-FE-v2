interface GeneralResponse<T> {
    code: number;
    message: ResponseMessage;
    result: { count: number; rows: T };
}

interface ResponseMessage {
    OK: "api.common.ok";
    BAD_REQUEST: "api.common.bad_request";
    UNAUTHORIZED: "api.common.unauthorized";
    FORBIDDEN: "api.common.forbidden";
    NOT_FOUND: "api.common.not_found";
    CONFLICT: "api.common.conflict";
    INTERNAL_SERVER_ERROR: "api.common.error";
}
