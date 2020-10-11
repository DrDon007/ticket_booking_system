import express from "express";
import passport from 'passport';
import mongoose, { Schema } from 'mongoose';
// import User from '../models/user';
import {Booking} from "../models/booking";
import Profile from '../models/profile';

var router = express.Router();

/* GET home page. */
router.get("/bookings", function (req, res, next) {

    passport.authenticate("jwt", { session: false }, async (err, user, info) => {
        try {
            const bookings  = await Profile.findById(info.user.profile._id, "bookings").populate('bookings');
            if(!bookings) {
                return res.status(404).send({
                    message : "No bookings found"
                })
            }
            res.status(200).send(bookings);
        }
        catch(err) {
            res.status(500).send({"message" : "oops! something wrong happens"});
        }
        
    })(
        req,
        res,
        next
      );
  

});

router.post("/booking", function (req, res, next) {

    passport.authenticate("jwt", { session: false }, async (err, user, info) => {
        try {
            const {user} = info;
            console.log("what i want is user", user._id);
            const trainPNR  = `${req.body.trainid}${Math.floor(Math.random() * Math.floor(10))}`;
            const profile = await Profile.findById(user.profile._id).exec();
            
            const booking =  new Booking ({
                    trainNo: req.body.trainid,
                    seatNo : req.body.seatno,
                    status : true,
                    trainPNR: trainPNR,
                
            });
            const bookingDone = await booking.save();
            if(bookingDone) {
                profile.bookings.push(booking);
                const updatedProfile = profile.save();
                if(updatedProfile) {
                    res.status(200).send({message : "ohoho! Back your bags up"})
                }
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
router.post("/booking/cancel", function (req, res, next) {

    passport.authenticate("jwt", { session: false }, async (err, user, info) => {
        try {
            const booking = Booking.findById(req.booking.id).exec();
            booking.status = false;
            const bookingCancelled = await booking.save();
            if(bookingCancelled) {
                    res.status(200).send({message : "See You soon mate"})   
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

export default router;