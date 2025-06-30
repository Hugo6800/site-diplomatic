import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface UserData {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Timestamp;
}

export interface User extends FirebaseUser {
    role?: string;
    createdAt?: Date;
}
