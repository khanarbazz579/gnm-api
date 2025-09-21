const { format, createLogger, transports } = require("winston");
const { combine, label, json, timestamp, prettyPrint, printf } = format;
require("winston-daily-rotate-file");

const logLikeFormat = {
  transform(info) {
    const { message } = info;
    const args = info[Symbol.for("splat")];
    info[Symbol.for("message")] = `${message}`;
    info["meta"] = args;
    return info;
  },
};

const fileRotateTransport = new transports.DailyRotateFile({
  filename: `${process.env.LOG_PATH}/gnm-log-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  maxFiles: "30d",
});

const gnmLogger = createLogger({
  level: "debug",
  format: format.combine(
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.label({ label: "gnm" }),
    logLikeFormat,
    prettyPrint(),
  ),
  transports: [fileRotateTransport],
});

module.exports = gnmLogger;
