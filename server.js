const express = require("express");
const app = express();
const db = require("./database/connections");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cookieParser());
app.use(express.static("assest"));
app.use(express.urlencoded());
app.use(cors());
app.use(express.json());
const saltRounds = 10;

//  app.get("/", (req , res) => {
//     res.json({"users": ["userOne","userTwo","userThree","5555","saima"]})
//  })

app.listen(5000, () => {
  //console.log("server started on port 5000");
});

app.get("/productList", async (req, res) => {
  let productTable = await db.query(`SELECT * FROM products`);
  // //console.log(productTable.rows);
  ////console.log("hii");
  res.send(JSON.stringify({ products: productTable.rows }));
});

app.post("/saveProductList", express.urlencoded(), (request, response) => {
  //const html=App.App;
  //console.log("i'm in post");
  const productList = request.body.products;
  //console.log(productList);
  productList.map((product) =>
    db.query(
      `INSERT INTO products (product_id, image, name, price, category) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [product.id, product.image, product.name, product.price, product.category]
    )
  );
  //console.log("done db");
  response.send(JSON.stringify({ saved: "saved succecfully" }));
  //response.status(200).json(productList)
  //response.send(JSON.stringify(productList));
});

app.get("/SignUp", (req, res) => {
  res.send("get signup");
});

app.post("/SignUp", (req, res) => {
  //console.log(req.body);
  try {
    const { username, email, phonenumber, password } = req.body;
    bcrypt.hash(password, saltRounds);
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    db.query(
      `INSERT INTO users (username, email, phonenumber, password) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, phonenumber, hash]
    )
      .then(() => {
        //res.redirect('/');
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
      });
  } catch (e) {
    console.log(e);
  }
});
app.get("/LogIn", (req, res) => {
  res.send("get login");
});
app.post("/LogIn", async (req, res) => {
  try {
    let email = req.body.email;

    //console.log(`in log in ${email}`);
    let password = req.body.password;
    res.cookie("email", email, { maxAge: 600000 });

    let haspass = await db.query(
      `SELECT  password FROM users WHERE email = $1 `,
      [email]
    ); ///
    let pass = haspass.rows.map((e) => e.password);

    let users = await db.query(`SELECT  email FROM users WHERE email = $1 `, [
      email,
    ]);

    let newusers = users.rows.map((e) => e.email);
    ////console.log(await bcrypt.compare(password,pass[0]));
    let comparepass = await bcrypt.compare(password, pass[0]);

    if (newusers.length === 0) {
      res.send("the use not found");
    } else if (newusers[0] === users.rows[0].email && comparepass === true) {
      //res.redirect('/home');
      //console.log("correct Password");
      res.send(JSON.stringify({ answer: "correct Password" }));
    } else if (newusers[0] === users.rows[0].email && comparepass === false) {
      //console.log("Wrong Password");
      res.send(JSON.stringify({ answer: "Wrong Password" }));
    }
  } catch (err) {
    //console.log(err);
    res.send(`not found`);
  }
});

app.post("/profile", async (req, res) => {
  let email = req.body.email.email;
  //console.log(email);
  //console.log("whyy?!");
  let user = await db.query(`SELECT * FROM users WHERE email = $1 `, [email]);
  //console.log(user.rows);
  res.send(JSON.stringify({ user: user.rows[0] }));
});

app.post("/updateProfile", (req, res) => {
  //console.log(req.body);
  //console.log("im in update profile");
  const { id, username, email, phonenumber } = req.body;
  db.query(
    `UPDATE users SET username=($1), email=($2), phonenumber=($3) WHERE id=($4)`,
    [username, email, phonenumber, id]
  )
    .then(() => {
      //res.redirect('/');
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});

app.post("/deleteItemCart", (req, res) => {
  //console.log(req.body);
  const { id } = req.body;
  db.query(`DELETE FROM cart  WHERE id=($1)`, [id])
    .then(() => {
      //res.redirect('/');
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});

app.post("/addItemCart", (req, res) => {
  //console.log(req.body);
  //console.log("im in addItemCart");
  const { email, id, image, name, price, category } = req.body;
  db.query(
    `INSERT INTO cart (email,product_id, image, name, price, category) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
    [email, id, image, name, price, category]
  )
    .then(() => {
      //res.redirect('/');
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});

app.post("/getCart", (req, res) => {
  //console.log(req.body);
  //console.log("im in getCart");
  const { email } = req.body;
  //console.log("*");
  //console.log(email);
  let cart = db
    .query(`SELECT * FROM cart WHERE email=($1)`, [email])
    .then((result) => {
      //console.log(result.rows);
      res.send(JSON.stringify({ cart: result.rows }));
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});
app.post("/clearCart", (req, res) => {
  //console.log(req.body);
  const { email } = req.body;
  db.query(`DELETE FROM cart  WHERE email=($1)`, [email])
    .then(() => {
      //res.redirect('/');
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});

app.post("/addCartToHistory", (req, res) => {
  //console.log(req.body);
  //console.log("im in addItemCart");
  const { cart } = req.body;
  cart.map((item) =>
    db
      .query(
        `INSERT INTO history (email,product_id, image, name, price, category) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *`,
        [item.email, item.id, item.image, item.name, item.price, item.category]
      )
      .then(() => {
        res.send(JSON.stringify({ status: "done" }));
      })
      .catch((error) => {
        //res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
      })
  );
});
app.post("/getHistory", (req, res) => {
  //console.log(req.body);
  //console.log("im in gethistory");
  const { email } = req.body;

  let cart = db
    .query(`SELECT * FROM history WHERE email=($1)`, [email])
    .then((result) => {
      //console.log(result.rows);
      res.send(JSON.stringify({ history: result.rows }));
    })
    .catch((error) => {
      res.status(500).send(`<h1>Something went wrong saving your data</h1>`);
    });
});
