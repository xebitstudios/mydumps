import { ConsoleAppender, DOMAppender } from "./appenders"
import { BasicLayout, HTMLLayout } from "./layouts"
import { LogLevel, Appender, Layout, LayoutFunction, ConfigJson, ConfigJsonDomAppenderOptions } from "./types"
import { stringify } from "./utils"

export class LoggerConfig {

  static Level = LogLevel

  static Appenders = {
    ConsoleAppender,
    DOMAppender,
  }

  static Layouts = {
    BasicLayout,
    HTMLLayout,
  }

  private appenders: Appender[] = []

  constructor(
    appender?: Appender,
    private level: LogLevel = LogLevel.INFO,
    private tags?: string[]
  ) {
    if (appender)
      this.addAppender(appender)
  }

  public addAppender(appender: Appender) {
    this.appenders.push(appender)
  }

  public setLevel(level: LogLevel) {
    this.level = level
  }

  public getAppenders() {
    return this.appenders
  }

  public getLevel() {
    return this.level
  }

  public hasTag(tag: string) {
    if (!this.tags || this.tags.length === 0)
      return true
    for (let i in this.tags) {
      let t = this.tags[i]
      if (t === tag)
        return true
    }
    return false
  }

  public static createFromJson(json: ConfigJson): LoggerConfig {
    let config = new LoggerConfig(null, LogLevel[json.level], json.tags)
    for (let layout_json of json.layouts) {
      let layout: Layout
      switch (layout_json.type) {
        case "basic":
          layout = new BasicLayout()
          break
        case "html":
          layout = new HTMLLayout()
          break
      }
      for (let appender_json of layout_json.appenders) {
        let appender: Appender
        switch (appender_json.type) {
          case "console":
            appender = new ConsoleAppender()
            break
          case "dom":
            let options = appender_json.options as ConfigJsonDomAppenderOptions
            appender = new DOMAppender(options.container_id, options.escape_html, options.buffer_size)
            break
        }
        appender.setLayout(layout)
        config.addAppender(appender)
      }
    }
    return config
  }
}

const DEFAULT_APPENDER = new LoggerConfig.Appenders.ConsoleAppender()
DEFAULT_APPENDER.setLayout(new LoggerConfig.Layouts.BasicLayout())
const DEFAULT_CONFIG = new LoggerConfig(DEFAULT_APPENDER, LoggerConfig.Level.ALL)

export class Logger {

  static tag = (tag, config?: LoggerConfig) => new Logger(tag, config || DEFAULT_CONFIG)

  private static loggers: { [tag: string]: Logger } = {}

  private constructor(
    private tag: string,
    private config: LoggerConfig
  ) {
  }

  public info(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.INFO, message, object, deep)
  }

  public fatal(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.FATAL, message, object, deep)
  }

  public error(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.ERROR, message, object, deep)
  }

  public debug(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.DEBUG, message, object, deep)
  }

  public warn(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.WARN, message, object, deep)
  }

  public trace(message: string, object?: any, deep?: number) {
    this.doLog(LogLevel.TRACE, message, object, deep)
  }

  public static getLogger(tag: string, config: LoggerConfig) {
    if (Logger.loggers[tag])
      return Logger.loggers[tag]
    return Logger.loggers[tag] = new Logger(tag, config)
  }

  private doLog(level: LogLevel, message: string, object?: any, deep?: number) {
    if (typeof object !== "undefined")
      message += ' ' + stringify(object, deep || 1)
    if (level >= this.config.getLevel() && this.config.hasTag(this.tag)) {
      for (var i in this.config.getAppenders()) {
        var appender = this.config.getAppenders()[i]
        appender.append({
          message: message,
          time: new Date(),
          tag: this.tag,
          level: level,
        })
      }
    }
  }

}

