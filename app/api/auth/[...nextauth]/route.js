import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/app/lib/database"

const authOptions = {

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
        password: { label: "Password", type: "password", value: "1234"},
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

        let conn;
        try {
          conn = await pool.getConnection();
          const query = "SELECT * FROM users WHERE email = ?"
          const [user] = await conn.query(query, credentials?.email);
          conn.release()

          if(user === null){
            throw new Error("Email does not exist");
          } 
          console.log(user)
          return user
          }
        catch(error){
          console.error(error)
        }
        
        return null
      
      },
    }),
  ],
  secret : process.env.AUTH_SECRET,
  // In general:
  // We can verify users wither through Tokens (Server verifying token for each request) or Sessions (Calling to database to verify sessionID each request)
  // In NextJS:
  // We are using JWT Session - Parts of a JWT Token stored in NextJS "Session"  
  // Usually can't access JWT token details from Javascript code, so we append information to session, which we can access from Javascript code

  callbacks : {
    jwt : ({ token, user}) => { //called when JWT session is used AND when routes ./signin, ./session and functions useSession(), etc are called
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


// Current situation: not sure if Next-Auth is integrated, going to localhost:3000/api/auth/signin returns 500 server internal error instead of credentials and google sign in page

// Currently I have a minimum set-up for Next-Auth, only having auth.js and route.js. In the future, look into callback and session in NextAuth()?
// protecting server and client components and middleware and database

//0. Tried following a tutorial with credentials provider but it was the wrong Next-Auth version, change a new tutorial
//1. Followed tutorial (with correct version for NextAuth) 100%, localhost:3000/api/auth/signin returns 500 server internal error
//2. Read Github thread, someone receiving error 404 in Nov 2023, said that NextAuth changing shit to fit new NextJS, redirected me back to offical documents
//3. Follow offical NextJS tutorial but it is too advanced, with a lot of moving parts
//4. Follow wint's github repo, back to same error in step 1.
//5. Found out at this version of Next-Auth is very buggy and had a 'r is not a function' bug. Going back to version 4.2 :-) wth man, it's probably from the export { handler AS POST } shit
//6. Let's follow along Next-Auth V4 getting started tutorial - nvm it is dog shit, example did not work - it did work after we export our handler cos our NextJS version was 13+ 

//0. researched on what JWT (JSON web tokens, stored in cookie, used to authorize), Session (database verify acc and returns a session ID, used for authentication) & Token Autentication are.
//1. researched about callbacks in NextAuth. Found out that they have their own 'session' that has nothing to do with DB. Explanation posted above 
//2. find out why homepage not loading after we changed our next.config.js - removed my client rendering logic and it worked.
//3. Link sign in with route and show something diff in nav bar if authenticated