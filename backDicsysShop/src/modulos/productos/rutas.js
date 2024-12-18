import express from "express";
import pool from "../../config.js";

const router = express.Router();

// Listar productos
router.get("/", async (req, res) => {
  try {

    const [result] = await pool.query("select * from products");
   
    if (result.length === 0) {
      return res.status(404).json({ message: "No hay categorías" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error al listar productos", error);
    res.status(404).json({ message: "Error al listar categorías" });
  }
});



// Listar productos por categoría
router.get("/:category_id", async (req, res) => {

  try {    
    const { category_id } = req.params;
   
    const [result] = await pool.query(
      "SELECT * FROM products WHERE category_id = ?",
      [category_id]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay productos para esta categoría" });
    }

    
    res.status(200).json(result);

  } catch (error) {
    console.error("Error al listar productos por categoría", error);
    res
      .status(500)
      .json({ message: "Error al listar productos por categoría" });
  }
});



// Crear producto
router.post("/", async (req, res) => {
  try {
    const {
      product_name,
      product_description,
      product_price,
      product_stock,
      category_id,
    } = req.body;

    // Validar campos obligatorios
    if (!product_name || !product_price || !product_stock || !category_id) {
      return res
        .status(400)
        .send(
          "Error: Los campos 'Nombre', 'Precio', 'Stock' y 'categoria id' son obligatorios"
        );
    }

    const result = await pool.query(
      "INSERT INTO products (product_name, product_description, product_price, product_stock, category_id) VALUES (?, ?, ?, ?, ?)",
      [
        product_name,
        product_description,
        product_price,
        product_stock,
        category_id,
      ]
    );
    const newProductId = result.insertId;
    res.send({ message: "Producto creado con éxito", id: newProductId });
  } catch (error) {
    console.log("Error al crear producto", error);
    res.status(404).send("Error al crear producto");
  }
});

// Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_name,
      product_description,
      product_price,
      product_stock,
      category_id,
    } = req.body;

    // Validar campos obligatorios
    if (!product_name || !product_price || !product_stock || !category_id) {
      return res.status(400).send("Todos los campos son obligatorios");
    }

    await pool.query(
      "UPDATE products SET product_name = ?, product_description = ?, product_price = ?, product_stock = ?, category_id = ? WHERE id_product = ?",
      [
        product_name,
        product_description,
        product_price,
        product_stock,
        category_id,
        id,
      ]
    );

    res.json({
      message: "Producto actualizado con éxito",
    });
  } catch (error) {
    console.log("Error al actualizar producto", error);
    res.status(404).send("Error al actualizar producto");
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar el producto
    await pool.query("DELETE FROM products WHERE id_product = ?", [id]);

    res.json({
      message: "Producto eliminado con éxito",
      data: { id },
    });
  } catch (error) {
    console.log("Error al eliminar producto", error);
    res.status(404).send("Error al eliminar producto");
  }
});

export default router;
