export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", '/allUsers/:path*', '/allTransations/:path*', '/createTransaction/:path*', '/createUsers/:path*',
  '/deactivatedUsers/:path*', '/detailtransaction/:path*', '/editUser/:path*'],
};

