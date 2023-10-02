import { NextResponse } from "next/server";

export async function POST(request) {
   try {
      
      return NextResponse.json({shet:'shet'},{status:200})
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}
