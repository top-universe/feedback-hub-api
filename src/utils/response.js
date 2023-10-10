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

/**
 * Returns response object
 * @param {string} message Response message
 * @param {*} data Data to be returned
 * @param {boolean} success Status of the request
 */
const response = ({ success, message, data }) => {
  return {
    success: success == null ? true : success,
    message: formatMessage(message),
    count: typeof data === "object" ? data.length : undefined,
    data: data || undefined,
  };
};

const formatMessage = (str) => {
  if (!str) return "";
  // Make first letter capitial
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const authResponse = (userData) => {

  const user = {
    _id: userData._id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    username: userData.username,
    email: userData.email,
    token: userData.generateAuthToken(),
  };
  return user;
};

module.exports = { success, error, response, formatMessage, authResponse};
