import { AccountBlackListIndex } from "@components/containers/AccountBlackList";
import { BalanceQueryIndex } from "@components/containers/BalanceQuery";
import { BankConfigIndex } from "@components/containers/BankConfig";
import { CitadAccountIndex } from "@components/containers/CitadAccount";
import { ErrorAccountingTransferIndex } from "@components/containers/ErrorAccountingTransfer";
import Example from "@components/containers/example-dev";
import { InternalTransferAccountIndex } from "@components/containers/InternalTransferAccount";
import ManagePaymentIdentification from "@components/containers/ManagePaymentIdentification";
import { ActionLog } from "@components/containers/monitor/action-log";
import { MonitorDepositConsumer } from "@components/containers/monitor/deposit-consumer";
import { TransferLog } from "@components/containers/monitor/transfer-log";
import { RequestOrder } from "@components/containers/RequestOrder";
import { RoleIndex } from "@components/containers/Role";
import { UncompletedWithdraw } from "@components/containers/UncompletedWithdraw";
import { UserIndex } from "@components/containers/user";
import type { IRoute } from "@interfaces/route";
import { Login, Main, NotFound } from "@pages";
import { WithdrawTransferIndex } from "@components/containers/TransferWithdraw";
import Dashboard from "@components/containers/Content/Dashboard";
import Manage from "@components/containers/Content/Manage";
import CheckEmployee from "@components/containers/Content/CheckEmployee";
import CheckNewEmployee from "@components/containers/Content/CheckNewEmployee";
import CheckOldEmployee from "@components/containers/Content/CheckOldEmployee";
import {
  PATH_BANK,
  PATH_BASE,
  PATH_LOGIN,
  PATH_NOT_FOUND,
  PATH_EXAMPLE_DEV,
  PATH_MANAGE_PAYMENT_IDENTIFICATION,
  PATH_INTERNAL_TRANSFER_ACCOUNT,
  PATH_BALANCE_QUERY,
  PATH_MONITOR_ACTIVITY_LOG,
  PATH_ERROR_ACCOUNTING_TRANSFER,
  PATH_REQUEST_ORDER,
  PATH_CITAD_ACCOUNT,
  PATH_MONITOR_TRANSFER_LOG,
  PATH_ACCOUNT_BLACKLIST,
  PATH_ROLE,
  PATH_USER,
  PATH_MONITOR_DEPOSIT_CONSUMER,
  PATH_WITHDRAW_REFUSED_BY_BANK,
  PATH_UNCOMPLETED_WITHDRAW,
  PATH_TRANSFER_DEPOSIT,
  PATH_WITHDRAW_TRANSFER,
  PATH_EXPORT_RECONCILIATION
} from "./router.constants";
import { TransferDeposit } from "@components/containers/TransferDeposit";
import { ReconciliationIndex } from "@components/containers/Reconciliation";

import { WithdrawRefusedByBankIndex } from "@components/containers/withdraw-refused-by-bank";
import { PermissionWrapper } from "@components/common/PermissionWrapper";

export const routesMain: IRoute[] = [
  {
    path: PATH_BASE,
    element: <div></div>
  },
  {
    path: PATH_BANK,
    element: (
      <PermissionWrapper key={PATH_BANK} children={<BankConfigIndex />} />
    )
  },
  {
    path: PATH_MANAGE_PAYMENT_IDENTIFICATION,
    element: (
      <PermissionWrapper
        key={PATH_MANAGE_PAYMENT_IDENTIFICATION}
        children={<ManagePaymentIdentification />}
      />
    )
  },
  {
    path: PATH_INTERNAL_TRANSFER_ACCOUNT,
    element: (
      <PermissionWrapper
        key={PATH_INTERNAL_TRANSFER_ACCOUNT}
        children={<InternalTransferAccountIndex />}
      />
    )
  },
  {
    path: PATH_BALANCE_QUERY,
    element: (
      <PermissionWrapper
        key={PATH_BALANCE_QUERY}
        children={<BalanceQueryIndex />}
      />
    )
  },
  {
    path: PATH_MONITOR_ACTIVITY_LOG,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_ACTIVITY_LOG}
        children={<ActionLog />}
      />
    )
  },
  {
    path: PATH_ERROR_ACCOUNTING_TRANSFER,
    element: (
      <PermissionWrapper
        key={PATH_ERROR_ACCOUNTING_TRANSFER}
        children={<ErrorAccountingTransferIndex />}
      />
    )
  },
  {
    path: PATH_REQUEST_ORDER,
    element: (
      <PermissionWrapper key={PATH_REQUEST_ORDER} children={<RequestOrder />} />
    )
  },
  {
    path: PATH_CITAD_ACCOUNT,
    element: (
      <PermissionWrapper
        key={PATH_CITAD_ACCOUNT}
        children={<CitadAccountIndex />}
      />
    )
  },
  {
    path: PATH_MONITOR_TRANSFER_LOG,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_TRANSFER_LOG}
        children={<TransferLog />}
      />
    )
  },
  {
    path: PATH_ACCOUNT_BLACKLIST,
    element: (
      <PermissionWrapper
        key={PATH_ACCOUNT_BLACKLIST}
        children={<AccountBlackListIndex />}
      />
    )
  },
  {
    path: PATH_ROLE,
    element: <PermissionWrapper key={PATH_ROLE} children={<RoleIndex />} />
  },
  {
    path: PATH_USER,
    element: <PermissionWrapper key={PATH_USER} children={<UserIndex />} />
  },
  {
    path: PATH_MONITOR_DEPOSIT_CONSUMER,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_DEPOSIT_CONSUMER}
        children={<MonitorDepositConsumer />}
      />
    )
  },
  {
    path: PATH_WITHDRAW_REFUSED_BY_BANK,
    element: (
      <PermissionWrapper
        key={PATH_WITHDRAW_REFUSED_BY_BANK}
        children={<WithdrawRefusedByBankIndex />}
      />
    )
  },
  {
    path: PATH_UNCOMPLETED_WITHDRAW,
    element: (
      <PermissionWrapper
        key={PATH_UNCOMPLETED_WITHDRAW}
        children={<UncompletedWithdraw />}
      />
    )
  },
  {
    path: PATH_TRANSFER_DEPOSIT,
    element: (
      <PermissionWrapper
        key={PATH_TRANSFER_DEPOSIT}
        children={<TransferDeposit />}
      />
    )
  },
  {
    path: PATH_WITHDRAW_TRANSFER,
    element: (
      <PermissionWrapper
        key={PATH_WITHDRAW_TRANSFER}
        children={<WithdrawTransferIndex />}
      />
    )
  },
  {
    path: PATH_EXPORT_RECONCILIATION,
    element: (
      <PermissionWrapper
        key={PATH_EXPORT_RECONCILIATION}
        children={<ReconciliationIndex />}
      />
    )
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/manage",
    element: <Manage />
  },
  {
    path: "/checkEmployee",
    element: <CheckEmployee />
  },
  {
    path: "/checkNewEmployee",
    element: <CheckNewEmployee />
  },
  {
    path: "/checkOldEmployee",
    element: <CheckOldEmployee />
  }
];

export const routes: IRoute[] = [
  {
    path: PATH_BASE,
    element: <Main />,
    children: routesMain,
    isNeedLogin: true
  },
  {
    path: PATH_NOT_FOUND,
    element: <NotFound />
  },
  {
    path: PATH_LOGIN,
    element: <Login />
  }
];
