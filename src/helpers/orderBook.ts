import { t } from "i18next";

export const getStatusOrderBook = (status: string) => {
  switch (status) {
    case "0":
      return t("orderBook:statusRejected");
    case "1":
      return t("orderBook:statusOpen");
    case "2":
      return t("orderBook:statusSend");
    case "3":
      return t("orderBook:statusCanceled1");
    case "A":
      return t("orderBook:statusAdmending");
    case "4":
      return t("orderBook:statusMatched");
    case "5":
      return t("orderBook:statusExpired1");
    case "C":
      return t("orderBook:statusCanceling");
    case "6":
      return t("orderBook:statusRejected");
    case "7":
      return t("orderBook:statusSuccessful");
    case "8":
      return t("orderBook:statusPending");
    case "9":
      return t("orderBook:statusPendingApproval");
    case "10":
      return t("orderBook:statusAdmended");
    case "11":
      return t("orderBook:statusSending");
    case "12":
      return t("orderBook:statusMatchedAll");
    case "13":
      return t("orderBook:statusWaitConfirmation");
    case "P":
      return t("orderBook:statusPendingProcessing");
    case "E":
      return t("orderBook:statusExpired2");
    case "R":
      return t("orderBook:statusCanceled2");
    case "W":
      return t("orderBook:statusWaitBankDeposits");
    default:
      return "";
  }
};

export const getExectype = (EXECTYPE: string) => {
  switch (EXECTYPE) {
    case "AS":
      return t("orderBook:execTypeAS");
    case "AB":
      return t("orderBook:execTypeAB");
    case "CS":
      return t("orderBook:execTypeCS");
    case "CB":
      return t("orderBook:execTypeCB");
    case "MS":
      return t("orderBook:execTypeMS");
    case "BC":
      return t("orderBook:execTypeBC");
    case "SS":
      return t("orderBook:execTypeSS");
    case "NS":
      return t("orderBook:execTypeNS");
    case "NB":
      return t("orderBook:execTypeNB");
    default:
      return "";
  }
};

export const exectypeClassRules = {
  "text-color-green": (params: any) =>
    params.value === "AB" ||
    params.value === "CB" ||
    params.value === "BC" ||
    params.value === "NB",
  "text-color-red": (params: any) =>
    params.value === "AS" ||
    params.value === "CS" ||
    params.value === "MS" ||
    params.value === "SS" ||
    params.value === "NS"
};

export const getFrequency = (frequency: string) => {
  switch (frequency) {
    case "DAILY":
      return t("orderBook:hangngay");
    case "WEEKLY":
      return t("orderBook:hangtuan");
    case "MONTHLY":
      return t("orderBook:hangthang");
    default:
      return "";
  }
};

export const getKenhVIA = (value: string) => {
  switch (value) {
    case "A":
      return "Tất cả";
    case "B":
      return "KB-Able";
    case "C":
      return "M-Able";
    case "D":
      return "KB Buddy";
    case "E":
      return "KB-Algo";
    case "F":
      return "Sàn giao dịch";
    case "H":
      return "KB-Home";
    case "I":
      return "Pro Broker";
    case "K":
      return "KB-Home-Client";
    case "L":
      return "Bloomberg";
    case "M":
      return "KB-Mobile";
    case "O":
      return "KB-Trade";
    case "P":
      return "KB-Quote";
    case "R":
      return "Periodic";
    case "S":
      return "Sàn giao dịch - Sửa lỗi";
    case "T":
      return "KB-Call";
    case "U":
      return "KB Buddy Pro";
    case "Z":
      return "Periodic Pro";
    case "W":
      return "KB Buddy WTS";
    case "Q":
      return "KB Buddy WTS BR";
    case "1":
      return "Web trading Pro Periodic";
    default:
      return "";
  }
};
export const getKenhVIAHisAdvMoney = (value: string) => {
  switch (value) {
    case "A":
      return "Tất cả";
    case "B":
      return "KB-Able";
    case "C":
      return "M-Able";
    case "D":
      return "KB Buddy";
    case "E":
      return "KB-Algo";
    case "F":
      return "Sàn giao dịch";
    case "H":
      return "KB-Home";
    case "I":
      return "Pro Broker";
    case "K":
      return "KB-Home-Client";
    case "L":
      return "Bloomberg";
    case "M":
      return "KB-Mobile";
    case "O":
      return "Online";
    case "P":
      return "KB-Quote";
    case "R":
      return "Periodic";
    case "S":
      return "Sàn giao dịch - Sửa lỗi";
    case "T":
      return "KB-Call";
    case "U":
      return "KB Buddy Pro";
    case "Z":
      return "Periodic Pro";
    case "W":
      return "KB Buddy WTS";
    case "Q":
      return "KB Buddy WTS BR";
    case "1":
      return "Web trading Pro Periodic";
    default:
      return "";
  }
};

export const getStatusOrderBookDer = (status: string) => {
  switch (status) {
    case "SE":
      return t("orderBook:dangDoiSua");
    case "U5":
      return t("orderBook:dangChoKetQuaHuy");
    case "TS":
      return t("orderBook:khopHet");
    case "TP":
      return t("orderBook:khopMotPhan");
    case "BB":
      return t("orderBook:dangGui");
    case "SS":
      return t("orderBook:daGui");
    case "DD":
      return t("orderBook:daHuy");
    case "NN":
      return t("orderBook:choGui");
    case "PP":
      return t("orderBook:lenhHetHieuLuc");
    case "U1":
      return t("orderBook:lenhGocDangDoiHuy");
    case "MM":
      return t("orderBook:lenhCorebankKhongDuTien");
    case "FF":
      return t("orderBook:giaiTaoLenh");
    case "ES":
      return t("orderBook:suaThanhCong");
    case "EN":
      return t("orderBook:suaKhongThanhCong");
    case "EE":
      return t("orderBook:lenhSuaGuiThanhCong");
    case "DN":
      return t("orderBook:huyKhongThanhCong");
    case "DS":
      return t("orderBook:huyThanhCong");
    case "DE":
      return t("orderBook:lenhHuyGuiThanhCong");
    case "SR":
      return t("orderBook:soTuChoi");
    case "SD":
      return t("orderBook:dangHuy");
    case "RR":
      return t("orderBook:benMuaTuChoi");
    case "GG":
      return t("orderBook:daGiaiTao");
    default:
      return "";
  }
};
