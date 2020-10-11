import express, { response } from "express";
import passport, { authenticate } from "passport";
import TrainList from "../models/trainList";

var router = express.Router();

/* GET Train listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
  });

  router.get("/trainlists", (req, res, next) => {
    TrainList.findById(req.params.id).then((data) => {
      res.json({
        success: true,
        trainLists: data,
      });
    });
  });

  router.post("/train/add", (req, res, next) => {
    console.log('req', req);
    passport.authenticate('jwt', {session:false}, async (err,user,info) => {
      try {
        const {role} = info;
        if(role.toLowerCase() !== ("admin")) {
          return res.status(403).send({
            success: false,
            err: "unauthorized access",
          });
        }
        const list = new TrainList(req.body);
        console.log(list)
        const savedList = list.save();
        if(savedList) {
          res.status(200).send({
                success: true,
                message : "Train Added",
                
          });
        }
      }catch(err) {
        console.log('error', err);
        return res.status(400).send({
          success: false,
          err: err.message,
        });
      }
     
    }) (req,res,next)
    
  });

/* delete train */
router.post("/train/delete", (req, res, next) => {
  
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    try {
        const trainListdel = TrainList.findById(req.trainList.id).exec();
        trainListdel.status = false;
        const trainListDel = await trainListdel.save();
        if(trainListDel) {
                res.status(200).send({message : "Train has been deleted"})   
        }
        
        
    }catch(err) {
        console.log('err', err);
        res.status(500).send(err.message);
    }    
})(
    req,
    res,
    next
  );

});

router.get("/search", async (req, res, next) => {
  console.log(req.body);
  try {
    const trains = await TrainList.find({ 'start': req.body.start, 'end': req.body.end }).exec();
    console.log('trains', trains);
    // then((err, data) => {
      res.json({
        success: true,
        trainLists: trains,
      });
    // });

  }catch(err) {
    console.log('err', err);
    res.status(404).json({
      success: true,
      err: err.message
    });
  }

 
});


  export default router;