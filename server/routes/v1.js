const router = require("express").Router();
const userCtrl = require("../controllers/user");
const movieCtrl = require("../controllers/movie");
const commentCtrl = require("../controllers/comment");

router.get("/", (req, res) => {
  res.status(404).json({
    name: "Movie Reviews API",
    description:
      "A RESTful API that works in companion with themoviedb.org RESTful API to allow users to interact with movies.",
    url: "https://movie-reviews.herokuapp.com/api",
    home: "https://movie-reviews.herokuapp.com/"
  });
});

router.post("/signup", userCtrl.signup);
router.post("/auth", userCtrl.auth);

router.get("/movies", movieCtrl.getAll);
// router.get("/movies/:id", movieCtrl.getOne);
router.post("/movies", movieCtrl.create);
router.post("/movies/list", movieCtrl.addToList);
router.delete("/movies/list", movieCtrl.removeFromList);

router.get("/comments/:movie_id", commentCtrl.getAll);
router.put("/comments/:comment_id", commentCtrl.update);
router.post("/comments", commentCtrl.create);
router.delete("/comments/:comment_id", commentCtrl.remove);

module.exports = router;
