const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const { validarJSON, validarCampos } = require("../middlewares/validar.middleware");
const fileUpload = require('express-fileupload');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      search:'/api/buscar',
      users: "/api/usuarios",
      categories: "/api/categorias",
      products: "/api/productos",
      uploads: "/api/uploads",
    };
    //Connect database

    this.connectDB();

    // Middlewares
    this.middlewares();

    // Application routes 

    this.routes();
  }
  async connectDB() {
    await dbConnection();
  }
  middlewares() {
    // CORS
    this.app.use(cors());

    // reading and parsing of body
    this.app.use(express.json());
    // Directory public
    this.app.use(express.static("public"));
    this.app.use(validarJSON);

    // Upload files - FileUpload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath:true
    }));
  }
  routes() {
    this.app.use(this.paths.users, require("../routes/user.routes"));
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/categories.routes"));
    this.app.use(this.paths.products, require("../routes/products.routes"));
    this.app.use(this.paths.search, require('../routes/search.routes'))
    this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Established connection on port  ${this.port}`);
    });
  }
}

module.exports = Server;