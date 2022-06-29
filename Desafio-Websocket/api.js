const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.productos = [];
  }

  async save(objeto) {
    let obj = objeto;
    let archivo = await fs.readFile(
      `./${this.archivo}`,
      "utf-8",
      (err, res) => {
        if (err) {
          obj.id = this.productos.length + 1;
          this.productos.push(obj);
          // console.log(this.productos)
          fs.promises.writeFile(
            `./${this.archivo}`,
            JSON.stringify(this.productos)
          );
          // console.log(`Archivo creado y objeto agregado con numero ${obj.id}`);
        } else {
          let data = JSON.parse(res);
          obj.id = data.length + 1;
          data.push(obj);
          this.productos = data;
          // console.log(data);
          fs.promises.writeFile(
            `./${this.archivo}`,
            JSON.stringify(this.productos)
          );
          // console.log(`Nuevo objeto agregado con ID: ${obj.id}`);
        }
      }
    );
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
       if(objBorrado){
        await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(arrNew));

       }else{
         console.log('No existe el objeto')
       }
    } catch (error) {
      console.log('Error')
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

module.exports=Contenedor