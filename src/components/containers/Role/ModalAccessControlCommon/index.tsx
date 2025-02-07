import React from "react";

import { Button, Modal, Row } from "antd";
import { useTranslation } from "react-i18next";

interface IModalAccessControlProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  width: number;
  isUpdate: boolean;
  children: React.ReactNode;
  handleConfirm: () => void;
}

function ModalAccessControlCommon(props: IModalAccessControlProps) {
  const { isOpen, setIsOpen, title, width, children, handleConfirm, isUpdate } = props;
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        title={title}
        open={isOpen}
        onOk={() => { }}
        onCancel={() => {
          setIsOpen(false);
        }}
        width={width}
        footer={[]}
        styles={{
          header: {
            padding: "15px",
            borderBottom: "1px solid #EAECF0",
            margin: 0
          },
          content: {
            padding: 0,
          }
        }}
      >
        {children}
        <Row className="flex justify-end pb-5 px-3">
          <Button size="middle" onClick={() => setIsOpen(false)}>{t("button:close")}</Button>
          {isUpdate && <Button size="middle" className="bg-color-blue ms-4 text-gray-001" onClick={handleConfirm}>
            {t("button:confirm")}
          </Button>}

        </Row>
      </Modal>
    </div>
  );
}

export default ModalAccessControlCommon;
