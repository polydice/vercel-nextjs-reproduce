import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url || '')
  const postId = searchParams.get('postId')

  revalidatePath('/', 'layout')
  revalidatePath(`/posts/${postId}`, 'page')

  return new Response(null, { status: 204 })
}
