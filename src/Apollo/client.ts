import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

export const createApolloClientWithTokenContext = token => {
  // console.log(token, "-=-=-=-=-=")
  const httpLink = createHttpLink({
    uri:
      "https://kpge7h6bzffu3f66wj3hamtodi.appsync-api.ap-south-1.amazonaws.com/graphql",
  })
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "x-api-key": "da2-d5fc5wdlxfevlezaigz26j77qi",
        "X-Amz-Client-Context": btoa(token),
        Authorization: token ? `Bearer ${token}` : "",
      },
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
