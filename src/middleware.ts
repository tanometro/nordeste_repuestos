export { default } from "next-auth/middleware";

export const config = {
  matcher: ['/allUsers/:path*', '/dashboard/:path*', '/createTransaction/:path*', '/createUsers/:path*', '/editTransaction/:path*', '/editUser/:path*', '/transactions/:path*'],
}
