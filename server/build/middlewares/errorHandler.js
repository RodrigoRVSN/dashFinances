"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res) => {
    res.status(500).json({ error: error.name });
};
exports.errorHandler = errorHandler;
