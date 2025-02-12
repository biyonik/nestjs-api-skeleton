export const RegexPatterns = {
  PHONE: /^\+?[1-9]\d{1,14}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  ALPHA_NUMERIC: /^[a-zA-Z0-9]*$/,
  SAFE_STRING: /^[^<>*!]+$/,
} as const;
