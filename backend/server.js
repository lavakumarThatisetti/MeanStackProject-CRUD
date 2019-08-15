 import express from 'express';

 //Acts as middel wars fro connecting mongodb and rest api calls
 import cors from 'cors';
 import bodyParser from 'body-parser';
 import mongoose from 'mongoose';
 import Issue from './models/issue';
import { runInNewContext } from 'vm';
 
 const app=express();
 const router=express.Router();

 app.use(cors());
 app.use(bodyParser.json());

 mongoose.connect('mongodb://localhost:27017/issues');  //Connected to mongotb issues collection

 const connection=mongoose.connection;

 connection.once('open',()=>{
     console.log("MongoDB databse connection established sucessfullly");
 })

router.route('/issues').get((req,res)=>{
    Issue.find((err,issues)=>{
        if(err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
            if(err)
                console.log(err);
            else
                res.json(issue);
    });
});

router.route('/issues/add').post((req,res)=>{
    let issue=new Issue(req.body);
    issue.save()
          .then(issue=>{
              res.status(200).json({'issue':'Added Successfully'});
          })
          .catch(err=>{
              res.status(400).send('Failed to creat enew record');
          });
});

router.route('/issues/update/:id').post((req,res)=>{
    Issue.findById(req.params.id,(err,issue)=>{
            if(!issue)
                return runInNewContext(new Error('Could not load document'));
            else    
                issue.title=req.body.title;
                issue.responsible=req.body.responsible;
                issue.description=req.body.description;
                issue.severity=req.body.severity;
                issue.status=req.body.status;

                issue.save()
                     .then(issue=>{
                        res.json('Update done');
                     })
                     .catch(err=>{
                        res.status(400).send('Updated failed');
                     });
    });
});

router.route('/issues/delete/:id').delete((req,res)=>{
    Issue.findByIdAndRemove({_id:req.params.id},(err,issue)=>{
            if(err)
                res.json(err);
            else
                res.json('Remove Sucessfully');
    });
});

 app.use('/',router);

 //app.get('/',(req,res)=>res.send("hello world! express"));
 
 app.listen(4000,()=>console.log("express running 4000 port"));