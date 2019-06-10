module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    //         (1)
    return res.status(403).send({error: 'You must purchase additional credits.'});
  }
  // indicates the type of error; at this time (05/2019), 402 is not yet available
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html

  next();
};