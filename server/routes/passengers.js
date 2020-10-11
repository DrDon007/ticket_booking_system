import express, { response } from "express";
import Passenger from "../models/passenger";

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/list/passengers", (req, res, next) => {
    Passenger.findById(req.params.id).then((data) => {
    res.json({
      success: true,
      passengers: data,
    });
  });
});

router.post("/add/passenger", (req, res, next) => {
  const passenger = new Passenger(req.body);
  passenger.save((err, data) => {
    if (err) {
      return res.sendStatus(400).send({
        success: false,
        err: err,
      });
    }
    res.send({
      success: true,
      passengers: data,
    });
  });
});
export default router;
