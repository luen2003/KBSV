import {
  FilterDatePicker,
  FilterDropdown,
  FilterInput,
  GridTable
} from "@components/common/Table";
import FilterParam from "@components/common/Table/interface/FilterParam";
import { fetchActionLogs } from "@services/ActionLog";
import moment from "moment";
import { Spin, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { type Data } from "@types";
import "antd/dist/reset.css";
import Title from "antd/es/typography/Title";
import { getMenuMaster } from "@services/menu.service";
import { useEffect, useState } from "react";

export const ActionLog = () => {
  const { t } = useTranslation();
  const [menus, setMenus] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const initMasterData = async () => {
    try {
      const banksMaster: any = await getMenuMaster();
      setMenus(banksMaster.value);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    initMasterData();
  }, []);

  const columns: any[] = [
    {
      title: t("monitor:actionLog:uuid"),
      dataIndex: "id",
      key: "id",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "130px",
    },
    {
      title: t("monitor:actionLog:menu"),
      dataIndex: "menuId",
      key: "menuId",
      sorter: true,
      filterable: true,
      width: '120px',
      ellipsis: true,
      render: (text: string, record: any) => {
        const menuId = record.menuId;
        const menu = (menus || []).find(m => m.id === menuId);
        return menu ? menu.name : "";
      },
      renderFilter: ({ column, confirm, ref }: any) => {
        const options = (menus || []).map(menu => (
          { value: menu.id, label: menu.name }
        ));
        return (
          <FilterDropdown column={column} confirm={confirm} ref={ref} options={options}
          />
        )
      },
    },
    {
      title: t("monitor:actionLog:user"),
      dataIndex: "user",
      key: "user",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "150px",
    },
    {
      title: t("monitor:actionLog:action"),
      dataIndex: "action",
      key: "action",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "100px",
    },
    {
      title: t("monitor:actionLog:method"),
      dataIndex: "method",
      key: "method",
      sorter: true,
      filterable: true,
      width: "100px",
      render: (val: string, record: any) => {
        switch (val) {
          case "GET":
            return <Tag color="green">{t("monitor:actionLog:methodValue.get")}</Tag>;
          case "POST":
            return <Tag color="orange">{t("monitor:actionLog:methodValue.post")}</Tag>;
          case "PUT":
            return <Tag color="blue">{t("monitor:actionLog:methodValue.put")}</Tag>;
          case "PATCH":
            return <Tag color="purple">{t("monitor:actionLog:methodValue.patch")}</Tag>;
          case "DELETE":
            return <Tag color="red">{t("monitor:actionLog:methodValue.delete")}</Tag>;
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
              value: "GET",
              label: (
                <Tag color="green">{t("monitor:actionLog:methodValue.get")}</Tag>
              )
            },
            {
              value: "POST",
              label: (
                <Tag color="orange">{t("monitor:actionLog:methodValue.post")}</Tag>
              )
            },
            {
              value: "PATCH",
              label: (
                <Tag color="purple">{t("monitor:actionLog:methodValue.patch")}</Tag>
              )
            },
            {
              value: "PUT",
              label: (
                <Tag color="blue">{t("monitor:actionLog:methodValue.put")}</Tag>
              )
            },
            {
              value: "DELETE",
              label: (
                <Tag color="red">{t("monitor:actionLog:methodValue.delete")}</Tag>
              )
            }
          ]}
        />
      )
    },
    {
      title: t("monitor:actionLog:url"),
      dataIndex: "url",
      key: "url",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "250px",
    },
    {
      title: t("monitor:actionLog:timeExecution"),
      dataIndex: "timeExecution",
      key: "timeExecution",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "190px",
      align: "center",
      renderFilter: ({ column, confirm, ref }: any) => (
        <FilterInput column={column} confirm={confirm} ref={ref} type={"number"}
        />
      ),
    },
    {
      title: t("monitor:actionLog:ip"),
      dataIndex: "ip",
      key: "ip",
      sorter: true,
      filterable: true,
      fixed: "left",
      width: "100px",
    },
    {
      title: t("monitor:actionLog:createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      filterable: true,
      width: "150px",
      render: (text: string, record: any) =>
        text ? moment(text).format("YYYY-MM-DD HH:mm:ss") : "",
      renderFilter: ({ column, confirm, ref }: FilterParam) => (
        <FilterDatePicker column={column} confirm={confirm} ref={ref} />
      )
    }
  ];

  const fetchData = async (params: Data.IQueryParams) => {
    const data: any = await fetchActionLogs(params);
    return data;
  };

  if (isLoading) return <Spin />;
  return (
    <div className="container mx-auto">
      <Title level={4}>{t("menu:monitor:actionLog")}</Title>
      <GridTable
        columns={columns}
        fetchData={fetchData}
        addIndexCol={true}
        className="px-6 border-b-gray-010"
        scroll={{ y: '63vh' }}
      />
    </div>
  );
};
