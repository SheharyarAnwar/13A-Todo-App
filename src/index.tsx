import React, { useEffect, useState } from "react"
import netlifyIdentity from "netlify-identity-widget"
import { NetlifyWidget } from "./Interfaces"
import { navigate } from "gatsby"
import { ApolloProvider } from "@apollo/client"
import { createApolloClientWithTokenContext } from "./Apollo/client"

export const GlobalContext = React.createContext<GlobalContextValues | null>(
  null
)
declare global {
  interface Window {
    netlifyIdentity: NetlifyWidget
  }
}
interface GlobalContextValues {
  user: netlifyIdentity.User | null
}

const Index = ({ children }) => {
  const [user, setUser] = useState<netlifyIdentity.User>(null)
  useEffect(() => {
    window.netlifyIdentity = netlifyIdentity
    netlifyIdentity.init()
    setUser(window.netlifyIdentity.currentUser())
    window.netlifyIdentity.on("logout", () => {
      window.netlifyIdentity.close()
      setUser(null)
      navigate("/")
    })
    window.netlifyIdentity.on("login", () => {
      window.netlifyIdentity.close()
      setUser(window.netlifyIdentity.currentUser())
      navigate("/app")
    })
  }, [])
  return (
    <>
      <GlobalContext.Provider value={{ user: user }}>
        <ApolloProvider
          client={createApolloClientWithTokenContext(user?.token?.access_token)}
        >
          {children}
        </ApolloProvider>
      </GlobalContext.Provider>
    </>
  )
}

export default Index
