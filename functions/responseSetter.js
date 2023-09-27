function responseSetter(response, status, message, data) {
  response.status(status).json({
    success: status < 300 ? true : false,
    message: message,
    data: data,
  });
}

module.exports = responseSetter;
