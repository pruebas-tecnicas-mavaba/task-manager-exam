export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error('Gateway error:', err.message);

  if (err.response) {
    return res.status(err.response.status).json({
      message: err.response.data?.message || 'Upstream service error'
    });
  }

  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      message: 'Task service is unavailable'
    });
  }

  if (err.code === 'ECONNABORTED') {
    return res.status(504).json({
      message: 'Task service timeout'
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal server error'
  });
};