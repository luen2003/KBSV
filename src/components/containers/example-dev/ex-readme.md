I. Thêm menu
1. Thêm path vào file src\router\router.constants.ts
2. Thêm element vào routesMain (file: src\router\router.routes.tsx)
	{
    path: PATH_EXAMPLE_DEV,
    element: <Example />
  }
3.Thêm menu vào sidebar
- File: src\components\layout\components\RightSideBar\hooks\useRightSideBar.tsx
	{
        key: mId(),
        icon: <></>,
        iconActive: <></>,
        route: PATH_EXAMPLE_DEV,
        t: t("Develop")
      }
4. Tạo container trong folder: src\components\containers