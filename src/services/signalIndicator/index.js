import Config from "@/config";
import Constants from "@/constant";

export default {
  getSignalIndicator: async ({ metadata }) => {
    const { Empty } = await import("google-protobuf/google/protobuf/empty_pb");
    const { SignalIndicatorServicePromiseClient } = await import(
      "@/proto/gen/bl_signalindicator_grpc_web_pb"
    );
    const SignalService = new SignalIndicatorServicePromiseClient(
      Config.baseUrl
    );

    const sendTime = await new Date().getTime();
    try {
      const req = new Empty();
      const res = await SignalService.checkSignalIndicator(req, metadata);
      if (res) {
        const selisih = new Date().getTime() - sendTime;
        return selisih;
      }
      if (!res) {
        console.error(new Error(Constants.timeoutMessage));
      }
    } catch (err) {
      console.error(err);
    }
  },
};
