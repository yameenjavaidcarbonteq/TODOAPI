import { 
  IGetAllUsersRequestDto, 
  IGetAllUsersResponseDto,
} from "./dtos";
import { IUserProps, IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";
import { ErrorStatusCodes, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";
import { UserMapper } from "@infrastructure";
import { PaginationData, PaginationOptions } from "@application/utils";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class GetAllUsersUsecase {

  private readonly userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(getAllUsersDTO: IGetAllUsersRequestDto) : Promise<AppResult<IGetAllUsersResponseDto>>{
    
    const paginatedOptions = new PaginationOptions(getAllUsersDTO.pageNumber,getAllUsersDTO.pageLimit);
    const usersResult = await AppResult.tryFromPromise(this.userRepo.findAll(
      paginatedOptions
    ));

    const countResult = await AppResult.tryFromPromise(this.userRepo.count());

    
    if(usersResult.isErr() || countResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const dbUsers = usersResult.unwrap();
    const dbUsersCount = countResult.unwrap();    
    
    
    const domainUsers = UserMapper.toDomainFromDbBulk(dbUsers);
    const paginatedData : PaginationData<IUserProps> = new PaginationData(paginatedOptions, dbUsersCount);

    domainUsers.forEach(function (dbUser) {
      paginatedData.addItem(dbUser.userProps);
    });
    
    return AppResult.fromResult(Ok<IGetAllUsersResponseDto>(paginatedData.getPaginatedData()));
  }
}

export const GetAllUsersUsecaseInstance = new GetAllUsersUsecase(
  UserRepositoryInstance,
);