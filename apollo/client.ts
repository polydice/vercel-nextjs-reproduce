import { HttpLink } from '@apollo/client/link/http'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    }),
  })
})
