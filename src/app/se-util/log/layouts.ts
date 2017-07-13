import { LogLevel, LogEntry, Layout } from "./types"

const pad = number => number < 10 ? '0' + number : number

const formatDate = (date: Date): string =>
  date.getFullYear() +
  '-' + pad(date.getMonth() + 1) +
  '-' + pad(date.getDate()) +
  ' ' + pad(date.getHours()) +
  ':' + pad(date.getMinutes()) +
  ':' + pad(date.getSeconds())

/**
 * Simple layout, that formats logs as
 * "{time} {level} [{tag}] - {message}"
 */
export class BasicLayout implements Layout {

  format(entry: LogEntry): string {
    return `${formatDate(entry.time)} ${LogLevel[entry.level]} [${entry.tag}] - ${entry.message}`
  }

}

export interface HTMLLayoutColors {
  tag: string
  message: string
  time: string
  level: string
}

export class HTMLLayout implements Layout {

  colors = {
    time: 'black',
    level: 'dark red',
    tag: 'dark green',
    message: 'black',
  }

  format(entry: LogEntry): string {
    return [
      `<span${this.timeStyle}>${formatDate(entry.time)}</span>`,
      `<span${this.levelStyle}>${LogLevel[entry.level]}</span>`,
      `<span${this.tagStyle}>[${entry.tag}]</span>`,
      `<span${this.messageStyle}>${entry.message}</span>`,
    ].join(' ')
  }

  get timeStyle() {
    return this.getStyle(this.colors.time)
  }

  get levelStyle() {
    return this.getStyle(this.colors.level)
  }

  get tagStyle() {
    return this.getStyle(this.colors.tag)
  }

  get messageStyle() {
    return this.getStyle(this.colors.message)
  }

  private getStyle(color: string): string {
    return ` style="color: ${color}"`
  }

}
