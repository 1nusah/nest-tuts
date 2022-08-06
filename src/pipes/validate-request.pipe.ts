import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

type ValidationErrorResult = {
  message: string;
  errors: Array<{ field: string; errors: Array<string> }>;
};

@Injectable()
export class ValidateRequestPipe implements PipeTransform {
  validationErrors: ValidationErrorResult = {
    message: 'The given data was invalid',
    errors: [],
  };

  async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToClass(metadata.metatype, value);

    const formErrors = await validate(object, {
      forbidUnknownValues: true,
    });

    if (formErrors.length) {
      this.formatFormErrors(formErrors);
      throw new UnprocessableEntityException(this.validationErrors);
    }

    return value;
  }

  private formatFormErrors(formErrors: Array<ValidationError>, parent = '') {
    formErrors.forEach((item) => {
      const field = parent ? `${parent}.${item.property}` : item.property;
      const errors: Array<string> = [];
      const children = item.children;

      for (const key in item.constraints) {
        errors.push(item.constraints[key]);
      }

      if (children.length) {
        this.formatFormErrors(children, field);
      }

      this.validationErrors.errors.push({ field, errors });
    });
  }
}
