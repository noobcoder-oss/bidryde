import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'

export function middleware(request) {


  if (request.nextUrl.pathname.startsWith('/SearchPage')) {
    try {
      const cookiesList = cookies();
      const hasCarSearchParamsCookie = cookiesList.has('carSearchParams')  
     if(hasCarSearchParamsCookie){
      return NextResponse.next();
    }else{
  return NextResponse.redirect(new URL('/home', request.url));
    }
    } catch (error) {
      
  return NextResponse.redirect(new URL('/home', request.url));
    }
  }
  return NextResponse.next();
}
 
