const redact = (payload = {}) => {
  const copy = { ...payload };
  ['token', 'password', 'otp'].forEach((key) => {
    if (copy[key]) copy[key] = '***';
  });
  return copy;
};

export const logger = {
  info: (message, payload) => console.info(`[IRCTC] ${message}`, redact(payload)),
  warn: (message, payload) => console.warn(`[IRCTC] ${message}`, redact(payload)),
  error: (message, payload) => console.error(`[IRCTC] ${message}`, redact(payload)),
};
