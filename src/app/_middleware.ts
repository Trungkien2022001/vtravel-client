import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();
  // Thêm header Referrer-Policy
  res.headers.set('Referrer-Policy', 'no-referrer'); // Bạn có thể thay đổi chính sách theo nhu cầu
  return res;
}
