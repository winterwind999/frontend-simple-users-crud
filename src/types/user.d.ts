type User = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

type CreateUserRequest = {
  name: string;
  email: string;
  contact: string;
};

type UpdateUserRequest = {
  id: number;
  name: string;
  email: string;
  contact: string;
};

type UserState = {
  userId: number | null;
};
