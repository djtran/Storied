var source;

function getSource() {
    return source;
}

function setSource(sourceIP) {
    source = sourceIP;
}

function log(logMessage) {
    logDebug(logMessage)
}

function logDebug(logMessage) {
    var payload = {
        message: logMessage,
        type: 'debug',
        client: getSource()
    };
    sendLogRequest(payload);
}

function logInfo(logMessage) {
    var payload = {
        message: logMessage,
        type: 'info',
        client: getSource()
    };
    sendLogRequest(payload);
}

function logWarn(logMessage) {
    var payload = {
        message: logMessage,
        type: 'warn',
        client: getSource()
    };
    sendLogRequest(payload);
}

function logError(logMessage) {
    var payload = {
        message: logMessage,
        type: 'error',
        client: getSource()
    };
    sendLogRequest(payload);
}

function logFatal(logMessage) {
    var payload = {
        message: logMessage,
        type: 'fatal',
        client: getSource()
    };
    sendLogRequest(payload);
}

function sendLogRequest(logObj) {
    console.log(logObj);
    // $.post('/logger/create', logObj);
}
//debug|info|warn|error|fatal