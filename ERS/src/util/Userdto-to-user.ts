import { User } from "../models/user";
import { UserDTO } from "../dtos/user-dto";
import { Role } from "../models/role";

export function userDTOtoUser(uD: UserDTO[]): User {
    let roles = new Role(uD[0].role_id, uD[0].role_name)
    return new User(
        uD[0].user_id,
        uD[0].username,
        uD[0].password,
        uD[0].first_name,
        uD[0].last_name,
        uD[0].email,
        roles
        );
}


export function multiUserDTOConvertor(gD: UserDTO[]): User[] {
    let currentUser: UserDTO[] = [];
    const result: User[] = [];
    for (const g of gD) {
        if (currentUser.length === 0) {
            currentUser.push(g);
        } else if (currentUser[0].user_id === g.user_id) {
            currentUser.push(g);
        } else {
            result.push(userDTOtoUser(currentUser));
            currentUser = [];
            currentUser.push(g);
        }
    }
    result.push(userDTOtoUser(currentUser));
    return result;
}