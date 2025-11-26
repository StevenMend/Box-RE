import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ 
    success: true,
    address: '0x5b9Bbe63F11235D05A320feBF103EF32130cBe63'
  })
}
