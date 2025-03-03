import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

// GET: 메시지 목록 조회
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("wedding")
    
    const messages = await db
      .collection("messages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(messages)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

// POST: 새 메시지 작성
export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("wedding")
    const body = await request.json()

    const message = {
      ...body,
      createdAt: new Date(),
    }

    const result = await db.collection("messages").insertOne(message)

    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
  }
} 