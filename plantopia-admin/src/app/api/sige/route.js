import { NextResponse } from "next/server";

export async function POST(request) {
   try {
      
      return NextResponse.json({shet:'mygahd'},{status:200})
   } catch (error) {
      return NextResponse.json({ message: error }, { status: 400 });
   }
}
