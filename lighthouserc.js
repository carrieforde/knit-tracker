module.exports = {
  ci: {
    collect: {
      startServerCommand: "yarn serve",
      url: ["http://localhost:3000"],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
