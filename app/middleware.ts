export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"],
};

// export const config = {
//   matcher: ["/dashboard/:path*", "/allUsers/:path*", "/createTransaction/:path*", "/createUsers/:path*", "/editTransaction/:path*", "/editUser/:path*", "/transactions/:path*",],
// };