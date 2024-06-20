export { default } from "next-auth/middleware";

//Protegemos rutas
// export const config = {
//   matcher: ['/dashboard/:path*']
// }

export const config = {
  matcher: ['/worldMap', '/grid']
}


