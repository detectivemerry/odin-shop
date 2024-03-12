import pool from "@/app/lib/database"
import { NextResponse } from "next/server"
import { isValidEmail } from "@/app/lib/validation"

export async function POST(req, res){
    const data = await req.json() // {email : 'asd', password : 'asds'}
    
    if(!isValidEmail(data.email)){
        return NextResponse.json({errorMessage : "Please enter a valid email"}, {status : 403})
    }
    try {
        const conn = await pool.getConnection();
        await conn.query(`INSERT INTO users (password, email) VALUES (${data.password}, ${data.email})`)
        conn.release();
        return NextResponse.json({status : 200})
    }
    catch (error){
        return NextReponse.json({errorMessage : error}, {status : 403})
    }
    finally{
        if(conn){
            conn.close();
        }
    }
}