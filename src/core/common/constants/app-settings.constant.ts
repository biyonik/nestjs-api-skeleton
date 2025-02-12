export const AppSettings = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },
  CACHE: {
    TTL: 3600, // 1 hour in seconds
    MAX_ITEMS: 1000,
  },
  SECURITY: {
    JWT_EXPIRATION: '24h',
    REFRESH_TOKEN_EXPIRATION: '7d',
    BCRYPT_ROUNDS: 10,
  },
  CORS: {
    ALLOWED_ORIGINS: ['http://localhost:3000'],
    ALLOWED_METHODS: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
} as const;
