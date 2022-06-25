"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResources = void 0;
const validateResources = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (e) {
        return res.status(400).send(e.errors);
    }
};
exports.validateResources = validateResources;
