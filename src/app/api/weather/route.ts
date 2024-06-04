import { NextRequest, NextResponse } from "next/server";

export async function GET(request: { url: string | URL; }) {
    const {searchParams} = new URL(request.url);
    const address = searchParams.get("address");
    const latitude = searchParams.get("lat");
    const longitude = searchParams.get("lon");


    let url = "";   
    if (address) {
        url=
        "https://api.openweathermap.org/data/2.5/weather?q=" + 
        address +
        "&appid=" +
        "02b094e3c5230ee5309702e1b195bd38";
    } 
    else {
        url = `https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=02b094e3c5230ee5309702e1b195bd38`;
    }
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json({ data });
    
}