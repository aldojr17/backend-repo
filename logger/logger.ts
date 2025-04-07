const errorHandler = (error, name, from) => {
  let loggerFunction = console.log;

  loggerFunction("========= START =========");
  loggerFunction("Error occured in " + name);
};
