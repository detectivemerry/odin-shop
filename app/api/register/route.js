import pool from "@/app/lib/database"
import { NextResponse } from "next/server"
import {isValidRegisterForm} from "@/app/lib/validation"
import bcrypt from 'bcrypt';

export async function POST(req, res){
    const data = await req.json() // {email : 'asd', password : 'asds'}

    if(isValidRegisterForm(data).length != 0){
        return NextResponse.json({errorMessage : "Validation failed, please ensure that username, password and email are valid."}, {status : 400})
    }

    let conn;
    try {
        conn = await pool.getConnection();
        // check if email and username alreayd exist in database
        let query = "SELECT * FROM users WHERE email = ? AND username = ?"
        const rows = await pool.query(query, [data.email, data.username]) 
        if(rows.length > 0) 
            return NextResponse.json({errorMessage : "Email or username already exists in database."}, {status : 409})
        
        // generate hash and salt for password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt)
        
        // add user to DB
        query  = "INSERT INTO users VALUES (DEFAULT, ?, ?, ?)"
        await conn.query(query, [data.username, hashedPassword, data.email])

        conn.release();
        return NextResponse.json({status : 200})
    }
    catch (error){
        console.log(error)
        return NextResponse.json({errorMessage : error.sqlMessage}, {status : 403})
    }
    finally{
        if(conn) 
            conn.end();
        //if(pool)
            //pool.end();
    }
}