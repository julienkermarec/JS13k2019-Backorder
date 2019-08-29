'use strict';

class TokenizerError extends Error {
    constructor(originalError) {
        const message = getErrorMessage(originalError);
        super(message);
        Error.captureStackTrace(this, TokenizerError);
        this.message = message;
    }

    get name() {
        return 'TokenizerError';
    }
}

class ParserError extends Error {
    constructor(originalError) {
        const message = getErrorMessage(originalError);
        super(message);
        Error.captureStackTrace(this, ParserError);
        this.message = message;
    }

    get name() {
        return 'ParserError';
    }
}

class MinifyError extends Error {
    constructor(originalError) {
        const message = getErrorMessage(originalError);
        super(message);
        Error.captureStackTrace(this, MinifyError);
        this.message = message;
    }

    get name() {
        return 'MinifyError';
    }
}

class DeparserError extends Error {
    constructor(originalError) {
        const message = getErrorMessage(originalError);
        super(message);
        Error.captureStackTrace(this, DeparserError);
        this.message = message;
    }

    get name() {
        return 'DeparserError';
    }
}

function getErrorMessage(err) {
    return err instanceof Error ? err.message : String(err);
}

module.exports = {
    TokenizerError,
    ParserError,
    MinifyError,
    DeparserError
};
