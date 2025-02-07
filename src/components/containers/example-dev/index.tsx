import { useEffect, useRef, useState } from "react";

import { GridTable } from "@components/common/Table";
import { Button, Input, InputNumber, Modal, Space } from "antd";
import { ErrorMessage, Form, Formik } from "formik";
import { Trash } from "iconsax-react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
export interface IAccItem {
  id: number;
  name: string;
  depart: string;
}
function Example() {
  const { t } = useTranslation();
  const tableRef: any = useRef(null);
  const formikRef: any = useRef();
  const initValueAddAcc = {
    id: 0,
    name: "",
    depart: ""
  };
  const [accList, setAccList] = useState<IAccItem[]>([
    {
      id: 1,
      name: "Lan Anh",
      depart: "Dev"
    }
  ]);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [isAddAcc, setIsAddAcc] = useState<boolean>(false);
  const [initValueUpdateAcc, setInitValueUpdateAcc] =
    useState<IAccItem>(initValueAddAcc);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Bộ phận",
      dataIndex: "depart",
      key: "depart"
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (text: any, record: IAccItem) => (
        <Space size="middle">
          <a
            onClick={() => {
              setIsUpdate(true);
              setInitValueUpdateAcc(record);
            }}
          >
            Update
          </a>
          <a
            onClick={() => {
              const accListTmp = [...accList];
              const newListAcc = accListTmp.filter(
                (item) => item.id !== record.id
              );
              setAccList(newListAcc);
            }}
          >
            <Trash />
          </a>
        </Space>
      )
    }
  ];

  const validationSchema = Yup.object().shape({
    id: Yup.number()
      .min(1, "Mã nhân viên lớn hơn 1")
      .required("Mã nhân viên không thể để trống"),
    name: Yup.string().required("Tên người dùng không thể để trống"),
    depart: Yup.string().required("Bộ phận làm việc không thể để trống")
  });

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current?.reload();
    }
  }, [accList]);

  const fetchData = async () => {
    return {
      items: accList,
      rows: 20,
      total: accList?.length,
      first: 0
    };
  };

  return (
    <div>
      <div className="px-4 py-2 uppercase text-base border border-b-gray-010">
        Danh sách tài khoản
      </div>
      <div className="p-4">
        <Button
          type="primary"
          className="text-gray-013 bg-color-blue mb-3"
          onClick={() => setIsAddAcc(true)}
        >
          + Thêm tài khoản
        </Button>
        <div>
          <GridTable
            ref={tableRef}
            columns={columns}
            fetchData={fetchData}
            addIndexCol={true}
          />
        </div>
        {/* Modal add acc */}
        <Modal
          title="Thêm tài khoản"
          open={isAddAcc}
          onOk={() => {}}
          onCancel={() => {
            setIsAddAcc(false);
            formikRef.current?.resetForm();
          }}
          width={754}
          footer={[]}
        >
          <Formik
            initialValues={initValueAddAcc}
            validationSchema={validationSchema}
            onSubmit={(value: IAccItem) => {
              setAccList((prev) => [...prev, value]);
              setIsAddAcc(false);
            }}
            innerRef={formikRef}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="">
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label className="w-2/3">
                        <span className="text-red-600 me-1">*</span>
                        Mã người dùng
                      </label>
                      <Input
                        type="number"
                        name="id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.id ? values.id : ""}
                      />
                    </div>
                    <ErrorMessage
                      className="text-color-red flex items-end justify-end"
                      name="id"
                      component="div"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label className="w-2/3">
                        <span className="text-red-600 me-1">*</span>
                        Tên đăng nhập
                      </label>
                      <Input
                        type="name"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    <ErrorMessage
                      className="text-color-red flex items-end justify-end"
                      name="name"
                      component="div"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <label className="w-2/3">
                        <span className="text-red-600 me-1">*</span>
                        Bộ phận
                      </label>
                      <Input
                        type="depart"
                        name="depart"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.depart}
                      />
                    </div>
                    <ErrorMessage
                      className="text-color-red flex items-end justify-end"
                      name="depart"
                      component="div"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      className="border w-[150px] py-1 rounded me-4"
                      onClick={() => {
                        setIsAddAcc(false);
                      }}
                      type="reset"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="text-gray-013 bg-color-blue w-[150px] py-1 rounded"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
        {/* Modal update acc */}
        <Modal
          title="Thêm tài khoản"
          open={isUpdate}
          onOk={() => {}}
          onCancel={() => setIsUpdate(false)}
          width={754}
          footer={[]}
        >
          <Formik
            initialValues={initValueUpdateAcc}
            //   validationSchema={validationSchema}
            onSubmit={(value: IAccItem) => {
              const accListTmp = [...accList];
              const idx = accListTmp.findIndex((item) => item.id === value.id);
              if (idx >= 0) {
                accListTmp[idx] = {
                  id: value.id,
                  name: value.name,
                  depart: value.depart
                };
                setAccList(accListTmp);
                setIsUpdate(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className="">
                  <div className="flex items-center justify-between mb-6">
                    <label className="w-2/3">
                      <span className="text-red-600 me-1">*</span>
                      Mã người dùng
                    </label>
                    <Input
                      readOnly
                      type="id"
                      name="id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.id ? values.id : ""}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="w-2/3">
                      <span className="text-red-600 me-1">*</span>
                      Tên đăng nhập
                    </label>
                    <Input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="w-2/3">
                      <span className="text-red-600 me-1">*</span>
                      Bộ phận
                    </label>
                    <Input
                      type="depart"
                      name="depart"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.depart}
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={(e) => {
                        setIsUpdate(false);
                      }}
                      className="border w-[150px] py-1 rounded me-4"
                    >
                      Đóng
                    </button>
                    <button
                      type="submit"
                      className="text-gray-013 bg-color-blue w-[150px] py-1 rounded"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      </div>
    </div>
  );
}

export default Example;
