/* eslint-disable no-console */
import Constants from "src/constant";
import { firstLetterUpperCase } from "src/services/formatter/text";

export const wrapperResponse = (response, func, adapter, request) => {
  try {
    if (!response) {
      throw new Error(Constants.timeoutMessage);
    }
    if (typeof response === "undefined") {
      throw new Error(`Response Undefined From ${func}`);
    }
    console.debug(`[Res-Service] [${func}]`, response.toObject());
    let res = response.toObject();
    if (adapter) {
      if (request) {
        console.debug(`[Res-Service-Adapter] [${func}]`, adapter(res, request));
        return adapter(res, request);
      }
      console.debug(`[Res-Service-Adapter] [${func}]`, adapter(res));
      return adapter(res);
    }
    return res;
  } catch (error) {
    console.error(`[Error-Service] [${func}]`, error);
    throw error;
  }
};

export const wrapperSimpleRequest = (RequestObject, request, func) => {
  const req = new RequestObject();
  if (typeof request === "object" && request !== null) {
    Object.keys(request).forEach((item) => {
      let functionName;
      if (Array.isArray(request[item])) {
        functionName = `add${firstLetterUpperCase(item)}`;
      } else {
        functionName = `set${firstLetterUpperCase(item)}`;
      }
      if (!req[functionName]) {
        throw new Error(`Request Setter "${functionName}" not found`);
      }
      if (Array.isArray(request[item])) {
        request[item].forEach((data) => {
          req[functionName](data);
        });
      } else {
        req[functionName](request[item]);
      }
    });
  }
  if (func) {
    console.debug(`[Req-Service] [${func}]`, req.toObject());
  }
  return req;
};

export const handleMessageGeneralErrorMonetary = (error) => {
  const messageError =
    typeof error === "object" && error != null ? error.message : error;
  if (
    typeof messageError === "string" &&
    messageError.toLowerCase().includes("general error") &&
    !messageError.toLowerCase().includes("general error|") &&
    !messageError.toLowerCase().includes("general error |")
  ) {
    if (typeof error === "object" && error != null) {
      return {
        ...error,
        message: Constants.messageGeneralErrorMonetary,
      };
    }
    return Constants.messageGeneralErrorMonetary;
  }
  if (typeof error === "object" && error != null && error.message.length <= 0) {
    return "Undefined Error Message";
  }
  return error;
};
