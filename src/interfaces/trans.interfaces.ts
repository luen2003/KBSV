export declare namespace TransTypes {
  interface TBankAccount {
    uuid: string;
    createdAt: string;
    accNo: string;
    state: number;
    id: number;
    cusId: string;
    custodyCode: string;
    custName: string;
    bankCode: string;
    branchCode: null;
    errorContent: null;
    expireTime: null;
  }
  type TAccount = "coSo" | "phaiSinh" | "broker";
}
