//定义策略上下文
// ValidationContext.js
import ValidatorInterface from "./ValidatorInterface"

export class ValidationContext {
  private validator: ValidatorInterface

  constructor(validator: ValidatorInterface) {
    this.validator = validator
  }

  setValidator(validator: ValidatorInterface): void {
    this.validator = validator
  }

  validate(_: any, value: string): Promise<void> {
    return this.validator.validate(_, value)
  }
}
