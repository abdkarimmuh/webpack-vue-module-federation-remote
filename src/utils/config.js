import { isNotEmpty } from "./validation";

const _devWhen = [
  window.location.hostname.includes("dev"),
  window.location.hostname.includes("localhost"),
];

const _stagWhen = [window.location.hostname.includes("staging")];

const _trainWhen = [window.location.hostname.includes("training")];

const _pilotWhen = [window.location.hostname.includes("pilot")];

const _tbnWhen = [window.location.hostname.includes("tbn")];

const _rgnWhen = [window.location.hostname.includes("rgn")];

const _odcWhen = [window.location.hostname.includes("odc")];

export const getBaseUrlByEnv = (API) => {
  const { port } = window.location;
  const IS_DEV_MODE = process.env.NODE_ENV === "development";
  let url;

  if (_devWhen.some((val) => val)) {
    url = API.development;
  } else if (_stagWhen.some((val) => val)) {
    url = API.staging;
  } else if (_trainWhen.some((val) => val)) {
    url = API.training;
  } else if (_pilotWhen.some((val) => val)) {
    url = API.pilot;
  } else if (_tbnWhen.some((val) => val)) {
    url = API.tbn;
  } else if (_rgnWhen.some((val) => val)) {
    url = API.rgn;
  } else if (_odcWhen.some((val) => val)) {
    url = API.odc;
  } else {
    url = API.production;
  }

  // SET PORT
  if (isNotEmpty(port)) {
    if (!port.includes("80")) {
      url += `:${port}`;
    }
  }

  if (IS_DEV_MODE) {
    return "//localhost:8080/" + url;
  }

  return url;
};

export const getValueByEnv = (CONFIG) => {
  if (_devWhen.some((val) => val)) {
    return CONFIG.development;
  } else if (_stagWhen.some((val) => val)) {
    return CONFIG.staging;
  } else if (_pilotWhen.some((val) => val)) {
    return CONFIG.pilot;
  } else if (_trainWhen.some((val) => val)) {
    return CONFIG.training;
  } else if (_tbnWhen.some((val) => val)) {
    return CONFIG.tbn;
  } else if (_rgnWhen.some((val) => val)) {
    return CONFIG.rgn;
  } else if (_odcWhen.some((val) => val)) {
    return CONFIG.odc;
  } else {
    return CONFIG.prod;
  }
};
