module.exports = {
  apps: [{
    name      : "nextjs-multiples-workes",
    script    : "./server.mjs",
    interpreter: "node",
    instances : 1,
    exec_mode : "fork",
  }]
};
