const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      // console.log("error", message);
      req.flash("error", message);
      return res.redirect("back");
    }
  };
};

module.exports = validator;
