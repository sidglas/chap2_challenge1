import { AppError } from "../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const adminUser = this.usersRepository.findById(user_id);
    if (!adminUser) {
      throw new Error(
        "should not be able to a non existing user get list of all users"
      );
    }
    if (!adminUser.admin) {
      throw new Error(
        "should not be able to a non admin user get list of all users"
      );
    }
    const users = this.usersRepository.list();
    return users;
  }
}

export { ListAllUsersUseCase };
