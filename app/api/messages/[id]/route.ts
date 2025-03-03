import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// DELETE: 메시지 삭제
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("wedding")
    
    const { password } = await request.json()
    const { id } = context.params
    
    // 비밀번호 확인
    const message = await db.collection("messages").findOne({
      _id: new ObjectId(id)
    })

    if (!message || message.password !== password) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 403 }
      )
    }

    // 메시지 삭제
    await db.collection("messages").deleteOne({
      _id: new ObjectId(id)
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
} 