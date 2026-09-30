import NextAuth, { DefaultSession ,user} from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface Session {
        user: {
            address: string
            role: string,
            name: string, 
            email: string,

        } & DefaultSession["user"]
    }
    interface User {

        user: {

            role: string,
            name: string,
            email: string,

        },
        token: string


    }


}

declare module "next-auth/jwt" {
  
  interface JWT extends user {
   




  
  }
}









