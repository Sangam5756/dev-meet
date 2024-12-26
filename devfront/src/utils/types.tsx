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

export interface Connection {
  fromUserId: string; // ObjectId stored as a string
  toUserId: string;   // ObjectId stored as a string
  status: "interested" | "ignored" | "accepted" | "rejected"; // Valid statuses
  createdAt: string;  // Timestamps
  updatedAt: string;  // Timestamps
}

