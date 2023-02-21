import modernizr from 'modernizr'
import { resolve } from 'path'

export default async function (moduleOptions) {
  const options = { ...this.options.modernizr, ...moduleOptions }

  const code = await new Promise(resolve => modernizr.build(options, resolve))

  this.addPlugin({
    fileName: 'modernizr-plugin.js',
    mode: 'client',
    options: code,
    src: resolve(__dirname, './plugin.js.template'),
  })
}