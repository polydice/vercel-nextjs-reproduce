import { getClient } from '@/apollo/client'
import { PostsDocument, type PostsQuery } from '@/graphql/types-and-hooks'
import Link from 'next/link'

const queryPosts = async () => {

  const first = 10
  const client = getClient()

  const { data } = await client.query<PostsQuery>({
    query: PostsDocument,
    variables: {
      first,
    },
  })

  return data
}

const PopularPostSection = async () => {
  const { posts } = await queryPosts()

  return (
    <section>
        <ul className='space-y-6'>
          {posts?.nodes.map((post) => (
            <li key={post.databaseId}>
              <Link href={`/posts/${post.databaseId}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
    </section>
  )
}

export default PopularPostSection
