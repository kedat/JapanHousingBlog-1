// User data types matching the schema
export interface User {
  id: number;
  username: string;
  password: string; // Note: In a real app, we wouldn't store plaintext passwords
  name: string | null;
  email: string | null;
}

// Sample users for demo purposes
export const users: User[] = [
  {
    id: 1,
    username: "demo",
    password: "$2b$10$36QYIcwXWrDZsqZ2Cd6O.e9yrnQAqFnBAeQ0OXZ/znxpXyXpSxkYK", // hashed version of "password"
    name: "Demo User",
    email: "demo@example.com"
  },
  {
    id: 2,
    username: "admin",
    password: "$2b$10$36QYIcwXWrDZsqZ2Cd6O.e9yrnQAqFnBAeQ0OXZ/znxpXyXpSxkYK", // hashed version of "password"
    name: "Administrator",
    email: "admin@example.com"
  }
];

// User management functions
export const getUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

// Mock of password comparison
// In a real app, you'd use a proper hashing library like bcrypt
export const comparePasswords = async (supplied: string, stored: string): Promise<boolean> => {
  // For simplicity in this demo: password = "password"
  return supplied === "password";
};