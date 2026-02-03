/**
 * Centralized error message handler
 * Returns user-friendly error messages based on error type
 */
export const getErrorMessage = (error) => {
  // Network error - no response from server
  if (!error.response) {
    if (error.code === 'ECONNABORTED') {
      return '⏱️ Request timeout - Backend not responding (check port 5000)';
    }
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      return '🔌 Cannot connect to backend - Is it running on port 5000?';
    }
    return `❌ Network error: ${error.message}`;
  }

  // Server error responses (5xx)
  if (error.response.status >= 500) {
    return `❌ Server error (${error.response.status}) - Backend issue. Check backend logs.`;
  }

  // Unauthorized
  if (error.response.status === 401) {
    return '🔐 Unauthorized - Please login again';
  }

  // Forbidden
  if (error.response.status === 403) {
    return '🚫 Access denied - You don\'t have permission';
  }

  // Not found
  if (error.response.status === 404) {
    return '❌ Resource not found (404)';
  }

  // Client error responses (4xx)
  if (error.response.status >= 400) {
    return error.response.data?.message || `❌ Request error (${error.response.status})`;
  }

  // Fallback
  return `❌ Error: ${error.message}`;
};

/**
 * Log error to console with context
 */
export const logError = (context, error) => {
  console.error(`\n❌ [${context}]`);
  console.error('Status:', error.response?.status || 'No response');
  console.error('Message:', error.message);
  console.error('Data:', error.response?.data || 'N/A');
  console.error('Full error:', error);
};

/**
 * Show user-friendly error alert
 */
export const showError = (error, context = 'Operation failed') => {
  const message = getErrorMessage(error);
  logError(context, error);
  alert(message);
};
