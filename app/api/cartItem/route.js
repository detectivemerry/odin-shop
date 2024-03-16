import { NextResponse } from "next/server"
import  pool  from "@/app/lib/database"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function DELETE(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await pool.getConnection();
        let query = "DELETE FROM cart_items WHERE product_id=? AND user_id=?";
        const response = await conn.query(query, [product_id, session.id]);
        conn.release();

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
        if(conn)
            conn.end();
    }
}

export async function PATCH(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const newQuantity = await req.json()
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await pool.getConnection();
        let query = "UPDATE cart_items SET quantity =? WHERE product_id=? AND user_id=?";
        const response = await conn.query(query, [newQuantity, product_id, session.id]);
        conn.release();
        if(response.affectedRows == 1)
            return NextResponse.json({message : "Successful update"}, {status : 200})
        else
            return NextResponse.json({errorMessage : "Product id and user id pair not found"}, {status :404})
    }
    catch(error){
        return NextResponse.json({errorMessage : "Update query was not successful"}, {status : 410})
    }
    finally{
        if(conn)
            conn.end();
    }
}

export async function POST(req, res){
    const { searchParams } = new URL(req.url)
    const product_id = searchParams.get('product_id');
    const newQuantity = await req.json()
    const session = await getServerSession(authOptions)
    let conn;   
    try {
        conn = await pool.getConnection();
        let query = " INSERT INTO cart_items (user_id, product_id, quantity, paid) VALUES (?,?,?,?)";
        const response = await conn.query(query, [session.id, product_id, newQuantity, false]);
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
        if(conn)
            conn.end();
    }
}

//export async function GET(req, res){

        //conn.release();
        
        //user.cartItems = []
    //let cartItems = []
    //let conn;   
    //try {
        //conn = await pool.getConnection();
        //query = "SELECT * FROM cart_items WHERE user_id = ?"
        //const rows = await conn.query(query, user.user_id)
        
    //}
    //catch(error){
        //console.log("DB error:")
        //console.log(error)
        //return NextResponse.json({errorMessage : `hey sup errordelete NTO suasd`}, {status : 410})
    //}
    ////await fetch("https://fakestoreapi.com/products/2")
    ////.then((res) => {
        ////console.log("DB call ended with no errors")
        ////return NextResponse.json({message : "No errors"}, {status : 200})
    ////})
    ////.catch((error) => {
        ////console.error(error)
        ////return NextResponse.json({message : error}, {status : 409})
    ////})

    ////console.log("DB call ended with slight error :startled:")
    ////return NextResponse.json({message : "Slight errors"}, {status : 200})
//}
//export function handler(req, res){

    //if(req.method == "POST"){
        //return res.status(200).json({message : "Hello world"})
    //}
    //else if(req.method == "DELETE"){
       //const product_id = req.query.product_id; 
       //console.log(product_id)
        //return res.status(200).json({message : "Hello world"})
    //}
    //else if(req.method == "PATCH"){
        //return res.status(200).json({message : "Hello world"})
    //}
//}