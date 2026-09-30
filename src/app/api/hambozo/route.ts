
import { NextRequest, NextResponse } from "next/server";

export async  function GET (request : NextRequest) {


 const response =  await fetch("https://ecommerce.routemisr.com/api/v1/categories")

const payload = await response.json()

    return NextResponse.json(payload)

    // const data = [
    //     {id : 1, name : "ahmed", age : 30 },
    //     {id : 2, name : "sarah", age : 30 },
    //     {id : 3, name : "mai", age : 30 },
    //     {id : 4, name : "ahmed", age : 30 },
    // ]

    // return NextResponse.json(data)








}