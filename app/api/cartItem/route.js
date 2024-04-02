import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import DBConfig from "@/app/lib/DBConfig";
const mariadb = require('mariadb')

export async function DELETE(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await mariadb.createConnection(DBConfig)
        let query = "DELETE FROM cart_items WHERE product_id=? AND user_id=?";
        const response = await conn.query(query, [product_id, session.id]);

        if(response.affectedRows == 1)
            return NextResponse.json({message : "Successful delete"}, {status : 200})
        else
            return NextResponse.json({errorMessage : "Product id and user id pair not found"}, {status :404})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({errorMessage : "Delete query was not successful"}, {status : 410})
    }
    finally{
        if(conn)conn.end();
    }
}

export async function PATCH(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const newQuantity = await req.json()
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await mariadb.createConnection(DBConfig)
        let query = "UPDATE cart_items SET quantity =? WHERE product_id=? AND user_id=?";
        const response = await conn.query(query, [newQuantity, product_id, session.id]);
        if(response.affectedRows == 1)
            return NextResponse.json({message : "Successful update"}, {status : 200})
        else
            return NextResponse.json({errorMessage : "Product id and user id pair not found"}, {status :404})
    }
    catch(error){
        return NextResponse.json({errorMessage : "Update query was not successful"}, {status : 410})
    }
    finally{
        if(conn) conn.end();
    }
}

export async function POST(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const newQuantity = await req.json()
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await mariadb.createConnection(DBConfig)
        let query = " INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?,?,?)";
        const response = await conn.query(query, [session.id, product_id, newQuantity]);
        if(response.affectedRows == 1)
            return NextResponse.json({message : "Successfully added cart item"}, {status : 200})
        else
            return NextResponse.json({errorMessage : "Product id and user id pair not found"}, {status :404})
    }
    catch(error){
        console.log(error)
        return NextResponse.json({errorMessage : "Insert query was not successful"}, {status : 410})
    }
    finally{
        if(conn) conn.end();
    }
}
