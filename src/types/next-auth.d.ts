import 'next-auth';

declare module "next-auth" {
  interface Session {
    user: {
      user: {
          username: string;
          roleId: number,
          name: string
      },
      token: string,
    }
  }
}