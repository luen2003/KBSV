// import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

// import { cookies } from "@helpers/cookies";
// import { IUserToken } from "@interfaces/user";

// export default function withAuthentication(Component: any) {
//   const Auth = (props: any) => {
//     const token = cookies.get("token");

//     if (!token) {
//       return <Navigate to="/login" />;
//     }
//     if (token) {
//       const decode: IUserToken = jwtDecode(token);
//       if (decode.userId === null) {
//         return <Navigate to="/login" />;
//       }
//     }
//     return <Component {...props} />;
//   };
//   return Auth;
// }
