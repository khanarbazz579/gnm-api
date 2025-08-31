import { LOGGING_TYPES } from "src/utils/constants";

const logger = require("src/common/utils/logger");
export function serializeResponseData(response, url) {
    return {
        url: url,
        response: response,
        status: "Success"
    }
}

export function serializeErrorData(url, payload) {
    return {
        url: url,
        status: "Error",
        data: payload
    }
}

export function logWrapper(status, data, message, url, type = "error") {
    if (type === LOGGING_TYPES.error) {

        if (status in [400, 403]) {
            logger.info(message, serializeErrorData(url, data));
        }
        else {
            logger.error(message, serializeErrorData(url, data));
        }
    }
    else {
        logger.info(message, serializeResponseData(data, url));
    }

}

