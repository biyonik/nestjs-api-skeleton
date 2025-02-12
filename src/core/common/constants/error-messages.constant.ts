export const ErrorMessages = {
  VALIDATION: {
    REQUIRED_FIELD: 'Field is required',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_LENGTH: 'Invalid length',
    INVALID_FORMAT: 'Invalid format',
  },
  AUTH: {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid token',
    TOKEN_EXPIRED: 'Token expired',
  },
  COMMON: {
    NOT_FOUND: 'Resource not found',
    ALREADY_EXISTS: 'Resource already exists',
    INTERNAL_ERROR: 'Internal server error',
  },
} as const;
