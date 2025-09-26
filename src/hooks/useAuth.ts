import { useContext } from 'react';
// This is a re-export for convenience, the actual implementation is in AuthContext.
// However, to follow the plan, this file is created.
// In a larger app, this might have more logic.
import { useAuth as useAuthFromContext } from '../contexts/AuthContext';

export const useAuth = useAuthFromContext;
