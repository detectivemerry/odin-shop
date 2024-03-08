
// using default next-auth options AKA if not authorized, cannot access any pages that matches with config
// export { default } from "next-auth/middleware"

// Match with pages that needs to run middleware
//export const config = {
    //matcher : ["/Checkout"]
//}

import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req){
        // Execute middleware logic
        //console.log(req.nextauth.token)I
    },
    {
        callbacks : {
            authorized({token, req}){
                switch (req.nextUrl.pathname) {
                    case "/Checkout":
                      return !!token // Only require authentication
                    case "/admin":
                      return token?.role === "admin" // Require authorization
                    case "/":
                    default:
                      return true // Bypass auth for these routes
                  }
            },
        },
    }
)
