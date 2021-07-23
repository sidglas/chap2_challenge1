import { AppError } from "../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

// import { AppError } from "modules/errors/AppError";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    // Complete aqui
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }
}

export { ShowUserProfileUseCase };
