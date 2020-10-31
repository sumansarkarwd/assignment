const validator = (schema, property) => {
  return (req, res, next) => {
    console.log({ d: req[property] });
    const { error } = schema.validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      console.log("error", message);
      return res.status(422).json({ error: message });
    }
  };
};

module.exports = validator;
