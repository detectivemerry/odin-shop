
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import DBConfig from "@/app/lib/DBConfig";
import { signOut } from "next-auth/react";
const mariadb = require('mariadb')

export const authOptions = {

  pages : {
    signIn : "/Login",
    signOut : "/SignOut",
    error : "/Login"
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@email.com"},
        password: { label: "Password", type: "password", value : "1234"},
      },
      async authorize(credentials) {
       //  const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        let conn;
        try {
          conn = await mariadb.createConnection(DBConfig);
          let query = "SELECT * FROM users WHERE email = ?"
          const [user] = await conn.query(query, credentials?.email);

          if(!user) return null
          //console.log("number of rounds used: ")
          //console.log(bcrypt.getRounds(user.password))
          const passwordMatch = await bcrypt.compare(credentials?.password, user.password)
          if(!passwordMatch) return null
          
          //retrieve cart items if user has cart
          query = "SELECT * FROM cart_items WHERE user_id = ?"
          const rows = await conn.query(query, user.user_id)
          
          user.cartItems = []
          rows.forEach((cartItem) => {
            user.cartItems.push(cartItem)
          })
          
          return user
        }
        catch(error){
          console.error(error)
        }
        finally{
          if(conn) conn.end();
        }
        
      },
    }),
  ],
  secret : process.env.AUTH_SECRET,
  // In general:
  // We can verify users wither through Tokens (Server verifying token for each request) or Sessions (Calling to database to verify sessionID each request)
  // In NextJS:
  // We are using JWT Session - Parts of a JWT Token stored in NextJS "Session"  
  // Usually can't access JWT token details from Javascript code, so we append information to session, which we can access from Javascript code
  session: {
    maxAge : 60 * 60
  },
  callbacks : {
    jwt : async ({token, user, trigger}) => { //called when JWT session is used AND when routes ./signin, ./session and functions useSession(), etc are called
      if(user){ 
        token.id = user.user_id // persisting userid in token right after user logs in
        token.username = user.username
        token.cartItems = user.cartItems
      }
      if(trigger === "update"){
        let conn;
        let cartItems = []
        try {
          conn = await mariadb.createConnection(DBConfig)
          //retrieve cart items
          let query = "SELECT * FROM cart_items WHERE user_id = ?"
          const rows = await conn.query(query, token.id)
          
          rows.forEach((cartItem) => {
            cartItems.push(cartItem)
          })
          token.cartItems = cartItems
        }
        catch(error){
          console.error(error)
        }
        finally{
          if(conn) conn.end();
        }
      }

      return token
    },
    session: ({ session, token }) => { // called when functions useSession(), getSession and route ./session is 
      // it is {session, token} when JWT payload is provided
      // it is {session, user} when database sessions are used and user object is passed as arguement
      if(token){
        session.id = token.id // send properties (user.id for our case) to users 
        session.username = token.username
        session.cartItems = token.cartItems
      }
      return session;
    }
  },
};