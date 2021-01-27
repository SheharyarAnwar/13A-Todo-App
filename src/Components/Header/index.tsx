import React, { useEffect } from "react"
import classes from "./index.module.css"
interface HeaderProps {
  text: string
}
const Index: React.FC<HeaderProps> = ({ text }) => {
  return (
    <div className={classes.root}>
      <h3 className={classes.logo}>Todo App</h3>
      <h5
        className={classes.register}
        onClick={() => window.netlifyIdentity.open()}
      >
        {text}
      </h5>
    </div>
  )
}

export default Index
