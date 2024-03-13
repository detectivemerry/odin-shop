import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/app/lib/database"
import bcrypt from 'bcrypt';

const authOptions = {
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
        email: { label: "Email", type: "text", placeholder: "jsmith@email.com", value : "jsmith@email.com"},
        password: { label: "Password", type: "password", value : "1234"},
      },
      async authorize(credentials) {
       //  const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        let conn;
        try {
          conn = await pool.getConnection();
          const query = "SELECT * FROM users WHERE email = ?"
          const [user] = await conn.query(query, credentials?.email);
          conn.release()

          if(!user){
            return null
          } 

          const passwordMatch = await bcrypt.compare(credentials?.password, user.password)
          if(passwordMatch) return user
        
          return null
        }
        catch(error){
          console.error(error)
        }
        finally{
          if(conn) conn.end();
          //if(pool) pool.end();
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
    jwt : ({token, user}) => { //called when JWT session is used AND when routes ./signin, ./session and functions useSession(), etc are called
      if(user){ 
        token.id = user.user_id // persisting userid in token right after user logs in
        token.username = user.username
      }
      return token
    },
    session: ({ session, token }) => { // called when functions useSession(), getSession and route ./session is 
      // it is {session, token} when JWT payload is provided
      // it is {session, user} when database sessions are used and user object is passed as arguement

      if(token){
        session.id = token.id // send properties (user.id for our case) to users 
        session.username = token.username
      }
      return session;
    }
  },
};

const handler =  NextAuth(authOptions)
export { handler as GET, handler as POST}


