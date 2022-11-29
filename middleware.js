import axios from "axios";
import { NextResponse } from "next/server"

export const config = {
  matcher: "/",
};

export default function middleware(req) {
  const {cookies} = req

  const jwt = cookies.jwt

  const url = req.url

  if(req.nextUrl.pathname.startsWith('/Auth')){
    return NextResponse.next()
  }
  else{
    if(!jwt){
      return NextResponse.redirect("https://zdrowyblog.herokuapp.com/Auth/LoginPage")
    }
    axios
      .get('https://zdrowyblog-backend.herokuapp.com/api/posts', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(response => {
        return NextResponse.next()
      })
      .catch(error => {
        return NextResponse.redirect("https://zdrowyblog.herokuapp.com/Auth/LoginPage")
      });
  }
}