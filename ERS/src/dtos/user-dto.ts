//DTO stands for data transfer object

export class UserDTO{  //formate from the data base
      user_id: number // primary key
      username: string // not null, unique
      password: string // not null
      first_name: string // not null
      last_name: string // not null
      email: string // not null
      role_id: number // not null
      role_name: string
  }