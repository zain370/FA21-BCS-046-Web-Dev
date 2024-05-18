const express = require("express");
const router = express.Router();
let Product = require("../models/Product");
let checkSessAuth = require("../middlewares/checkSessAuth");

// router.get("/", (req, res) => {
//     res.render("homepage", { title: "Homepage" })
// })


router.get("/men-collection", async (req, res) => {
    try {
        const products = await Product.find({ category: "men" });
        res.render("men-collection", { title: "Men Collection", products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get("/women-collection", async (req, res) => {
    try {
        const products = await Product.find({ category: "women" });
        res.render("women-collection", { title: "Women Collection", products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

router.get("/sports-collection", async (req, res) => {
    try {
        const products = await Product.find({ category: "sports" });
        res.render("sports-collection", { title: "Sports Collection", products });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


router.get("/contact", checkSessAuth, (req, res) => {
    res.render("contact", { title: "Contact Us" })
})

router.get("/men-collection", (req, res) => {
    res.render("men-collection", { title: "Men Collection" })
})

router.get("/add-product", checkSessAuth, (req, res) => {
    res.render("add-product", { title: "Admin Panel" })
})

router.get("/view-product", checkSessAuth, async (req, res) => {
    let products = await Product.find();
    res.render("view-product", { title: "Admin Panel", products })
})

router.get("/edit-product", checkSessAuth, (req, res) => {
    res.render("edit-product", { title: "Admin Panel" })
})


// Assuming you have a function `getProducts` that fetches products from your database
// const getProducts = async (page, limit) => {
//     // Mock function for demonstration. Replace with your actual data fetching logic.
//     const allProducts = [
//         //... (array of all product objects)
//     ];
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     return allProducts.slice(startIndex, endIndex);
// };

// router.get("/", async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 8;
//     const products = await getProducts(page, limit);

//     res.render("homepage", { title: "Homepage", products, page });
// });





router.get("/", async (req, res) => {
    try {
      const limit = 8;
      const products = await Product.find().limit(limit);
      const productCount = await Product.countDocuments();
      res.render("homepage", { title: "Homepage", products, pageNumber: 1, productCount, limit });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  
  router.get("/:pageNumber", async (req, res) => {
    try {
      let pageNumber = parseInt(req.params.pageNumber, 10);
      if (!pageNumber || pageNumber < 1) {
        pageNumber = 1;
      }
  
      const limit = 8;
      const skip = (pageNumber - 1) * limit;
      const products = await Product.find().limit(limit).skip(skip);
      const productCount = await Product.countDocuments();
  
      res.render("homepage", { title: "Homepage", products, pageNumber, productCount, limit });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  

module.exports = router;