module.exports = {
  daemon: true,
  run: [{
    method: "shell.run",
    params: {
      message: "ollama serve 2>&1",
      on: [
        { event: "/listening/i", done: true },
        { event: "/error:.*already in use/i", done: true },
        { event: "/error:.*already running/i", done: true },
        { event: "/already in use|already running/i", done: true },
        { event: "/address already in use/i", done: true }
      ]
    }
  }, {
    method: "shell.run",
    params: {
      path: "app",
      message: [
        "npm start"
      ],
      on: [{ event: "/(http:\\/\\/[0-9.:]+)/", done: true }]
    }
  }, {
    method: "local.set",
    params: {
      url: "{{input.event[1]}}"
    }
  }]
}
