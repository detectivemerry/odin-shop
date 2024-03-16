
// using default next-auth options AKA if not authorized, cannot access any pages that matches with config
// export { default } from "next-auth/middleware"

//export function middleware(){
    //const res = NextResponse.next()
    //res.headers.append('Access-Control-Allow-Credentials', "true")
    //res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    //res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    //res.headers.append(
        //'Access-Control-Allow-Headers',
        //'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    //)

    //return res
//}

// match with pages that needs to run middleware
export const config = {
    matcher : ["/api/:path*"]
}

import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

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
