const express = require("express");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");
const router = express.Router();

const stuffCtrl = require("../controllers/stuff");

router.get("/", auth, stuffCtrl.getAllStuff);
router.post("/", auth, multer, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

module.exports = router;

/* ce fichier router sert à regrouper les routes au même endroit mais sans 
la logique à l'interieur car elle est dans stuff controller, tt ca est possible grace a express.router, 
bien mettre router. et non pas app. comme on l'a fait précédemment. */
