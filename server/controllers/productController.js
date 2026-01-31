import db from "../config/db.js";
import slugify from "slugify";

// Create Product
export const createProductController = async (req, res) => {
  try {
    // 1. We extract data from req.body (JSON), NOT req.fields
    const { name, description, price, category, quantity, image } = req.body;

    // 2. Simple Validation
    if (!name) return res.status(400).send({ error: "Name is required" });
    if (!description) return res.status(400).send({ error: "Description is required" });
    if (!price) return res.status(400).send({ error: "Price is required" });
    if (!category) return res.status(400).send({ error: "Category is required" });
    if (!quantity) return res.status(400).send({ error: "Quantity is required" });

    const slug = slugify(name, { lower: true });

    // 3. Insert into MySQL (Storing image as a URL string)
    // Ensure your DB table has 'image' column (VARCHAR or TEXT)
    const query = `
        INSERT INTO products (name, slug, description, price, category_id, quantity, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    // category comes as a string or ID from frontend
    const values = [name, slug, description, price, category, quantity, image];

    await db.query(query, values);

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

// Get All Products
export const getProductController = async (req, res) => {
  try {
    // 4. IMPORTANT: We alias 'id' as '_id' so your React code (key={p._id}) works
    const query = `
      SELECT id AS _id, name, slug, description, price, category_id AS category, quantity, image 
      FROM products 
      ORDER BY created_at DESC
    `;
    
    const [products] = await db.query(query);
    
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "All Products ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// Update Product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, image } = req.body;
    const { pid } = req.params; // This will receive the ID from the URL

    const slug = slugify(name, { lower: true });

    const query = `
        UPDATE products 
        SET name=?, slug=?, description=?, price=?, category_id=?, quantity=?, image=? 
        WHERE id=?
    `;

    await db.query(query, [name, slug, description, price, category, quantity, image, pid]);

    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};

// Delete Product
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    await db.query("DELETE FROM products WHERE id = ?", [pid]);
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

// Get Single Product (Optional, if needed for other pages)
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const [product] = await db.query(
        "SELECT id AS _id, name, slug, description, price, category_id, quantity, image FROM products WHERE slug = ?",
        [slug]
    );
    if (product.length === 0) return res.status(404).send({ success: false, message: "Product not found" });
    res.status(200).send({ success: true, message: "Single Product Fetched", product: product[0] });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error", error });
  }
};

// We don't need productPhotoController anymore because image is a URL string
export const productPhotoController = async (req, res) => {
    res.status(404).send({ message: "Use image URL instead" });
};