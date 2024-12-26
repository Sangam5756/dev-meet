export interface LoginInput {
  emailId: string;
  password: string;
}
export interface SigninInput {
  emailId: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ConnectionRequest {
  _id: string;
  fromUserId: User; // Embedded User object
  toUserId: string; // Reference to another user
  status: "interested" | "ignored" | "accepted" | "rejected"; // Enum for status
  
}


export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  about: string;
  skills: string[]; // Array of strings
  age: number;
  gender: "male" | "female" | "other"; // Gender can be limited to specific values
}
