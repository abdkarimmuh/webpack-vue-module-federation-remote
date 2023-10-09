import { getBaseUrlByEnv } from "@/utils/config";
const API = {
  development: "https://envoy-nds-dev.bri.co.id",
  staging: "https://envoy-nds-staging.bri.co.id",
  production: "https://envoy-nds.bri.co.id",
  training: "https://envoy-nds-training.bri.co.id",
  pilot: "https://envoy-nds-pilot.bri.co.id",
  tbn: "https://envoy-nds-tbn.bri.co.id",
  rgn: "https://envoy-nds-rgn.bri.co.id",
  odc: "https://envoy-nds-odc.bri.co.id",
};

export default {
  APP_NAME: "mf-vue-remote",
  KEY_STORE_NAME: "mf-vue-state",
  baseUrl: getBaseUrlByEnv(API),
  appVersion: "1.0.0",
  isUseFETimeout: false,
};
