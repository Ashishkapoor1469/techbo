import { dbconnect } from "@/lib/dbConnection";
import { Post } from "@/models/userModel";
import { NextRequest } from "next/server";


export async function POST(req:NextRequest){
    dbconnect();
    const {} = await req.json();
}