const express = require('express');
const { validationResult } = require('express-validator');
// can be reused by many routes

module.exports = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    let err = {}
    err.errors = errors.array();
    next(err);
  };
};