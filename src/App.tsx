// import { useEffect, useState } from "react"
import "./App.css"
import FormValidator from "./components/FormValidator"
// import VerList from "./components/VerList"
import Formop from "./components/Formop"
import Formop2 from "./components/Formop2"
import Formop3 from "./components/Formop3"
import {
  useRegisterForm,
  RegisterFormContext,
} from "./reducers/RegisterFormReducer"

function App() {
  // const [count, setCount] = useState(0)
  const [state, dispatch] = useRegisterForm()

  // useEffect(() => {
  //   console.log(count, "外部")
  //   return () => {
  //     console.log(count, "内部")
  //   }
  // }, [count])

  return (
    <RegisterFormContext.Provider value={{ state, dispatch }}>
      <Formop />
      <Formop2 />
      <Formop3 />
      <FormValidator />
    </RegisterFormContext.Provider>
  )
}

export default App
