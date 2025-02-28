import { PermissionWrapper } from "@components/common/PermissionWrapper";
import { AccountBlackListIndex } from "@components/containers/AccountBlackList";
import { BalanceQueryIndex } from "@components/containers/BalanceQuery";
import { BankConfigIndex } from "@components/containers/BankConfig";
import CheckEmployee from "@components/containers/CheckEmployee";
import CheckNewEmployee from "@components/containers/CheckNewEmployee";
import CheckOldEmployee from "@components/containers/CheckOldEmployee";
import { CitadAccountIndex } from "@components/containers/CitadAccount";
import Dashboard from "@components/containers/Dashboard";
import { ErrorAccountingTransferIndex } from "@components/containers/ErrorAccountingTransfer";
import Example from "@components/containers/example-dev";
import { InternalTransferAccountIndex } from "@components/containers/InternalTransferAccount";
import ManagePaymentIdentification from "@components/containers/ManagePaymentIdentification";
import Manage from "@components/containers/Manange";
import { ActionLog } from "@components/containers/monitor/action-log";
import { MonitorDepositConsumer } from "@components/containers/monitor/deposit-consumer";
import { TransferLog } from "@components/containers/monitor/transfer-log";
import { ReconciliationIndex } from "@components/containers/Reconciliation";
import { RequestOrder } from "@components/containers/RequestOrder";
import { RoleIndex } from "@components/containers/Role";
import { TransferDeposit } from "@components/containers/TransferDeposit";
import { WithdrawTransferIndex } from "@components/containers/TransferWithdraw";
import { UncompletedWithdraw } from "@components/containers/UncompletedWithdraw";
import { UserIndex } from "@components/containers/user";
import { WithdrawRefusedByBankIndex } from "@components/containers/withdraw-refused-by-bank";
import type { IRoute } from "@interfaces/route";
import { Login, Main, NotFound } from "@pages";

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

export const routesMain: IRoute[] = [
  {
    path: PATH_BASE,
    element: <div></div>
  },
  {
    path: PATH_BANK,
    element: (
      // eslint-disable-next-line react/no-children-prop
      <PermissionWrapper key={PATH_BANK} children={<BankConfigIndex />} />
    )
  },
  {
    path: PATH_MANAGE_PAYMENT_IDENTIFICATION,
    element: (
      <PermissionWrapper
        key={PATH_MANAGE_PAYMENT_IDENTIFICATION}
        // eslint-disable-next-line react/no-children-prop
        children={<ManagePaymentIdentification />}
      />
    )
  },
  {
    path: PATH_INTERNAL_TRANSFER_ACCOUNT,
    element: (
      <PermissionWrapper
        key={PATH_INTERNAL_TRANSFER_ACCOUNT}
        // eslint-disable-next-line react/no-children-prop
        children={<InternalTransferAccountIndex />}
      />
    )
  },
  {
    path: PATH_BALANCE_QUERY,
    element: (
      <PermissionWrapper
        key={PATH_BALANCE_QUERY}
        // eslint-disable-next-line react/no-children-prop
        children={<BalanceQueryIndex />}
      />
    )
  },
  {
    path: PATH_MONITOR_ACTIVITY_LOG,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_ACTIVITY_LOG}
        // eslint-disable-next-line react/no-children-prop
        children={<ActionLog />}
      />
    )
  },
  {
    path: PATH_ERROR_ACCOUNTING_TRANSFER,
    element: (
      <PermissionWrapper
        key={PATH_ERROR_ACCOUNTING_TRANSFER}
        // eslint-disable-next-line react/no-children-prop
        children={<ErrorAccountingTransferIndex />}
      />
    )
  },
  {
    path: PATH_REQUEST_ORDER,
    element: (
      // eslint-disable-next-line react/no-children-prop
      <PermissionWrapper key={PATH_REQUEST_ORDER} children={<RequestOrder />} />
    )
  },
  {
    path: PATH_CITAD_ACCOUNT,
    element: (
      <PermissionWrapper
        key={PATH_CITAD_ACCOUNT}
        // eslint-disable-next-line react/no-children-prop
        children={<CitadAccountIndex />}
      />
    )
  },
  {
    path: PATH_MONITOR_TRANSFER_LOG,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_TRANSFER_LOG}
        // eslint-disable-next-line react/no-children-prop
        children={<TransferLog />}
      />
    )
  },
  {
    path: PATH_ACCOUNT_BLACKLIST,
    element: (
      <PermissionWrapper
        key={PATH_ACCOUNT_BLACKLIST}
        // eslint-disable-next-line react/no-children-prop
        children={<AccountBlackListIndex />}
      />
    )
  },
  {
    path: PATH_ROLE,
    // eslint-disable-next-line react/no-children-prop
    element: <PermissionWrapper key={PATH_ROLE} children={<RoleIndex />} />
  },
  {
    path: PATH_USER,
    // eslint-disable-next-line react/no-children-prop
    element: <PermissionWrapper key={PATH_USER} children={<UserIndex />} />
  },
  {
    path: PATH_MONITOR_DEPOSIT_CONSUMER,
    element: (
      <PermissionWrapper
        key={PATH_MONITOR_DEPOSIT_CONSUMER}
        // eslint-disable-next-line react/no-children-prop
        children={<MonitorDepositConsumer />}
      />
    )
  },
  {
    path: PATH_WITHDRAW_REFUSED_BY_BANK,
    element: (
      <PermissionWrapper
        key={PATH_WITHDRAW_REFUSED_BY_BANK}
        // eslint-disable-next-line react/no-children-prop
        children={<WithdrawRefusedByBankIndex />}
      />
    )
  },
  {
    path: PATH_UNCOMPLETED_WITHDRAW,
    element: (
      <PermissionWrapper
        key={PATH_UNCOMPLETED_WITHDRAW}
        // eslint-disable-next-line react/no-children-prop
        children={<UncompletedWithdraw />}
      />
    )
  },
  {
    path: PATH_TRANSFER_DEPOSIT,
    element: (
      <PermissionWrapper
        key={PATH_TRANSFER_DEPOSIT}
        // eslint-disable-next-line react/no-children-prop
        children={<TransferDeposit />}
      />
    )
  },
  {
    path: PATH_WITHDRAW_TRANSFER,
    element: (
      <PermissionWrapper
        key={PATH_WITHDRAW_TRANSFER}
        // eslint-disable-next-line react/no-children-prop
        children={<WithdrawTransferIndex />}
      />
    )
  },
  {
    path: PATH_EXPORT_RECONCILIATION,
    element: (
      <PermissionWrapper
        key={PATH_EXPORT_RECONCILIATION}
        // eslint-disable-next-line react/no-children-prop
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
