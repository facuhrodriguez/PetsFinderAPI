export default class AppError extends Error {
  /**
   * @param {{code: number, message: string}} param
   */
  constructor(param) {
    super(param.message);
    this.code = param.code;
  }
}
