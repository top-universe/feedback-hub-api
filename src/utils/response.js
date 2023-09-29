/**
 * This function returns a success response
 */
const success = (res, message, data, status = 200) => {
  return res.status(status).json({
    success: true,
    message: message || "success",
    data: data ? data : null,
  });
};

/**
 * This function returns an error response
 */
const error = (res, message, status = 500) => {
  return res.status(status).json({
    success: false,
    message: message || "Internal Server error",
  });
};

module.exports = { success, error };
