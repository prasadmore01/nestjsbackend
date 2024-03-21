import { BadRequestException, ValidationError } from "@nestjs/common";

export const validationExceptionFactory = (errors:ValidationError[])=>{
    const errMsg = {}
    errors.forEach((error: ValidationError) => {
        errMsg[error.property] = [...Object.values(error.constraints)];
      });
      return new ValidationException(errMsg);
    };



export class ValidationException extends BadRequestException {
    constructor(public validationErrors: Record<string, unknown>) {
      super(validationErrors);
    }
  }