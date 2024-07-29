import { useReducer } from "react"
import { createContext } from "react"

// 初始表单状态
const initialFormState = {
  username: "",
  email: "",
  password: "",
  username2: "",
  email2: "",
  password2: "",
}

// reducer 函数用于管理表单状态
const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.fieldName]: action.payload,
      }
    case "RESET_FORM":
      return initialFormState
    default:
      return state
  }
}

export const useRegisterForm = () => useReducer(formReducer, initialFormState)

const context: any = {}
export const RegisterFormContext = createContext(context)
