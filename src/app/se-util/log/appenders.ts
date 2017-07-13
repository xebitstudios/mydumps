import { LogEntry, Appender, Layout, LayoutFunction } from "./types"
import * as utils from "./utils"

export class BaseAppender {

  protected layout: Layout

  setLayout(layout: Layout) {
    this.layout = layout
  }

  setLayoutFunction(layout: LayoutFunction) {
    this.layout = {
      format: layout
    }
  }

}

export class ConsoleAppender extends BaseAppender implements Appender {

  append(entry: LogEntry) {
    console.log(this.layout.format(entry))
  }

  clear() {
    console.clear()
  }

}

export class DOMAppender extends BaseAppender implements Appender {

  private buffer: string[] = []
  private el: HTMLElement

  constructor(
    id: string,
    private escape_html: boolean = false,
    private buffer_size: number = 0
  ) {
    super()
    this.el = document.getElementById(id)
  }

  append(entry: LogEntry) {
    if (!this.el)
      return
    const log = this.layout.format(entry)
    this.buffer.push((this.escape_html ? utils.escapeHtml(log) : log))
    if (this.buffer_size && this.buffer.length > this.buffer_size)
      this.buffer.shift()
    this.el.innerHTML = this.buffer.join('<br />')
  }

  clear() {
    this.el.innerHTML = ''
    this.buffer = []
  }

}
