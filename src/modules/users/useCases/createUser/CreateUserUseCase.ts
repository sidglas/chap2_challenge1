// import { response } from "express";
import { Response } from "express";

import { AppError } from "../../../errors/AppError";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  // sidnei o retorno deve ser User, coloquei void -devolver User
  execute({ email, name }: IRequest): User | Response {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const created = this.usersRepository.create({
      name,
      email,
    });
    console.log("usuario criado", created);
    return created;
  }
}

export { CreateUserUseCase };
