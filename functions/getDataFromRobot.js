const axios = require("axios");

function getDataFromRobot() {
  const robotEndpoints = ["http://127.0.0.1:8085", "http://127.0.0.1:8086"];

  robotEndpoints?.map((endpoint) => {
    axios
      .get(`${endpoint}/barcodes.txt`)
      .then((res) => {
        const endpointBarcodes = JSON.parse(
          `[${res?.data?.trim()?.slice(0, -1)}]`
        );

        endpointBarcodes?.map((barcode) => {
          axios
            .post("http://127.0.0.1:8084/barcode", barcode)
            .catch((error) => {
              console.error(error?.response?.data?.message);
            });
        });
      })
      .catch(() => {
        console.error(
          "getDataFromRobot (While getEndpointsFromRobotMapper) | Error"
        );
      });
  });
}

module.exports = getDataFromRobot;
