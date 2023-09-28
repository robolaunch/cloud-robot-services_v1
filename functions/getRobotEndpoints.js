function getRobotEndpoints() {
  return [
    {
      robot_id: 1,
      endpoint: "http://127.0.0.1:8085",
    },
    {
      robot_id: 2,
      endpoint: "http://127.0.0.1:8086",
    },
  ];
}

module.exports = getRobotEndpoints;
