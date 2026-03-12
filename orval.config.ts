module.exports = {
  abricotBackend: {
    input: "http://localhost:8000/swagger.json",
    output: {
      mode: "tags-split",
      target: "src/api/endpoints",
      schemas: "src/api/models",
      client: "react-query",
    },
  },
};
