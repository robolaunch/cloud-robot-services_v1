export default function responseSetter(
  response: any,
  status: any,
  message: any,
  data: any
) {
  response.status(status).json({
    success: status < 300 ? true : false,
    message: message,
    data: data,
  });
}
