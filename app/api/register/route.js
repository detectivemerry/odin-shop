import { NextResponse } from "next/server"
import {isValidRegisterForm} from "@/app/lib/validation"
import bcrypt from 'bcrypt';
import DBConfig from "@/app/lib/DBConfig";
const mariadb = require('mariadb')

export async function POST(req, res){
    const data = await req.json() // {email : 'asd', password : 'asds'}
    if(isValidRegisterForm(data).length != 0){
        return NextResponse.json({errorMessage : "Validation failed, please ensure that username, password and email are valid."}, {status : 400})
    }
    let conn;
    try {
        conn = await mariadb.createConnection(DBConfig)
        // check if email and username alreayd exist in database
        let query = "SELECT * FROM users WHERE lower(email) = ? OR lower(username) = ?"
        const rows = await conn.query(query, [data.email.toLowerCase(), data.username.toLowerCase()]) 

        if(rows.length > 0) 
            return NextResponse.json({errorMessage : "Email or username already exists in database."}, {status : 409})
        
        // generate hash and salt for password 
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(data.password, salt)
        
        // add user to DB
        query  = "INSERT INTO users(user_id, username, password, email) VALUES (DEFAULT, ?, ?, ?)"
        await conn.query(query, [data.username, hashedPassword, data.email])

        return NextResponse.json({status : 200})
    }
    catch (error){
        console.log(error)
        return NextResponse.json({errorMessage : error.sqlMessage}, {status : 500})
    }
    finally{
        if(conn) conn.end();
    }
}