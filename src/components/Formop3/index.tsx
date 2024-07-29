import React, { useContext } from "react"
import { RegisterFormContext } from "../../reducers/RegisterFormReducer"

const Dom1 = () => {
  const { state } = useContext(RegisterFormContext)
  console.log("Dom1------")
  return <div>{state.name || "--"}</div>
}

const Dom2 = () => {
  console.log("Dom2------2222")
  return <div>我是Dom2</div>
}
const Formop3 = React.memo(() => {
  console.log("Formop3------")
  return (
    <div>
      <Dom1 />
      <Dom2 />
    </div>
  )
})

export default Formop3
