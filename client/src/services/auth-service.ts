import { getUserByUsername, comparePasswords, User } from '../data/users';

// Interface for login credentials
interface LoginCredentials {
  username: string;
  password: string;
}

// Interface for registration data
interface RegisterData {
  username: string;
  password: string;
  name?: string;
  email?: string;
}

// Client-side auth service
class AuthService {
  private readonly STORAGE_KEY = 'japan-housing-user';
  private currentUser: User | null = null;

  constructor() {
    // Initialize from localStorage if available
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem(this.STORAGE_KEY);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error('Failed to load user from storage:', error);
      this.currentUser = null;
    }
  }

  private saveUserToStorage(user: User | null): void {
    if (user) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    // Simulate network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = getUserByUsername(credentials.username);
    
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await comparePasswords(credentials.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Create a sanitized user object (without password)
    const { password, ...sanitizedUser } = user;

    // Update current user and storage
    this.currentUser = user;
    this.saveUserToStorage(user);
    
    return sanitizedUser as User;
  }

  async register(data: RegisterData): Promise<User> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));

    // Check if username already exists
    const existingUser = getUserByUsername(data.username);
    
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // In a static site, we can't actually add to the database
    // Instead, we'll create a temporary user object in memory and localStorage
    const newUser: User = {
      id: Date.now(), // Use timestamp as a unique ID
      username: data.username,
      password: data.password, // In a real app, this would be hashed
      name: data.name || null,
      email: data.email || null
    };
    
    // Create a sanitized user object (without password)
    const { password: _, ...sanitizedUser } = newUser;
    
    this.currentUser = newUser;
    this.saveUserToStorage(newUser);
    
    return sanitizedUser as User;
  }

  async logout(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    this.currentUser = null;
    this.saveUserToStorage(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser ? { ...this.currentUser } : null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

// Export a singleton instance
export const authService = new AuthService();