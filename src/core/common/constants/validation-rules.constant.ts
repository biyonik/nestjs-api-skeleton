export const ValidationRules = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 50,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]*$/,
  },
  EMAIL: {
    MAX_LENGTH: 255,
    PATTERN: /^[^@]+@[^@]+\.[^@]+$/,
  },
} as const;
