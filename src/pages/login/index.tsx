import { useState } from "react";

import BlockUi from "@availity/block-ui";
import { Spinner } from "@components/common";
import { setCookie } from "@helpers/login";
import { useAppDispatch } from "@hooks/useStore";
import { PATH_BASE, PATH_REQUEST_ORDER } from "@router/router.constants";
import loginService from "@services/login.service";
import {
  storeCommonUpdateAuth,
  storeUpdateAccountInfo
} from "@store/slices/commonSlice";
import { ErrorMessage, Form, Formik } from "formik";
import { Eye, EyeSlash, Lock1, Profile } from "iconsax-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ILoginSuccess } from "@services/login.service";

interface IFormLoginValue {
  username: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initValue: IFormLoginValue = {
    username: "user-sample",
    password: "123456"
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(1)
      .required(`${t("login:validateCurrentUsername")}`),
    password: Yup.string()
      .min(1)
      .required(`${t("login:validateCurrentPassword")}`)
  });

  const mockUsers = [
    { username: "user-kbsv", password: "123456" },
    { username: "user-admin", password: "123456" },
    { username: "user-sample", password: "123456" }
  ];

  const handleLogin = async (username: string, password: string) => {
    setLoading(true);

    // Tìm user trong danh sách mockUsers
    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("mockUsername", user.username);

      // Nếu tìm thấy user trong mockUsers, tạo dữ liệu đăng nhập giả lập
      const sampleAuthData: ILoginSuccess = {
        access_token: "access_token_123",
        expires_in: 3600,
        refresh_token: "refresh_token_123",
        refresh_token_expires_in: 7200,
        token_type: "Bearer",
        username: "admin",
        roles: ["ROLE_TEST_6", "LA_GROUP_1", "ROLE_ADMIN", "ROLE_TEST"]
      };

      dispatch(storeCommonUpdateAuth(sampleAuthData));
      setCookie("token:session", "on");
      setCookie("token:exprise", "on", sampleAuthData.expires_in);
      dispatch(storeUpdateAccountInfo({ username: user.username }));
      navigate(PATH_REQUEST_ORDER);
    } else {
      localStorage.removeItem("mockUsername");
      // Nếu không tìm thấy user trong mockUsers, gọi API để đăng nhập thật
      const data = await loginService.login(username, password);

      if (data && "access_token" in data) {
        dispatch(storeCommonUpdateAuth(data));
        setCookie("token:session", "on");
        setCookie("token:exprise", "on", data.expires_in);
        dispatch(storeUpdateAccountInfo({ username: data.username }));
        navigate(PATH_REQUEST_ORDER);
      } else if (data && "code" in data && data.code === -1) {
        toast.error(t("login:loginFailed") as string);
      }
    }

    setLoading(false);
  };

  const handleShowHideClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="overflow-hidden flex items-center h-full relative">
      <div>
        <img src="/login/login.png" />
      </div>
      <div className="flex flex-col flex-1 justify-between h-full">
        <BlockUi
          blocking={loading}
          className="h-full flex items-center justify-center flex-1"
          loader={<Spinner />}
        >
          <div className="w-3/5">
            <div className="flex flex-col flex-1 text-center mt-20 gap-2">
              <div>
                <h1 className="font-bold text-3xl text-gray-014">KB</h1>
              </div>
              <div className="pt-50px px-50px">
                <Formik
                  initialValues={initValue}
                  validationSchema={validationSchema}
                  onSubmit={(values: IFormLoginValue, { setSubmitting }) => {
                    handleLogin(values.username, values.password);
                    setSubmitting(false);
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
                        <div className="flex flex-col items-start">
                          <div className="flex w-full items-center pl-4 pr-2.5 py-2 rounded text-14px bg-transparent border border-gray-010 text-gray-012 placeholder-gray-012">
                            <Profile className="w-18px h-18px mr-1.5" />
                            <input
                              placeholder={t("login:userNamePlaceHoder")}
                              className="w-full flex-1 outline-none bg-transparent text-14px resize-none "
                              type="username"
                              name="username"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.username}
                            />
                          </div>
                          <ErrorMessage
                            className="text-color-red"
                            name="username"
                            component="div"
                          />
                          <div className="mt-16px flex w-full items-center pl-4 pr-2.5 py-2 rounded text-14px bg-transparent border border-gray-010 text-gray-012 placeholder-gray-012">
                            <Lock1 className="w-18px h-18px mr-1.5" />
                            <input
                              placeholder={t("login:passwordPlaceHoder")}
                              className="w-full flex-1 outline-none bg-transparent text-14px resize-none"
                              type={showPassword ? "text" : "password"}
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <div onClick={handleShowHideClick}>
                              {showPassword ? (
                                <Eye className="w-18px h-18px ml-1.5" />
                              ) : (
                                <EyeSlash className="w-18px h-18px ml-1.5" />
                              )}
                            </div>
                          </div>
                          <ErrorMessage
                            className="text-color-red"
                            name="password"
                            component="div"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="w-full h-38px mt-16px bg-color-primary text-color-Textbutton rounded hover:text-gray-013 font-medium"
                          type="submit"
                        >
                          {`${t("login:login")}`}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="mt-12px mb-50px flex flex-col items-center text-gray-014">
                <span>--Or--</span>
                <div
                  className="cursor-pointer border border-gray-010 w-fit px-3 py-1"
                  onClick={() => {}}
                >
                  KBS SSO
                </div>
              </div>
            </div>
          </div>
        </BlockUi>
        <div className="text-center text-14px mb-2">
          Copyright@KBSecurities 2022 | Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default Login;
