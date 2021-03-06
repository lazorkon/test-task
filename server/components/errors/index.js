/**
 * Error responses
 */

'use strict';

module.exports[404] = function pageNotFound(req, res) {
  var viewFilePath = '404';
  var statusCode = 404;
  var result = {
    status: statusCode
  };

  res.status(result.status);
  // if request comes from angular - send response in JSON format
  if (req.get('X-XSRF-TOKEN')) {
    return res.status(result.status).json(result);
  }

  res.render(viewFilePath, {}, function (err, html) {
    if (err) {
      return res.status(result.status).json(result);
    }

    res.send(html);
  });
};
