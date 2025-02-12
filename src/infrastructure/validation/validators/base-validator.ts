import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export abstract class BaseValidator implements ValidatorConstraintInterface {
  abstract validate(value: any, args: ValidationArguments): Promise<boolean>;
  abstract defaultMessage(args: ValidationArguments): string;
}
