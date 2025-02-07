import {
  FilterDatePicker,
  FilterDropdown,
  FilterInput,
  GridTable
} from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import {
  getTempBankConfigDataTable,
  getBankMaster
} from "@services/BankService";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Button, Tag, Spin, Row, Col } from "antd";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { BankConfigStatus } from "@constants/BankConfigStatus";
import { BankConfigUpdate } from "./update";
import { BankConfigDetail } from "./detail";
import "antd/dist/reset.css";
import { TransferChannel } from "@constants/TransferChannel";
import { formatNumberWithCommas } from "@helpers/utils";
import { Edit2, Eye } from "iconsax-react";
import { useAppSelector } from "@hooks/useStore";
import { TableParam2BackendQuery } from "@components/common/Table/interface/TableParam2BackendQuery";

export const BankConfigIndex = () => {
  const permissions = useAppSelector((state) => state.common.permissions);
  const { t } = useTranslation();
  const tableRef = useRef<any>(null);
  const [banks, setBanks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);
  const [isOpenDetailForm, setIsOpenDetailForm] = useState(false);
  const [selectedBankConfig, setBankConfig] = useState<any>(null);

  const initMasterData = async () => {
    try {
      const banksMaster: any = await getBankMaster();
      setBanks(banksMaster.value);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initMasterData();
  }, []);

  const columns: any[] = [
    {
      title: "",
      dataIndex: "action",
      key: "action",
      fixed: "left",
      width: "70px",
      render: (text: string, record: any) => {
        return (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={4}>
              <Button
                style={{ padding: 4 }}
                onClick={() => {
                  setBankConfig(null);
                  setBankConfig(record);
                  setIsOpenDetailForm(true);
                }}
                type="text"
              >
                <Eye size="20" className="text-color-grey" />
              </Button>
            </Col>
            {permissions?.includes("UPDATE") ? (
              record.status == BankConfigStatus.COMPLETED && (
                <Col span={4}>
                  <Button
                    style={{ padding: 0 }}
                    onClick={() => {
                      setBankConfig(null);
                      setBankConfig(record);
                      setIsOpenUpdateForm(true);
                    }}
                    type="text"
                  >
                    <Edit2 size="20" className="text-color-grey" />
                  </Button>
                </Col>
              )
            ) : (
              <> </>
            )}
          </Row>
        );
      }
    },
    {
      title: t("bank:status"),
      dataIndex: "status",
      key: "status",
      sorter: true,
      filterable: true,
      fixed: true,
      width: "140px",
      render: (text: string, record: any) => {
        switch (text) {
          case BankConfigStatus.COMPLETED:
            return t("bank:approveStatus:completed");
          case BankConfigStatus.WAITING_APPROVAL_EDIT:
            return t("bank:approveStatus:waitingApprovalEdit");
          case BankConfigStatus.REJECT:
            return t("bank:approveStatus:rejected");
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            {
              value: BankConfigStatus.COMPLETED,
              label: (
                <Tag color="green">{t("bank:approveStatus:completed")}</Tag>
              )
            },
            {
              value: BankConfigStatus.WAITING_APPROVAL_EDIT,
              label: (
                <Tag color="orange">
                  {t("bank:approveStatus:waitingApprovalEdit")}
                </Tag>
              )
            },
            {
              value: BankConfigStatus.REJECT,
              label: <Tag color="red">{t("bank:approveStatus:rejected")}</Tag>
            }
          ]}
        />
      )
    },
    {
      title: t("bank:bankNo"),
      dataIndex: "bank.bankNo",
      key: "bank.bankNo",
      width: "150px",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => _.get(record, "bank.bankNo"),
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput
          column={column}
          confirm={confirm}
          ref={ref}
          type={"number"}
        />
      )
    },
    {
      title: t("bank:name"),
      dataIndex: "bankId",
      key: "bankId",
      sorter: true,
      filterable: true,
      width: "155px",
      ellipsis: true,
      render: (text: string, record: any) => _.get(record, "bank.name"),
      renderFilter: ({ column, confirm, ref }: any) => {
        const options = (banks || []).map((bank) => ({
          value: bank.id,
          label: bank.name
        }));
        return (
          <FilterDropdown
            column={column}
            confirm={confirm}
            ref={ref}
            options={options}
          />
        );
      }
    },
    {
      title: t("bank:isSupportTransfer"),
      dataIndex: "isSupportTransfer",
      key: "isSupportTransfer",
      sorter: true,
      filterable: true,
      width: "170px",
      render: (val: number, record: any) => {
        if (val) return t("bank:isSupportTransferValue.yes");
        else return t("bank:isSupportTransferValue.no");
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            {
              value: 0,
              label: (
                <Tag color="magenta">{t("bank:isSupportTransferValue.no")}</Tag>
              )
            },
            {
              value: 1,
              label: (
                <Tag color="green">{t("bank:isSupportTransferValue.yes")}</Tag>
              )
            }
          ]}
        />
      )
    },
    {
      title: t("bank:bankCode"),
      dataIndex: "bank.bankCode",
      key: "bank.bankCode",
      width: "150px",
      sorter: true,
      filterable: true,
      render: (text: string, record: any) => _.get(record, "bank.bankCode"),
      renderFilter: ({ column, confirm, ref }: any) => {
        const options = (banks || []).map((bank) => ({
          value: bank.bankCode,
          label: bank.bankCode
        }));
        return (
          <FilterDropdown
            column={column}
            confirm={confirm}
            ref={ref}
            options={options}
          />
        );
      }
    },
    {
      title: t("bank:isNapasTransfer"),
      dataIndex: "bank.isNapasTransfer",
      key: "bank.isNapasTransfer",
      sorter: true,
      filterable: true,
      width: "145px",
      render: (val: number, record: any) => {
        if (_.get(record, "bank.isNapasTransfer")) return t("common:yes");
        else return t("common:no");
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            { value: 0, label: <Tag color="magenta">{t("common:no")}</Tag> },
            { value: 1, label: <Tag color="green">{t("common:yes")}</Tag> }
          ]}
        />
      )
    },
    {
      title: t("bank:isCitadTransfer"),
      dataIndex: "bank.isCitadTransfer",
      key: "bank.isCitadTransfer",
      sorter: true,
      filterable: true,
      width: "140px",
      render: (val: number, record: any) => {
        if (_.get(record, "bank.isCitadTransfer")) return t("common:yes");
        else return t("common:no");
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            { value: 0, label: <Tag color="magenta">{t("common:no")}</Tag> },
            { value: 1, label: <Tag color="green">{t("common:yes")}</Tag> }
          ]}
        />
      )
    },
    {
      title: t("bank:transferWay"),
      dataIndex: "transferChannel",
      key: "transferChannel",
      sorter: true,
      filterable: true,
      width: "185px",
      render: (val: number, record: any) => {
        switch (val) {
          case TransferChannel.ALL:
            return t("bank:transferChannel:all");
          case TransferChannel.CITAD:
            return t("bank:transferChannel:citad");
          case TransferChannel.NAPAS:
            return t("bank:transferChannel:napas");
          default:
            return "";
        }
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            {
              value: 0,
              label: <Tag color="green">{t("bank:transferChannel:all")}</Tag>
            },
            {
              value: 1,
              label: (
                <Tag color="magenta">{t("bank:transferChannel:citad")}</Tag>
              )
            },
            {
              value: 2,
              label: <Tag color="orange">{t("bank:transferChannel:napas")}</Tag>
            }
          ]}
        />
      )
    },
    {
      title: t("bank:active"),
      dataIndex: "active",
      key: "active",
      sorter: true,
      filterable: true,
      width: "170px",
      render: (val: number, record: any) => {
        if (val) return t("bank:heath:active");
        else return t("bank:heath:inactive");
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterDropdown
          column={column}
          confirm={confirm}
          ref={ref}
          options={[
            {
              value: 0,
              label: <Tag color="magenta">{t("bank:heath:inactive")}</Tag>
            },
            {
              value: 1,
              label: <Tag color="green">{t("bank:heath:active")}</Tag>
            }
          ]}
        />
      )
    },
    {
      title: t("bank:withdrawAccountNumber"),
      dataIndex: "withdrawAccountNumber",
      key: "withdrawAccountNumber",
      sorter: true,
      filterable: true,
      width: "190px",
      align: "center"
    },
    {
      title: t("bank:depositAccountNumber"),
      dataIndex: "depositAccountNumber",
      key: "depositAccountNumber",
      sorter: true,
      filterable: true,
      width: "195px",
      align: "center"
    },
    {
      title: t("bank:maxNapas"),
      dataIndex: "maxNapas",
      key: "maxNapas",
      sorter: true,
      filterable: true,
      width: "175px",
      align: "right",
      render: (val: number, record: any) => {
        return formatNumberWithCommas(val);
      },
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput
          column={column}
          confirm={confirm}
          ref={ref}
          type={"number"}
        />
      )
    },
    {
      title: t("bank:description"),
      dataIndex: "description",
      key: "description",
      sorter: true,
      filterable: true,
      width: "400px",
      render: (text: string) => (
        <div
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            width: "100%"
          }}
        >
          {text}
        </div>
      )
    }
  ];

  const fetchData = async (params: TableParam2BackendQuery) => {
    const data: any = await getTempBankConfigDataTable(params);
    console.log(data);
    return data;
  };

  const reloadTable = () => {
    if (tableRef) {
      return tableRef.current.reload();
    }
  };
  if (isLoading) return <Spin />;
  return (
    <div className="container mx-auto">
      <BankConfigUpdate
        isOpen={isOpenUpdateForm}
        setOpen={setIsOpenUpdateForm}
        id={isOpenUpdateForm ? selectedBankConfig?.id : null}
        reloadTable={reloadTable}
      />
      <BankConfigDetail
        isOpen={isOpenDetailForm}
        setOpen={setIsOpenDetailForm}
        id={isOpenDetailForm ? selectedBankConfig?.id : null}
      />
      <GridTable
        ref={tableRef}
        columns={columns}
        fetchData={fetchData}
        addIndexCol={true}
        className="px-6 py-6 border-b-gray-010"
        onRow={(record: any) => ({
          onDoubleClick: () => {
            setBankConfig(null);
            setBankConfig(record);
            setIsOpenDetailForm(true);
          } // Mở modal detail khi click vào hàng
        })}
      />
    </div>
  );
};
