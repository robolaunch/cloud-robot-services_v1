async function get(req, res) {
  res.send(200, "Response");
}

async function getID(req, res) {
  res.send(200, "Response wtih ID");
}

module.exports = {
  get,
  getID,
};
