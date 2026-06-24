import { userRepository } from "../repository/userRepository";
import { apiError } from "../error/apiError";
import { StatusCodes } from "../enums/statusCodes";

class UserService{
    public async isEmailUniq (email:string):Promise<void>{
       const user = await userRepository.getByEmail(email);
       if(user){
           throw new apiError('user already exist', StatusCodes.BAD_REQUEST)
       }
    }
}
export const userService = new UserService();