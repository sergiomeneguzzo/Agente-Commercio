import {
  IsEmail,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class AddUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  picture: string;

  @IsEmail()
  username: string;

  @MinLength(8)
  // @Matches(new RegExp('((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'), {
  //   message:
  //     'password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number or special character',
  // })
  password: string;

  @ValidateIf((o) => o.password !== undefined)
  @IsString()
  confirmPassword: string;

  validatePasswordMatch() {
    if (this.password !== this.confirmPassword) {
      throw new Error('Password and confirm password do not match.');
    }
  }
}

export class LoginDTO {
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
