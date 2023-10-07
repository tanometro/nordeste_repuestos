import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest): NextResponse {
    const token = localStorage.getItem('token')

    if(request.nextUrl.pathname.includes('/dashboard')){
        if(token === undefined) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next();
}
