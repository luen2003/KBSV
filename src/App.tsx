import { useEffect } from "react";

import { AuthRoute, Fallback } from "@components/common";
import { useAppSelector } from "@hooks/useStore";
import { routes } from "@router/router.routes";
import { withErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

function AppRouter() {
  const theme = useAppSelector((state) => state.common.theme);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme.id);
  }, [theme]);
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          if (route.children) {
            return route.isNeedLogin ? (
              <Route
                element={<AuthRoute>{route.element}</AuthRoute>}
                key={route.path}
              >
                {route.children.map((child) => {
                  return child.isNeedLogin ? (
                    <Route
                      path={child.path}
                      element={<AuthRoute>{child.element}</AuthRoute>}
                      key={child.path}
                      index
                    />
                  ) : (
                    <Route
                      path={child.path}
                      element={child.element}
                      key={child.path}
                      index
                    />
                  );
                })}
              </Route>
            ) : (
              <Route element={route.element} key={route.path}>
                {route.children.map((child) => {
                  return child.isNeedLogin ? (
                    <Route
                      path={child.path}
                      element={<AuthRoute>{child.element}</AuthRoute>}
                      key={child.path}
                      index
                    />
                  ) : (
                    <Route
                      path={child.path}
                      element={child.element}
                      key={child.path}
                      index
                    />
                  );
                })}
              </Route>
            );
          }
          return route.isNeedLogin ? (
            <Route
              path={route.path}
              element={<AuthRoute>{route.element}</AuthRoute>}
              key={route.path}
              index
            />
          ) : (
            <Route
              path={route.path}
              element={route.element}
              key={route.path}
              index
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = withErrorBoundary(AppRouter, {
  FallbackComponent: Fallback,
  onError: (e) => {
    console.error("withErrorBoundary onError ========>", e);
  }
});

export default App;
