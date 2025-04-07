// let src = (fw, rootpath) => {
//   // load  middlewares
//   const bodyParser = require("body-parser");

//   app.use(bodyParser.json());

//   app.use(
//     bodyParser.urlencoded({
//       extended: false,
//     })
//   );

//   // load functions
//   let fn = require("./functions.js")(fw);

//   fw.use(async (req, res, next) => {
//     try {
//       req.model = (filename) => {
//         return require("../app/models/" + filename)(req.db);
//       };
//       next();
//     } catch (e) {
//       next(e);
//     }
//   });

//   // error handler
//   fw.use((err, req, res, next) => {
//     res.error(err);
//   });

//   return fn;
// };

// module.exports = src;
