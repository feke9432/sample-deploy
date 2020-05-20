exports.Log = function (msg) {
  console.log(msg)
}

exports.outProcess = function (err) {
  err && Log(err)
  process.exit(1)
}

module.exports = exports