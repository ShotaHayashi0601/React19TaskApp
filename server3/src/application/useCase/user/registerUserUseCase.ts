import { UserRepository } from '../../../infrastructure/repository/user/userRepository';

export class RegisterUserUseCase {
  constructor(private _userRepository: UserRepository) {}
  async register(user: any): Promise<any> {
    return await this._userRepository.register(user);
  }
}
