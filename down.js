module.exports = {
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
      message: "ollama pull {{args.id}}"
    }
  }, {
    method: "input",
    params: { title: "Download Finished", description: "Go back to the dashboard and launch the app!" }
  }]
}
