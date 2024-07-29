//定义策略接口
export default interface ValidatorInterface {
  validate(_: any, value: string): Promise<void>
}
