import { getClient } from '@/apollo/client'
import { PostDocument, type PostQuery } from '@/graphql/types-and-hooks'
import { notFound } from 'next/navigation'
import { cache, type FC } from 'react'

const queryPost = cache(async (postId: number) => {
  const client = getClient()

  const { data } = await client.query<PostQuery>({
    query: PostDocument,
    variables: {
      postId,
    },
  })

  return data
})



export interface PostIdPageProps {
  params: {
    postId: string
  }
  searchParams: {
    preview?: string
  }
}

const PostIdPage: FC<PostIdPageProps> = async ({ params: { postId } }) => {
  if (!postId || isNaN(+postId)) {
    notFound()
  }

  const { post } = await queryPost(+postId)


  return <div dangerouslySetInnerHTML={{__html: (post?.content || "")}}></div>
}


export default PostIdPage
