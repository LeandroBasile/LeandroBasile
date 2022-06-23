const { Router } = require("express");

const router = Router();

const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.productos = [];
  }

  async save(objeto) {
    let obj = objeto;
    let archivo = fs.readFile(`./${this.archivo}`, "utf-8", (err, res) => {
      if (err) {
        obj.id = this.productos.length + 1;
        this.productos.push(obj);
        // console.log(this.productos)
        fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(this.productos)
        );
        console.log(`Archivo creado y objeto agregado con numero ${obj.id}`);
      } else {
        let data = JSON.parse(res);
        obj.id = data.length + 1;
        data.push(obj);
        this.productos = data;
        console.log(data);
        fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(this.productos)
        );
        console.log(`Nuevo objeto agregado con ID: ${obj.id}`);
      }
    });
  }

  async getById(id) {
    try {
      let arch = JSON.parse(
        await fs.promises.readFile(`./${this.archivo}`, "utf-8")
      );
      // console.log(arch);
      let obj = arch.filter((e) => e.id == id);

      if (obj[0].id != id) {
        console.log(null);
        return null;
      } else {
        console.log(obj[0]);
        return obj[0];
      }
    } catch (error) {
      console.log("No existe el objeto");
    }
  }

  async getAll() {
    try {
      let data = await fs.promises.readFile(`./${this.archivo}`, "utf-8");
      let obj = JSON.parse(data);
      if (obj.length <= 0) {
        return console.log("Array Vacio");
      } else {
        return obj;
      }
    } catch (error) {
      console.log("error");
    }
  }

  async deleteById(id) {
    try {
      this.productos = await this.getAll().then((res) => {
        return res;
      });
      let objBorrado = this.productos.filter((e) => e.id == id);

      let obj = this.productos.filter((e) => e.id != id);
      let arrNew = obj;
      //  let idNew = arrNew.map((e) => e);
      console.log(this.productos);
      if (objBorrado) {
        await fs.promises.writeFile(
          `./${this.archivo}`,
          JSON.stringify(arrNew)
        );
      } else {
        console.log("No existe el objeto");
      }
    } catch (error) {
      console.log("Error");
    }
  }

  async deleteAll() {
    this.productos = await this.getAll().then((res) => {
      return res;
    });

    this.productos = [];
    // console.log(this.productos);
    await fs.promises.writeFile(
      `./${this.archivo}`,
      JSON.stringify(this.productos)
    );
  }
}
const productos = new Contenedor("productos.txt");

router.get("/productos", async (req, res) => {
  try {
    let todosLosProductos = await productos.getAll().then((res) => {
      return res;
    });
    //   console.log(todosLosProductos);
    res.json(todosLosProductos);
  } catch (error) {
    console.log("error pa");
  }
  // res.sendFile('../public/index.html')
});

router.post("/productos", async (req, res) => {
  let title = req.body.title;
  let price = req.body.price;
  let thumbnail = req.body.thumbnail;

  let obj = { title, price, thumbnail };
  console.log(obj);
  try {
    await productos.save(obj).then((res) => {
      return res;
    });
    console.log("creado");
  } catch (error) {
    console.log("error pa");
  }
  res.sendStatus(201);
});

// router.get("/productoRandom", async (req, res) => {
//   try {
//     let todosLosProductos = await productos.getAll().then((res) => {
//       return res;
//     });
//     let id = todosLosProductos.map((e) => e.id);
//     let numero = Math.floor(Math.random() * (id.length))+1;
//     let objRandom = todosLosProductos.filter((e) => e.id === numero);

//     res.send(objRandom);

//     console.log(numero)
//   } catch (error) {
//     console.log("error pa");
//   }
// });

router.put("/productos/:id", async (req, res) => {
  let id = Number(req.params.id);
  let newTitle = req.body.title;
  let newPrice = req.body.price;
  let newThumbnail = req.body.thumbnail;
  try {
    let todo = await productos.getAll().then((res) => {
      return res;
    });
    let productoBuscado = await productos.getById(id).then((res) => {
      return res;
    });

    let title = (productoBuscado.title = newTitle);
    let price = (productoBuscado.price = newPrice);
    let thumbnail = (productoBuscado.thumbnail = newThumbnail);

    productoBuscado = { title, price, thumbnail, id };

  
    const indiceEncontrado = todo.findIndex((producto) => {
      return producto.id === id;
    });
    if (indiceEncontrado === -1) {
      return;
    } else {
      todo[indiceEncontrado] = productoBuscado;
      fs.writeFileSync(`./${productos.archivo}`, JSON.stringify(todo));
      console.log(todo);
    }

    res.json(201);
  } catch (error) {
    console.log("error pa");
  }
});



router.get("/productos/:id", async (req, res) => {
  let id = req.params.id;
  let productoBuscado = await productos.getById(id).then((res) => {
    return res;
  });

  try {
    console.log(productoBuscado);
    res.json(productoBuscado);
  } catch (error) {
    console.log("error pa");
  }
});

router.delete("/productos/:id", async (req, res) => {
  let id = req.params.id;
  try {
    await productos.deleteById(id).then((res) => {
      return res;
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("error pa");
  }
});

module.exports = router;
