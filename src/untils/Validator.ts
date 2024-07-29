import ValidatorInterface from "./ValidatorInterface"

//定义具体策略

//必填校验

export class RequiredFieldValidator implements ValidatorInterface {
  async validate(_: any, value: string): Promise<void> {
    if (!value || value.trim() === "") {
      return Promise.reject("This field is required")
    }
    return Promise.resolve()
  }
}

// 邮箱校验

export class EmailValidator implements ValidatorInterface {
  async validate(_: any, value: string): Promise<void> {
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(value)) {
      return Promise.reject("Invalid email format")
    }
    return Promise.resolve()
  }
}
