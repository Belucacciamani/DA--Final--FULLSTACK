import express from "express";
import pool from "../../config.js";

const router = express.Router();

// Listar categorías
router.get("/", async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM categories");
    res.status(200).json(result);
  } catch (error) {
    console.log("Error al listar categorías:", error);
    res.status(500).send("Error al listar categorías");
  }
});

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const { category_name, category_description } = req.body;

    // Validación de datos
    if (!category_name) {
      return res.status(400).send("El campo 'category_name' es obligatorio.");
    }

    const result = await pool.query(
      "INSERT INTO categories (category_name, category_description) VALUES (?, ?)",
      [category_name, category_description || ""] // 'category_description' es opcional
    );

    res.status(201).json({
      message: "Categoría creada con éxito",
      id_category: result.insertId, // Insertamos el ID de la nueva categoría
    });
  } catch (error) {
    console.log("Error al crear categoría:", error);
    res.status(500).send("Error al crear categoría");
  }
});

// Actualizar categoría
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name, category_description } = req.body;

    // Validación de datos
    if (!category_name) {
      return res.status(400).send("El campo 'category_name' es obligatorio.");
    }

    // Actualizar la categoría
    await pool.query(
      "UPDATE categories SET category_name = ?, category_description = ? WHERE id_category = ?",
      [category_name, category_description || "", id]
    );

    res.status(200).send("Categoría actualizada con éxito");
  } catch (error) {
    console.log("Error al actualizar categoría:", error);
    res.status(500).send("Error al actualizar categoría");
  }
});

// Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar los productos asociados a la categoría
    await pool.query("DELETE FROM products WHERE category_id = ?", [id]);

    // Eliminar la categoría
    await pool.query("DELETE FROM categories WHERE id_category = ?", [id]);

    res.status(200).send("Categoría y productos eliminados con éxito");
  } catch (error) {s
    console.log("Error al eliminar categoría:", error);
    res.status(500).send("Error al eliminar categoría");
  }
});

export default router;
