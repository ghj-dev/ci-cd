// import React from "react"

import { Form, Input } from "antd"
import { ValidationContext } from "../../untils/ValidationContext"
import { EmailValidator, RequiredFieldValidator } from "../../untils/Validator"

const FormValidator = () => {
  const [form] = Form.useForm()

  const validators = {
    email: new ValidationContext(new EmailValidator()),
    pwd: new ValidationContext(new RequiredFieldValidator()),
  }

  return (
    <Form form={form}>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            validator: validators.email.validate.bind(validators.email),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="pwd"
        name="pwd"
        rules={[
          {
            required: true,
            validator: validators.pwd.validate.bind(validators.pwd),
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
}

export default FormValidator
