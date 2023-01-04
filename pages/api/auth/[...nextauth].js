import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "/lib/mongodb"
import CredentialsProvider from "next-auth/providers/credentials"

/*CredentialsProvider({ 
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" } },
    async authorize(credentials, req) { const email = credentials.email;
       const password = credentials.password;
        const user = await Users.findOne({ email })
        if (!user) { throw new Error("You haven't registered yet") } 
        if (user) return signinUser({ password, user }) } })

        
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise)
})*/
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Cognito({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      domain: process.env.COGNITO_DOMAIN,
    })
  ],
  debug: process.env.NODE_ENV === 'development' ? true : false
})
