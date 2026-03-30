const path = require('path')
const models = require("./models")
module.exports = {
  version: "5.0",
  title: "Chatbot-Ollama",
  description: "open source chat UI for Ollama https://github.com/ivanfioravanti/chatbot-ollama",
  icon: "icon.png",
  pre: [{
    icon: "icon.png",
    title: "Ollama",
    description: "Get up and running with large language models.",
    href: "https://ollama.com/"
  }],
  menu: async (kernel, info) => {
    let installing = info.running("install.js")
    let installed = info.exists("app/node_modules")
    let running = info.running("start.js")
    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")]
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
            popout: true,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }, {
            icon: "fa-solid fa-download",
            text: "Download Models",
            menu: models.map((m) => {
              return {
                icon: "fa-solid fa-circle-down",
                text: `${m.id} (${m.size})`,
                href: "down.js",
                params: { id: m.id }
              }
            })
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: models.map((m) => {
            return {
              icon: "fa-solid fa-circle-down",
              text: `${m.id} (${m.size})`,
              href: "down.js",
              params: { id: m.id }
            }
          })
        }, {
          icon: "fa-solid fa-arrows-rotate",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-solid fa-broom",
          text: "Factory Reset",
          href: "reset.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
