import { type Data } from "@types";

import api from ".";

export interface IAccount {
  owner: number;
  id: string;
  custodycd?: string;
  customerid: string;
  name: string;
  currency: string;
  currencySign: string;
  corebank: string;
  accountdesc?: string;
  config?: any;
}

export interface IAccountInfo {
  authtype?: number | string;
  mobile1?: string;
  mobile2?: string;
  email?: string;
  usesmartotp?: string;
  viasmartotp?: string;
  username?: string;
  customerid?: string;
  custname?: string;
  isresetpass?: string;
}

export interface IReqForgotPass {
  idCode: string;
  mobile: string;
  userName: string;
  email: string;
}

export interface IReqChangePassword {
  password: string;
  oldPassword: string;
  pwtType: "LOGINPWD" | "TRADINGPWD";
}

export interface IReqChangePasswordAndPin {
  password: string;
  oldpassword: string;
  pin: string;
  oldpin: string;
}
export interface IAccountsRes {
  s: string;
  d?: IAccount[];
  errmsg?: string;
}

const getAccountList = async (token?: string): Promise<IAccountsRes> => {
  try {
    const url = `/accounts`;
    const response = token
      ? await api.unAuthenOpenApi(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      : await api.authenOpenApi(url);
    return response.data;
  } catch (err: any) {
    return {
      s: "error",
      errmsg: err.response.data.errmsg
    };
  }
};

export interface ISubAccountsRes {
  fullName: string; // Họ và tên
  idCode: string; // Số CMND/Hộ chiếu
  idDate: string; // Ngày cấp
  idPlace: string; // Nơi cấp
  dateOfBirth: string; // Ngày sinh
  sex: "001" | "002" | "003"; // Giới tính (001: Nam, 002: Nữ, 003: khác)
  address: string; // Địa chỉ
  mobile1: string; // Điện thoại 1
  mobile2?: string; // Điện thoại 2 (tùy chọn)
  email: string; // Email
  rmName?: string; // Người chăm sóc (tùy chọn)
  rdName?: string; // Người giới thiệu (tùy chọn)
  otAuthType?: string; // Loại hình xác thực (tùy chọn)
  otAuthTypeCode?: string; // Mã loại hình xác thực (tùy chọn)
  tradeOnline?: string; // Giao dịch Online (tùy chọn)
  mrCrLimitMax?: string; // Hạn mức tín dụng (tùy chọn)
  coreBank?: string; // Kết nối tài khoản ngân hàng (tùy chọn)
  bankAcctno?: string; // Số tài khoản ngân hàng (tùy chọn)
  CUSTODYCD?: string; // Số lưu ký (tùy chọn)
  custid?: string; // (tùy chọn)
  custRank?: string; // (tùy chọn)
  bondsToSharesList?: string; // (tùy chọn)
  custAgentMobile?: string; // Điện thoại môi giới chăm sóc (tùy chọn)
  accountDesc?: string; // Mô tả tài khoản (tùy chọn)
  addressKBSV?: string; // Địa chỉ liên hệ với KBSV (tùy chọn)
}

const getInfoSubAccount: (params: { accountId: string }) => Promise<
  Data.AxiosResponse<{
    d?: ISubAccountsRes;
    s: "ok" | "error";
    em?: string;
  }>
> = async ({ accountId }) => {
  try {
    const url = `/inq/accounts/${accountId}/afacctnoInfor`;
    const response = await api.authenOpenApi(url);
    return { status: "success", data: response.data };
  } catch (e) {
    return {
      status: "error",
      message: "error"
    };
  }
};

export interface IAccountInfoRes {
  s: "ok" | "error";
  errmsg?: string;
  d?: IAccountInfo;
}

const getAccountInfo = async (token?: string): Promise<IAccountInfoRes> => {
  try {
    const url = `/user/info`;
    const response = token
      ? await api.unAuthenOpenApi(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      : await api.authenOpenApi(url);
    return response.data;
  } catch (err: any) {
    return {
      s: "error",
      errmsg: err.response.data.errmsg
    };
  }
};

const forgotPassword = async (request: IReqForgotPass) => {
  try {
    const url = `/userdata/resetPass`;
    const res = await api.unAuthenOpenApi.post(url, request);
    return res;
  } catch (err) {}
};

const changePassword = async (request: IReqChangePassword, token?: string) => {
  try {
    const url = `/userdata/changePass`;
    const res = token
      ? await api.unAuthenOpenApi.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      : await api.authenOpenApi.post(url, request);
    return res;
  } catch (err) {}
};

const changePasswordAndPin = async (
  request: IReqChangePasswordAndPin,
  token?: string
) => {
  try {
    const url = `/userdata/changePassAndPin`;
    const res = token
      ? await api.unAuthenOpenApi.post(url, request, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      : await api.authenOpenApi.post(url, request);
    return res;
  } catch (err) {}
};
interface IResGetSecPortfolio {
  s: "ok" | number;
  errmsg?: string;
  d?: IItemResSecPortfolio[];
}

export interface IItemResSecPortfolio {
  accountID: string;
  symbol: string;
  total: number;
  trade: number;
  blocked: number;
  receivingRight: number;
  receivingT0: number;
  receivingT1: number;
  receivingT2: number;
  costPrice: number;
  sendingT0: number;
  sendingT1: number;
  sendingT2: number;
  basicPrice: number;
  costPriceAmt: number;
  vsdMortgage: number;
  remainQtty: number;
  pnlRate: number;
  pnlAmt: number;
  basicPriceAmt: number;
}

const getSecutitiesPortfolio: (params: {
  accountId: string;
}) => Promise<Data.AxiosResponse<IResGetSecPortfolio>> = async ({
  accountId
}) => {
  try {
    const res = await api.authenOpenApi<IResGetSecPortfolio>(
      `/inq/accounts/${accountId}/securitiesPortfolio`
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

export interface ISvGetReportLoanList {
  Params: {
    accountId: string;
    /**
     * dd/mm/yyyy
     **/
    fromDate: string;
    toDate: string;
  };

  TransactionDetails: {
    /** Tài khoản giao dịch */
    accountId: string;

    /** Tài khoản ng */
    loanAccount: string;

    /** Loại sản phẩm */
    typeName: string;

    /** Ngày giải ngân */
    releaseDate: string;

    /** Ngày đáo hạn */
    overdueDate: string;

    /** Nợ gốc */
    releaseAmt: number;

    /** Tất toán gốc */
    paid: number;

    /** Tất toán lãi */
    interestPaid: number;

    /** Dư nợ hiện tại */
    remainDebt: number;

    /** Lãi trong hạn */
    interest: number;

    /** Tổng nợ */
    totalLoan: number;

    /** Tuổi nợ */
    days: number;

    /** Lãi quá hạn */
    overdueInterest: number;
    avgRate: number;
    description: string;
    descriptionCode: string;
  };

  Response: {
    s: "ok" | string;
    errmsg?: string;
    d?: Array<ISvGetReportLoanList["TransactionDetails"]>;
  };
}

const getReportLoanList: (
  params: ISvGetReportLoanList["Params"]
) => Promise<Data.AxiosResponse<ISvGetReportLoanList["Response"]>> = async ({
  accountId,
  ...params
}) => {
  try {
    const res = await api.authenOpenApi<ISvGetReportLoanList["Response"]>(
      `/report/accounts/${accountId}/loanList`,
      { params }
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};
export declare namespace ISVGetAccountAsset {
  type Params = {
    accountId: string;
  };
  type Response = {
    s: "ok" | string;
    errmsg?: string;
    d?: FinancialDetails[];
  };

  type FinancialDetails = {
    /** Tổng giá trị CK (tính theo giá tham chiếu) */
    stockAmt: number;

    /** Giá tham chiếu */
    balance: number;

    /** Số dư tiền */
    cash: number;

    /** Tiền mặt còn lại cần mua */
    buyRemainAmt: number;

    /** Tiền mua */
    buyAmt: number;

    /** Tiền bán chờ về (T0) */
    receivingT0: number;

    /** Tiền bán chờ về (T1) */
    receivingT1: number;

    /** Tiền bán chờ về (T2) */
    receivingT2: number;

    /** Tiền có thể ứng */
    avlAdvance: number;

    /** Tiền đã ứng */
    advancedAmt: number;

    /** Giá trị quyền chờ về */
    careceiving: number;

    /** Lãi tiền gửi */
    CreditInterest: number;

    /** Tổng nợ */
    totalLoan: number;

    /** Dư nợ gốc */
    loanAmt: number;

    /** Lãi/Phí dịch vụ tài chính */
    inPayTotal: number;

    /** Phí trả nợ trễ hạn */
    depofeeamt: number;

    /** Tài sản ròng */
    nav: number;

    /** Tỷ lệ gọi vốn */
    callRate: number;

    /** Tỷ lệ thực hiện */
    executeRate: number;

    /** Hạn mức vay */
    LoanLimit: number;

    /** Dự phòng tiền */
    PP: number;

    /** Tỷ lệ margin */
    marginRate: number;

    /** Khả năng rút vốn */
    avlDrawDown: number;

    /** Phí mua */
    buyFeeAmt: number;

    /** Phí bán */
    sellFeeAmt: number;

    /** Thuế bán */
    sellTaxAmt: number;

    /** Lãi cộng dồn từ trả nợ trễ hạn */
    cidepofeeacr: number;

    /* Phí lưu ký đến hạn */
    sumDepofeeamt: number;
  };
}

const getAccountAsset: (
  params: ISVGetAccountAsset.Params
) => Promise<Data.AxiosResponse<ISVGetAccountAsset.Response>> = async ({
  accountId,
  ...params
}) => {
  try {
    const res = await api.authenOpenApi<ISVGetAccountAsset.Response>(
      `/inq/accounts/${accountId}/accountAsset`,
      { params }
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

export declare namespace ISVGetBrAccountAsset {
  type Params = {
    subAccountNo: string;
  };
  type Response = {
    code: 0 | -1;
    message?: string;
    value?: FinancialDetails[];
  };

  type FinancialDetails = {
    accountId: string; // Tổng giá trị CK (tính theo giá tham chiếu)
    stockAmt: number; // Tổng giá trị CK (tính theo giá tham chiếu)
    balance: number; // Số dư tiền
    cash: number; // Tiền mặt
    buyRemainAmt: number; // Mua chờ khớp
    buyAmt: number; // Mua chờ thanh toán (T0)
    receivingT0: number; // Tiền bán chờ về (T0)
    receivingT1: number; // Tiền bán chờ về (T1)
    receivingT2: number; // Tiền bán chờ về (T2)
    avlAdvance: number; // Tiền có thể ứng
    advancedAmt: number; // Tiền đã ứng
    careCeiving: number; // Giá trị quyền chờ về
    creditInterest: number; // Lãi tiền gửi
    totalLoan: number; // Tổng nợ
    loanAmt: number; // Dư nợ gốc
    inpayTotal: number; // Lãi/Phí dịch vụ tài chính
    depoFeeAmt: number; // Phí lưu ký đến hạn
    cidepoFeeAcr: number; // Phí lưu ký cộng dồn
    nav: number; // Tài sản ròng
    callRate: number; // Rtt call
    executeRate: number; // Rtt force sell
    loanLimit: number; // Hạn mức vay
    pp: number; // Sức mua
    marginRate: number; // Tỉ lệ KQ hiện tại
    avlDrawDown: number; // Số tiền vay có thể giải ngân
    buyFeeAmt: number; // Phí mua
    sellFeeAmt: number; // Phí bán
    sellTaxAmt: number; // Thuế
  };
}

const getBrAccountAsset: (
  params: ISVGetBrAccountAsset.Params
) => Promise<Data.AxiosResponse<ISVGetBrAccountAsset.Response>> = async (
  params
) => {
  try {
    const res = await api.authenSAS<ISVGetBrAccountAsset.Response>(
      `/kbsv-broker-qr-api/api/v1/broker/get-account-asset`,
      { params }
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};
export declare namespace ISVGetBrInfoAsset {
  type Params = {
    subAccountNo: string;
  };
  type Response = {
    code: 0 | -1;
    message?: string;
    value: StockData[];
  };

  type StockData = {
    CODEID: string; // id mã chứng khoán
    SYMBOL: string; // mã chứng khoán
    ACCNO: string; // Mã tiểu khoản
    TRADE: number; // chứng khoán khả dụng
    RECEIVING_T2: number; // chứng khoán mua chờ khớp T0
    RECEIVING: number; // chứng khoán chờ về
    RECEIVING_RIGHT: number; // quyền chờ về
    RIGHTREGISTERED: number; // quyền mua
    BASICPRICE: number;
  };
}

const getBrInfoAsset: (
  params: ISVGetBrInfoAsset.Params
) => Promise<Data.AxiosResponse<ISVGetBrInfoAsset.Response>> = async (
  params
) => {
  try {
    const res = await api.authenSAS<ISVGetBrInfoAsset.Response>(
      `/kbsv-broker-qr-api/api/v1/broker/get-info-asset`,
      { params }
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

export declare namespace ISVGetAccountRightOfList {
  type Params = {
    accountId: string;
  };
  type Response = {
    s: "ok" | "error";
    errmsg?: string;
    d?: FinancialDetails[];
  };

  type FinancialDetails = {
    retailBalance: number;
    rightRegistered: number;
    price: number;
    symbol: string;
  };
}

const getRightOffList: (
  params: ISVGetAccountRightOfList.Params
) => Promise<Data.AxiosResponse<ISVGetAccountRightOfList.Response>> = async ({
  accountId,
  ...params
}) => {
  try {
    const res = await api.authenOpenApi<ISVGetAccountRightOfList.Response>(
      `/inq/accounts/${accountId}/rightOffList`,
      { params }
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};
export declare namespace ISVGetAccountSummary {
  type Params = {
    accountId: string;
  };
  type Response = {
    s: "ok" | "error";
    errmsg?: string;
    d?: FinancialDetails[];
  };

  type FinancialDetails = {
    afacctno: string; // Số tiểu khoản giao dịch
    desc_status: string; // Trạng thái tiểu khoản
    pp: number; // Sức mua cơ bản
    balance: number; // Tiền
    advanceLine: number; // Bảo lãnh cấp trong ngày
    baldefovd: number; // Số tiền có thể ứng
    alwwithdraw: number; // Số tiền có thể rút
    alwadvance: number; // Số tiền ứng trước
    aamt: number; // Nợ vay ứng trước
    bamt: number; // Tiền đặt mua
    odamt: number; // Tổng nợ
    dealpaidamt: number; // Tiền đặt 1T+Q/ĐHĐH
    outstanding: number; // Dư nợ
    floatamt: number; // Số tiền có thể chuyển khoản ra
    netting: number; // Số tiền chờ giao
    receivingt0: number; // Tiền bán T0
    receivingt1: number; // Tiền bán T1
    receivingt2: number; // Tiền bán T2
    receivingt3: number; // Tiền bán T3
    sendingt0: number; // Tiền mua T0
    sendingt1: number; // Tiền mua T1
    cash_pendwithdra: number; // Tiền chờ rút
    cash_pendtransfer: number; // Tiền chờ chuyển khoản
    alvady_t3: number; // Số tiền có thể ứng (T3)
    alvady_t1: number; // Số tiền có thể ứng (T1)
    alvady_t2: number; // Số tiền có thể ứng (T2)
    cash_pending_sen: number; // Tiền chờ gửi
    cash2sending: number; // Tổng
    margirate: number; // Tỷ lệ ký quỹ hiện tại
    marginrate_ex: number; // Tỷ lệ ký quỹ điều chỉnh
    qd: number; // Số tiền cần phải trả
    ovdodefee: number; // Tiền quá hạn
    careceiving: number; // Tiền chờ thu về
    totaldebtamt: number; // Tổng nợ
    addvnd: number; // Tiền dự duy trì
    buyremainvalue: number; // Tiền mua còn lại
  };
}

const getSummaryAccount: (
  params: ISVGetAccountSummary.Params
) => Promise<Data.AxiosResponse<ISVGetAccountSummary.Response>> = async ({
  accountId
}) => {
  try {
    const res = await api.authenOpenApi<ISVGetAccountSummary.Response>(
      `/inq/accounts/${accountId}/summaryAccount`
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

export declare namespace ISVGetAccountInfoForAdvance {
  type Params = {
    accountId: string;
  };
  type Response = {
    s: "ok" | "error";
    em?: string;
    d?: Item[];
  };

  type Item = {
    pendingAdvance: string /** Số tiền ứng chờ xử lý **/;
    txDate: string /** Ngày đặt lệnh **/;
    execAmt: string /** Giá trị khớp **/;
    advancedAmt: string /** Số tiền đã ứng trước **/;
    paidDate: string /** Ngày hoàn ứng **/;
    maxAdvanceAmt: string /** Số tiền tối đa được ứng **/;
    days: string /** Số ngày ứng trước **/;
    minFeeAmt: string /** Số tiền phí tối thiểu **/;
    maxFeeAmt: string /** Số tiền phí tối đa **/;
    feeRate: string /** Tỷ lệ phí **/;
    advancedMinAmt: string /** Số tiền ứng trước tối thiểu **/;
    advancedMaxAmt: string /** Số tiền tối đa ứng một lần **/;
    autoAdvance: string /** Tự động ứng trước **/;
  };
}

const getAccountInfoForAdvance: (
  params: ISVGetAccountInfoForAdvance.Params
) => Promise<
  Data.AxiosResponse<ISVGetAccountInfoForAdvance.Response>
> = async ({ accountId }) => {
  try {
    const res = await api.authenOpenApi<ISVGetAccountInfoForAdvance.Response>(
      `/tran/accounts/${accountId}/infoForAdvance`
    );
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

const getAccountSuperVip = async () => {
  try {
    const transtime = Date.now();
    const url = `/customer/api/v2/customer-info/get-super-vip?transtime=${transtime}`;
    const res = await api.authenSAS.get(url);
    return res;
  } catch (error) {}
};

const checkPrimeClub = async ({
  token,
  ...params
}: {
  via: "Buddy" | "BuddyPro" | "WTSP" | "WTSP_BR" | "WTSP_PERIODIC";
  token?: string;
}) => {
  try {
    const url = `/customer/api/v2/customer-prime/check-prime-club`;
    const res = await api.unAuthenSAS.get(url, {
      params,
      headers: { Authorization: "Bearer " + token }
    });
    return res;
  } catch (error) {}
};

const getAccountBankBalance = async ({ accountId }: { accountId: string }) => {
  try {
    const url = `/accounts/${accountId}/bankBalance`;
    const res = await api.authenOpenApi.get(url);
    return { data: res.data, status: "success" };
  } catch (error) {
    return {
      status: "error",
      message: "error"
    };
  }
};

const accountService = {
  getAccountList,
  getAccountInfo,
  forgotPassword,
  changePassword,
  changePasswordAndPin,
  getSecutitiesPortfolio,
  getReportLoanList,
  getAccountAsset,
  getRightOffList,
  getAccountInfoForAdvance,
  getSummaryAccount,
  getAccountSuperVip,
  getInfoSubAccount,
  getAccountBankBalance,
  getBrAccountAsset,
  getBrInfoAsset,
  checkPrimeClub
};

export default accountService;
