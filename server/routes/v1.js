const router = require("express").Router();
const userCtrl = require("../controllers/user");

router.get("/", (req, res) => {
  res.status(404).json({
    name: "Movies Reviews API",
    description:
      "A RESTful API that works in companion with themoviedb.org RESTful API to allow users to interact with movies.",
    url: "https://movie-reviews.herokuapp.com/api",
    home: "https://movie-reviews.herokuapp.com/",
    routes: {
      "/": {
        methods: ["GET"]
      },
      "/v1": {
        methods: ["GET"]
      },
      "/v1/users/": {
        methods: ["GET", "POST"]
      },
      "/v1/users/:user_id": {
        methods: ["GET", "PUT", "DELETE"]
      },
      "/v1/auth/": {
        methods: ["POST"]
      }
    }
  });
});

router.post("/signup", userCtrl.signup);
router.post("/auth", userCtrl.auth);

module.exports = router;
