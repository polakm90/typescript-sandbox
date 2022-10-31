import axios from "axios";
import { Provider } from "../framework/provider";
import { Injectable } from "../framework/ioc";

export interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

@Injectable()
export class UserService extends Provider {
  private data: { user: User } = { user: null };

  // initilaize data if you want prepare data only once
  initialize() {
    this.getRandomUser().then((user) => {
      this.data.user = user;
    });
  }

  public async loadUsers(): Promise<User[]> {
    return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data);
  }

  public async loadUser(id: number): Promise<User> {
    return axios
      .get("https://jsonplaceholder.typicode.com/users/" + id)
      .then((response) => response.data);
  }

  public async createUser(): Promise<number> {
    return Math.ceil(Math.random() * 10 + 10);
  }

  public async getRandomUser(): Promise<User> {
    var userId = Math.ceil(Math.random() * 10);
    if (!userId) {
      return null;
    }
    return this.data?.user || this.loadUser(userId).then((user: User) => user);
  }
}
