import express from "express";
import {CheckUserPassword, CreateNewUser} from "../crud/crud";
import { UserSignUpValidator } from "../schemas/schemas";



 export const authRouter = () => {

     const router = express.Router();

     router.post("/signup", (req, res) => {
         const {error, value} = UserSignUpValidator(req.body)
         if (error) {
             res.status(400)
             res.json(error).send()
         } else {
                 CreateNewUser(value).then(userId => {
                     res.status(201).json(userId).send()
                    }).catch(err => {
                        if (err == "User already exists") {
                            res.status(400)
                            res.json(err).send()
                        } else {
                            res.status(500).json(`Internal Server Error: ${err}`).send()
                        }
                    })
         }
        });

     return router;
 }

 export const loginRouter = () => {
     const router = express.Router();

     router.get("/login",  (req, res) => {
         CheckUserPassword(req.body).then((result) => {
             res.status(200).send("Correct Credentials")
         }).catch(err => {
             res.status(401).send(err)
         })

     });

     return router;
 }