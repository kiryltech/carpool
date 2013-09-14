var mongo = require('./mongo-api');

exports.pickMe = function (username, from, to, cb) {
  mongo.save('companions', {
      username: username,
      from: [from.lon, from.lat],
      to: [to.lon, to.lat]
    },
    function (err, doc) {
      cb.call(null, err, doc);
    });
};

exports.byId = function (companionId, cb) {
  mongo.findOne('companions', {
      _id: new mongo.types.ObjectID(companionId)
    },
    function (err, doc) {
      cb.call(null, err, doc);
    });
};