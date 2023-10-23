import { log } from "console";
import { createateSlug, getRandomUniqueID } from "../helpers/helper.js";
import fs from "fs";

// get all product
export const getAllProduct = (req, res) => {
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());
  if (productData.length === 0) {
    res.status(404).json({ message: "Product Data not found" });
  }
  res.status(200).json({ products: productData });
};
// get single product
export const getSingleProduct = (req, res) => {
  const { slug } = req.params;
  //console.log(slug);
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());
  const singleProduct = productData.find((data) => data.slug === slug);
  if (!singleProduct) {
    res.status(404).json({ message: "Single Product not found" });
    return;
  }
  res.status(200).json({ singleProduct });
};

// create all product
export const createProduct = (req, res) => {
  const { name, regularPrice, salePrice, stock } = req.body;

  if (!name || !regularPrice) {
    res.status(400).json({ message: "Product name and price is required" });
    return;
  }

  //const productData = fs.readFileSync("db/product.json").toString();
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());
  //console.log(productData);

  // product name check
  if (productData.some((data) => data.slug === createateSlug(name))) {
    res.status(400).json({ message: "Product already exists" });
    return;
  }

  const product = {
    id: getRandomUniqueID(),
    name,
    slug: createateSlug(name),
    regularPrice,
    salePrice,
    stock,
    photo: req.file.filename,
  };

  productData.push(product);

  fs.writeFileSync("db/product.json", JSON.stringify(productData));

  res.redirect("/");
};

// delete single product
export const deleteProduct = (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());
  const updatedData = productData.filter((data) => data.id !== id);
  fs.writeFileSync("db/product.json", JSON.stringify(updatedData));

  // res.status(200).json({ message: "Product data deleted" });
  res.redirect("/");
};

//showProductPage
export const showProductPage = (req, res) => {
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

  res.render("product", {
    products: productData,
  });
};
//---------------------showCreateProductPage
export const showCreateProductPage = (req, res) => {
  res.render("create");
};
//--------------------showSingleProductPage
export const showSingleProductPage = (req, res) => {
  const { slug } = req.params;
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

  //get single product
  const singleProduct = productData.find((data) => data.slug === slug);
  res.render("show", {
    product: singleProduct,
  });
};

// -------------------------showEditProductPage
export const showEditProductPage = (req, res) => {
  const { id } = req.params;
  //
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

  //get Edit Product Page
  const editProduct = productData.find((data) => data.id === id);

  res.render("edit", {
    product: editProduct,
  });
};

//-----------updateProduct
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, regularPrice, salePrice, stock } = req.body;
  //get all products
  const productData = JSON.parse(fs.readFileSync("db/product.json").toString());

  // photo manage
  let photo_name =
    productData[productData.findIndex((data) => data.id === id)].photo;
  if (req?.file?.filename) {
    photo_name = req.file.filename;
  }

  productData[productData.findIndex((data) => data.id === id)] = {
    id: id,
    slug: createateSlug(name),
    name,
    regularPrice,
    salePrice,
    stock,
    photo: photo_name,
  };
  //console.log(req.params);

  fs.writeFileSync("db/product.json", JSON.stringify(productData));

  res.redirect("/");
};
