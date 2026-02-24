const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }

  if (err.code === 11000) {
    status = 409;
    message = "Duplicate key";
  }

  res.status(status).json({ message });
};

module.exports = { notFound, errorHandler };
