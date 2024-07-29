import { Form, Input, Button } from "antd"
import React, { useContext } from "react"
import { RegisterFormContext } from "../../reducers/RegisterFormReducer"

const ComplexForm2 = React.memo(() => {
  // 使用 useReducer 初始化表单状态和 reducer 函数

  const { state, dispatch } = useContext(RegisterFormContext)
  console.log("form--------2", state)
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
        name="username2"
        label="Username2"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input onChange={(e) => handleFieldChange(e, "username2")} />
      </Form.Item>

      <Form.Item
        name="email2"
        label="E-mail2"
        rules={[
          { required: true, message: "Please input your email2!" },
          { type: "email", message: "Invalid email format!" },
        ]}
      >
        <Input onChange={(e) => handleFieldChange(e, "email2")} />
      </Form.Item>

      <Form.Item
        name="password2"
        label="Password2"
        rules={[{ required: true, message: "Please input your password2!" }]}
      >
        <Input.Password onChange={(e) => handleFieldChange(e, "password2")} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
})

export default ComplexForm2
