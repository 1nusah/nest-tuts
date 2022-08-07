import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

type ValidationErrorResult = {
  message: string;
  errors: Array<{ field: string; errors: Array<string> }>;
};

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log();

    const { error } = this.schema.validate(value);

    if (error !== undefined) {
      const result: ValidationErrorResult = {
        message: 'The given data was invalid',
        errors: [],
      };

      error.details.forEach((item) => {
        const key = item.path.join('.');
        const index = result.errors.findIndex((r) => r.field === key);

        if (index !== -1) {
          result.errors[index].errors.push(item.message.replaceAll('"', ''));
        } else {
          result.errors.push({
            field: item.path.join('.'),
            errors: [item.message.replaceAll('"', '')],
          });
        }
      });
      throw new UnprocessableEntityException(result);
    } else {
      return value;
    }
  }
}
