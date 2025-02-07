import { VIA_CHANNEL, VIA_CHANNEL_NAME } from "@constants/viaChannel.constants";

const formatViaChannel = (via?: string) => {
  const viaN = via;
  switch (viaN) {
    case VIA_CHANNEL.algo:
      return VIA_CHANNEL_NAME.algo;
    case VIA_CHANNEL.broker:
      return VIA_CHANNEL_NAME.broker;
    case VIA_CHANNEL.condition:
      return VIA_CHANNEL_NAME.condition;
    case VIA_CHANNEL.floor:
      return VIA_CHANNEL_NAME.floor;
    case VIA_CHANNEL.home:
      return VIA_CHANNEL_NAME.home;
    case VIA_CHANNEL.horizon:
      return VIA_CHANNEL_NAME.horizon;
    case VIA_CHANNEL.internet:
      return VIA_CHANNEL_NAME.internet;
    case VIA_CHANNEL.kbable:
      return VIA_CHANNEL_NAME.kbable;
    case VIA_CHANNEL.kbbuddypro:
      return VIA_CHANNEL_NAME.kbbuddypro;
    case VIA_CHANNEL.kbtrade:
      return VIA_CHANNEL_NAME.kbtrade;
    case VIA_CHANNEL.mable:
      return VIA_CHANNEL_NAME.mable;
    case VIA_CHANNEL.mobile:
      return VIA_CHANNEL_NAME.mobile;
    case VIA_CHANNEL.tele:
      return VIA_CHANNEL_NAME.tele;
    case VIA_CHANNEL.webTradingPro:
      return VIA_CHANNEL_NAME.webTradingPro;
    default:
      return "-";
  }
};

const formatColumnGrid = { formatViaChannel };
export default formatColumnGrid;
