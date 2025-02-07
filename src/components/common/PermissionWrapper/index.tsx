import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import permissionService from "@services/permission.service";
import { storePermissionsInMenu, storeSelectedMenu } from "@store/slices/commonSlice";
import { store } from "@store/store";
import { Button, Result, Spin } from "antd";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const PermissionWrapper = ({ children }: { children: JSX.Element }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<string[]>([]);
    // const menus = store.getState().common.menus || [];
    const menus = useAppSelector((state) => state.common.menus) || [];
    const state = useLocation();
    const dispatch = useAppDispatch();
    const initPermissionsData = async () => {
        setIsLoading(true);
        try {
            const menu = menus.find(m => m.href == state.pathname);
            if (menu) {
                let permissionData = await permissionService.getByMenuAndUser(menu.id);
                setPermissions(permissionData.map(p => p.code));
                dispatch(storePermissionsInMenu(permissionData.map(p => p.code)));
                dispatch(storeSelectedMenu(menu));
            }
        } catch (e) {

        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        initPermissionsData();
    }, [state.pathname, menus]);

    useEffect(() => {
        dispatch(storePermissionsInMenu([]));
    }, []);

    if (isLoading) return <Spin />;

    if (permissions.includes("VIEW") && children) {
        const child = React.cloneElement(children);
        return <>
            {child}
        </>;
    } else {
        // return <Result
        //     status="403"
        //     title="403"
        //     subTitle="Sorry, you are not authorized to access this page."
        //     extra={<Button type="primary">Back Home</Button>}
        // />
        return <></>
    }
}