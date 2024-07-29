import { Form, Input, Button } from "antd"
import { useContext } from "react"
import { RegisterFormContext } from "../../reducers/RegisterFormReducer"

const ComplexForm = () => {
  // 使用 useReducer 初始化表单状态和 reducer 函数

  const { state, dispatch } = useContext(RegisterFormContext)
  console.log("form--------1", state)
  // 表单提交处理函数
  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values)
    // 这里可以编写提交逻辑，例如发送网络请求
  }

  // 处理表单字段变化
  const handleFieldChange = (e: any, fieldName: string) => {
    const value = e.target.value
    dispatch({ type: "SET_FIELD", fieldName, payload: value })
  }

  return (
    <Form name="complex-form" onFinish={handleSubmit} initialValues={state}>
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={(e) => handleFieldChange(e, "username")} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input onChange={(e) => handleFieldChange(e, "email")} />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password onChange={(e) => handleFieldChange(e, "password")} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ComplexForm
