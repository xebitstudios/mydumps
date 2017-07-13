export enum LogLevel {
  ALL = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6,
  OFF = 7
}

export interface LogEntry {
  level: LogLevel
  time: Date
  message: string
  tag: string
}

export interface Layout {
  format(entry: LogEntry): string
}

export interface LayoutFunction {
  (entry: LogEntry): string
}

export interface Appender {
  setLayout(layout: Layout)
  setLayoutFunction(layout: LayoutFunction)
  append(entry: LogEntry)
  clear()
}

export interface ConfigJson {
  layouts: ConfigJsonLayout[]
  level: "ALL" | "TRACE" | "DEBUG" | "INFO" | "WARN" | "ERROR" | "FATAL" | "OFF"
  tags: string[]
}

export interface ConfigJsonLayout {
  type: "basic" | "html"
  appenders: ConfigJsonAppender[]
}

export interface ConfigJsonAppender {
  type: "console" | "dom"
  options?: ConfigJsonDomAppenderOptions
}

export interface ConfigJsonDomAppenderOptions {
  container_id: string
  escape_html?: boolean
  buffer_size?: number
}
