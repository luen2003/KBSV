import { useEffect, useMemo, useRef, useState } from "react";

import { FilterDropdown, FilterInput, GridTable } from "@components/common/Table";
import { paymentIdStatus } from "@constants/managePaymentId.constants";
import { formatCurrency } from "@helpers/utils";
import { type IBankInfo, getBankInfo } from "@services/common.service";
import managePaymentIdService, {
  type IParamAddPaymentId
} from "@services/managePaymentId.service";
import { Button, Spin, Tag } from "antd";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import ModalManagePaymentId from "./component/ModalManagePaymentId";
import { Eye } from "iconsax-react";
import { Plus, Trash2 } from "lucide-react";
import { useAppSelector } from "@hooks/useStore";
import { Btn } from "@components/common/Btn";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";

function ManagePaymentIdentification() {
  const permissions = useAppSelector(state => state.common.permissions);
  const { t } = useTranslation();
  const tableRef: any = useRef();
  const [bankInfo, setBankInfo] = useState<IBankInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddNew, setIsAddNew] = useState<boolean>(false);
  const [isViewDetail, setIsViewDetail] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [dataDetail, setDataDetail] = useState<IParamAddPaymentId>();

  const handleViewDetail = (record: any) => {
    setIsViewDetail(true);
    setDataDetail({
      bankId: `${record.bank.bankNo} - ${record.bank.name}`,
      amountMin: record.amountMin,
      amountMax: record.amountMax,
      description: record.description
    });
  };

  const handleDelete = (record: any) => {
    setIsDelete(true);
    setDataDetail({
      bankId: `${record.bank.bankNo} - ${record.bank.name}`,
      amountMin: record.amountMin,
      amountMax: record.amountMax,
      description: record.description,
      id: record.id
    });
  };

  const formatNumberWithCommas = (value: any) => {
    return new Intl.NumberFormat().format(value);
  };

  const columns = useMemo(
    () => [
      {
        dataIndex: "action",
        key: "action",
        fixed: "left",
        width: "70px",
        align: "right",
        render: (text: string, record: any) => {
          return (
            <div className="flex justify-between">
              <Button
                type="text"
                style={{ padding: 4 }}
                onClick={() => handleViewDetail(record)}
                className="text-color-grey"
              >
                <Eye size={20} />
              </Button>
              {
                permissions?.includes("APPROVE") ?
                  record.status == paymentIdStatus.COMPLETED && (
                    <Button
                      type="text"
                      style={{ padding: 4 }}
                      onClick={() => handleDelete(record)}
                      className="text-color-grey"
                    >
                      <Trash2 size={20} strokeWidth={1.5} />
                    </Button>
                  ) : <></>
              }
            </div>
          );
        }
      },
      {
        title: t("bank:status"),
        dataIndex: "status",
        key: "status",
        width: "190px",
        filterable: true,
        render: (text: string, record: any) => {
          switch (text) {
            case paymentIdStatus.COMPLETED:
              return t("bank:approveStatus:completed");
            case paymentIdStatus.WAITING_APPROVAL_CREATE:
              return t("managePaymentIdContent:status:waitingApprovalCreate");
            case paymentIdStatus.WAITING_APPROVAL_DELETE:
              return t("managePaymentIdContent:status:waitingApprovalDelete");
            case paymentIdStatus.DELETED:
              return t("managePaymentIdContent:status:delete");
            case paymentIdStatus.REJECTED:
              return t("managePaymentIdContent:status:rejected");
          }
        },
        renderFilter: ({ column, confirm, ref }: any) => (
          <FilterDropdown
            column={column}
            confirm={confirm}
            ref={ref}
            options={[
              {
                value: paymentIdStatus.COMPLETED,
                label: (
                  <Tag color="green">{t("bank:approveStatus:completed")}</Tag>
                )
              },
              {
                value: paymentIdStatus.WAITING_APPROVAL_CREATE,
                label: (
                  <Tag color="blue">
                    {t("managePaymentIdContent:status:waitingApprovalCreate")}
                  </Tag>
                )
              },
              {
                value: paymentIdStatus.WAITING_APPROVAL_DELETE,
                label: (
                  <Tag color="orange">
                    {t("managePaymentIdContent:status:waitingApprovalDelete")}
                  </Tag>
                )
              },
              {
                value: paymentIdStatus.DELETED,
                label: (
                  <Tag color="red">
                    {t("managePaymentIdContent:status:delete")}
                  </Tag>
                )
              },
              {
                value: paymentIdStatus.REJECTED,
                label: (
                  <Tag color="red">
                    {t("managePaymentIdContent:status:rejected")}
                  </Tag>
                )
              }
            ]}
          />
        )
      },
      {
        title: t("bank:bankNo"),
        dataIndex: "bank.noCodeShortName",
        key: "bank.noCodeShortName",
        width: "170px",
        filterable: true,
        ellipsis: true,
        sorter: true,
        render: (text: string, record: any) => _.get(record, "bank.noCodeShortName"),
        renderFilter: ({ column, confirm, ref }: any) => {
          const options = (bankInfo || []).map(bank => (
            { value: bank.id, label: bank.noCodeShortName }
          ));
          return (
            <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
            />
          )
        }
      },
      {
        title: t("managePaymentIdContent:minValue"),
        dataIndex: "amountMin",
        key: "amountMin",
        sorter: true,
        filterable: true,
        width: "182px",
        align: "right",
        render: (text: string, record: any) => {
          return formatCurrency(text, 0);
        },
        renderFilter: ({ column, confirm, ref }: any) => (
          <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
          />
        ),
      },
      {
        title: t("managePaymentIdContent:maxValue"),
        dataIndex: "amountMax",
        key: "amountMax",
        sorter: true,
        filterable: true,
        width: "182px",
        align: "right",
        render: (text: string, record: any) => {
          return formatCurrency(text, 0);
        },
        renderFilter: ({ column, confirm, ref }: any) => (
          <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
          />
        ),
      },
      {
        title: t("bank:description"),
        dataIndex: "description",
        key: "description",
        width: "400px",
        filterable: true,
        sorter: true,
        render: (text: string) => (
          <div style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            width: '100%',
          }}>
            {text}
          </div>
        )
      }
    ],
    [bankInfo]
  );

  const fetchBankInfor = async () => {
    const res = await getBankInfo();
    if (res.status === "success" && res.data.code === 0) {
      setBankInfo(res.data.value);
    }
    setIsLoading(false);
  };

  const fetchData = async (params: TableParam2BackendQuery) => {
    const data: any = await managePaymentIdService.getListManagePaymentId(params);
    return data;
  };

  const reloadTable = () => {
    if (tableRef) {
      return tableRef.current.reload();
    }
  };

  useEffect(() => {
    fetchBankInfor();
  }, []);

  if (isLoading) return <Spin />;
  return (
    <div>
      <div className="px-6 py-2 text-right">
        {
          permissions?.includes("CREATE") ?
            <Button
              type="primary"
              className="text-gray-013 bg-color-blue"
              onClick={() => setIsAddNew(true)}
            >
              <Plus />
              {t("button:create")}
            </Button> : <></>
        }

        <GridTable
          ref={tableRef}
          columns={columns}
          fetchData={fetchData}
          addIndexCol={true}
          className="py-2 border-b-gray-010"
          onRow={(record: any) => ({
            onDoubleClick: () => {
              handleViewDetail(record)
            }, // Mở modal detail khi click vào hàng
          })}
          scroll={{ y: '63vh' }}
        />
      </div>

      <ModalManagePaymentId
        isOpen={isAddNew}
        setIsOpen={setIsAddNew}
        banksInfo={bankInfo}
        reloadTable={reloadTable}
      />
      <ModalManagePaymentId
        isOpen={isViewDetail}
        setIsOpen={setIsViewDetail}
        reloadTable={reloadTable}
        isViewDetail={isViewDetail}
        dataDetail={dataDetail}
      />
      <ModalManagePaymentId
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        reloadTable={reloadTable}
        dataDetail={dataDetail}
        isDelete={isDelete}
      />
    </div>
  );
}

export default ManagePaymentIdentification;
