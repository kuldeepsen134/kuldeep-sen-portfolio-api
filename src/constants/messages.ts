export const Messages = {
  // Generic
  SUCCESS: 'Operation completed successfully.',
  RESOURCE_NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Validation error occurred.',
  INTERNAL_ERROR: 'Internal server error. Please try again later.',
  TOO_MANY_REQUESTS: 'Too many requests. Please try again later.',

  // Auth
  LOGIN_SUCCESS: 'Logged in successfully.',
  LOGIN_FAILED: 'Invalid email or password.',
  UNAUTHORIZED: 'Authentication required. Please provide a valid token.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  TOKEN_EXPIRED: 'Token has expired.',
  TOKEN_INVALID: 'Invalid token provided.',
  REFRESH_SUCCESS: 'Token refreshed successfully.',
  REFRESH_FAILED: 'Invalid or expired refresh token.',
  LOGOUT_SUCCESS: 'Logged out successfully.',

  // Contact
  CONTACT_SUBMIT_SUCCESS: 'Thank you for reaching out! Your message has been received.',
  CONTACT_SPAM_DETECTED: 'Your message could not be processed at this time.',

  // Operations
  CREATED: 'Resource created successfully.',
  UPDATED: 'Resource updated successfully.',
  DELETED: 'Resource deleted successfully.',
  FETCHED: 'Data fetched successfully.'
} as const;
