const router = require("express").Router();
const userCtrl = require("../controllers/user");
const movieCtrl = require("../controllers/movie");

router.get("/", (req, res) => {
  res.status(404).json({
    name: "Movie Reviews API",
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

router.get("/movies", movieCtrl.getAll);
router.get("/movies/:id", movieCtrl.getOne);
router.post("/movies", movieCtrl.create);
router.post("/movies/list", movieCtrl.addToList);
router.delete("/movies/list", movieCtrl.removeFromList);
router.post("/movies/comments", movieCtrl.addComments);

module.exports = router;
