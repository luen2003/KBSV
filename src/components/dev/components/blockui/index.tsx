import { useState } from "react";

import BlockUi from "@availity/block-ui";
import { Buttons, Input, Spinner } from "@components/common";
import { removeEnterKeyDown, timeout } from "@helpers/utils";
import { ErrorMessage, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

const BlockUIDev = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const initValuesForm = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    currentPin: "",
    newPin: "",
    confirmNewPin: ""
  };
  const handleSubmitForm = async () => {
    setLoading(true);
    await timeout(50000);
    setLoading(false);
  };
  return (
    <div>
      <Formik initialValues={initValuesForm} onSubmit={handleSubmitForm}>
        {(props) => {
          const { values, handleChange, handleBlur, isValid } = props;
          return (
            <Form onKeyDown={removeEnterKeyDown}>
              <BlockUi blocking={loading} loader={<Spinner />}>
                <div className="px-6 py-5 border-y-[0.0625rem] border-gray-007">
                  <div>
                    <div className="text-[0.875rem]">{`${t(
                      "loginPopup:changePassword"
                    )}`}</div>
                    <div className="text-gray-011 text-[0.875rem] text-justify my-3">{`${t(
                      "loginPopup:notiChangePassword"
                    )}`}</div>
                    <div className="flex flex-col gap-2">
                      <Input
                        name="currentPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.currentPassword}
                        placeholder={`${t("loginPopup:currentPassword")}`}
                        classNames={{ wrap: "w-full", eye: "text-gray-009" }}
                        iconRight
                      />
                      <ErrorMessage
                        component="div"
                        className="input-feedback text-color-red text-[0.75rem]"
                        name="currentPassword"
                      />
                      <Input
                        name="newPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPassword}
                        placeholder={`${t("loginPopup:newPassword")}`}
                        classNames={{
                          wrap: "w-full",
                          eye: "text-gray-009"
                        }}
                        iconRight
                      />
                      <ErrorMessage
                        component="div"
                        className="input-feedback text-color-red text-[0.75rem]"
                        name="newPassword"
                      />
                      <Input
                        name="confirmNewPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmNewPassword}
                        placeholder={`${t("loginPopup:confirmNewPassword")}`}
                        classNames={{ wrap: "w-full", eye: "text-gray-009" }}
                        iconRight
                      />
                      <ErrorMessage
                        component="div"
                        className="input-feedback text-color-red text-[0.75rem]"
                        name="confirmNewPassword"
                      />
                    </div>
                  </div>
                </div>
                <div className="py-5 px-6 flex justify-between">
                  <Buttons
                    aria-hidden
                    className="w-full mr-3"
                    size="L"
                    prop="Filled 1"
                    type="submit"
                    disabled={!isValid}
                  >{`${t("board:confirm")}`}</Buttons>
                </div>
              </BlockUi>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const renderSource = ``;

const iProps = ``;

const bockui = { ui: <BlockUIDev />, renderSource, iProps };

export default bockui;
