import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { promises as fs } from "fs";

const app = express();

// MIDDLEWARES ==========================================
app.use(express.json());
app.use(cors());

// global custom middleware
// якщо не прописаний ендпоінт, то мідлвар буде спрацьовувати на УСІ запити
app.use((req, res, next) => {
  console.log("Hello from middleware!!!");

  req.time = new Date().toLocaleString("uk-UA");

  // зробили маніпуляції з ріквестом, респонс вона не віддає і викликає некст
  // (наступний мідлвар, якщо він є або перекине в наступний контроллер)
  next();
});

app.use("/users/:userID", async (req, res, next) => {
  try {
    const { userID } = req.params;

    if (userID.length < 10) {
      res.status(400).json({ message: "Failed (((" });
      return;
    }

    const usersDB = await fs.readFile("users.json");
    const users = JSON.parse(usersDB);

    const user = users.find((el) => el.id === req.params.userID);

    if (!user) {
      res.status(404).json({
        message: "User is not found",
      });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
  }
});

// CONTROLLERS ==========================================
app.get("/ping", (req, res) => {
  //   console.log(req);
  //   res.send("<h1>Hello from server!!!</h1>");
  //   res.sendStatus(201);
  res.status(200).json({
    // message: "Hello from JSON",
    message: "PONG !",
  });
});

/**
 * HTTP methods ==========================================
 * POST, GET, PUT, PATCH, DELETE
 *
 * REST API (CRUD operations)
 * POST         /users              - user creation
 * GET          /users              - get users list
 * GET          /users//<userUD>    - get one user
 * PATCH (PUT)  /users//<userUD>    - update one user
 * DELETE       /users//<userUD>    - remove one user
 */

app.post("/users", async (req, res) => {
  try {
    // console.log({ user: req.body });
    // res.status(201).json({ message: "Success!" });
    const { name, year } = req.body;

    //   TODO: req.body validation!!!!!

    const newUser = {
      id: nanoid(),
      name,
      year,
    };

    //   Save new user to the "DB"
    const usersDB = await fs.readFile("users.json");
    const users = JSON.parse(usersDB);
    // console.log({ users });

    users.push(newUser);

    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    res.status(201).json({
      message: "Success!",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const usersDB = await fs.readFile("users.json");
    const users = JSON.parse(usersDB);

    res.status(201).json({
      message: "Success!",
      users,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/users/:userID", async (req, res) => {
  //   console.log(req.params);
  try {
    // const usersDB = await fs.readFile("users.json");
    // const users = JSON.parse(usersDB);

    // const user = users.find((el) => el.id === req.params.userID);

    res.status(201).json({
      message: "Success!",
      //   user,
      user: req.user,
      time: req.time,
    });
  } catch (error) {
    console.log(error);
  }
});

// app.patch("/users/:userID", async (req, res) => {});
// app.delete("/users/:userID", async (req, res) => {});

// SERVER INIT ===========================================
const port = 3001;

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
