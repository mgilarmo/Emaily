module.exports = (req, res, next) => {
  if (!req.user) {
    //         (1)
    return res.status(401).send({error: 'You must login.'});
  }
  // indicates the type of error; at this time (05/2019), 402 is not yet available
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
  
  next();
};