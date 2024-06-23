const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const express=require('express')
const app=express();
const enc=require('bcrypt')
const mail=require('nodemailer');
const DomainName = 'ptbsx256-8080.uks1.devtunnels.ms';

let paass='Georges^Georges';
let myMail='TheWanderWalks@gmail.com';
let Admin='adminWanderWalks@gmail.com';
let Admin2='!@ak-47#theadminisme';
//----------------------------------Functions-------------------------//
    async function Hashing(pass){
    try {
        const salt=enc.genSalt();
        const hashed =await enc.hash(pass,salt);
        return hashed;
    } catch (err) {
        res.send(err);
}
        }

    function PhoneValidation (value){
    let PhoneValidation=/ 0\d{10} /; //maxLength = 11
    value.test(PhoneValidation);
  
    if(value.test(PhoneValidation)===false)

        return false;
    else 
    return true;
     }
    
    function EmailValidation (value){
        let EmailValidation=/\w+@(gmail|hotmail|yahoo).com /i; 
        if(value.test(EmailValidation)===false)
            return false;
        else if(value===""){
    alert("the email field is empty");
        }
        else 
        return true;
        }
        function PasswordValidation (value){
    
    let PasswordValidation=/ \w{8,}/;
    
    if(value.test(PasswordValidation)===false)
                return false;
            else if(value===""){
                alert("the password field is empty");
            }
            else 
            return true;
    
        }
    
        let Sessions=[];//fel register
        class Session{
            constructor (Sid,Uid){   //fel register
                this.Sessionid = Sid;
                this.Userid = Uid;
            }
            CheckSession(req){
                for (let i = 0; i < Sessions.length; i++) {
                    if(req.sessionid===Sessions[i].sessionid){
                        return sessionid[i].Userid;
                    }
                    return null;

            }
        }
    }

       
          
//-----------------------------End of functions---------------------------------//
const userLogin=(req,res)=>{
  app.render('login',{domainName:DomainName})

    el2sm=req.body.un;
    elpass=req.body.pp;
    
    const userUN =userModel.findOne({Email:el2sm},{Email:1});
    const userP =userModel.findOne({Email:el2sm},{Password:1});
    if((el2sm===Admin)&&(enc.compare(elapss,Admin2)===true)){
        res.render('Admin',{domainName:DomainName});
    }
    if(userUN!=el2sm){

      res.status(401).json({message:"the Email is not correct"});
    }

  if  (enc.compare(elpass,userP)===false){

    res.status(401).json({message:"the password is not correct"});
}   
req.session.saveUninitialized=true;

if(Session.CheckSession(req)===null){
    res.status(401).json({message:"you don't have an account try register"});
}





 res.redirect('./Home',{domainName:DomainName});
}





const userRegister=async (req,res)=>{
   app.render('signUp',{domainName:DomainName})
    
    let namee=req.body.un
    el2sm=namee.split('@');
   
    let email=req.body.un
    EmailValidation(email);
    if(EmailValidation===false)
        res.status(401).json({message:"the Email is invaild"});
    
    passbefore=req.body.pp
    PasswordValidation(passbefore);
    let elpass=Hashing(passbefore);

    if(PasswordValidation===false)
        res.status(401).json({message:"the password is not valid"});

    
    let  phone=req.body.ph
    PhoneValidation(phone);
    
    if(PhoneValidation===false)
        res.status(401).json({message:"the Phone number is not valid"});

    if(req.body.g1===true)
        gen='male'
    else
    gen='female'

let city=req.body.city;
let address=req.body.address;

req.session.saveUninitialized=true;


let NewUserData={username:el2sm, email:email, phoneNumber:phone, gender:gen ,password:elpass,city:city, street:address}
try {
    const newUser = new userModel.create(NewUserData);
    newUser.save();
    //const obj=await data.create( NewUserData);
    res.status(200).json(NewUserData);
}
catch (error) {
    console.log(error);
    res.status(500).json({message:error});

}

UID=userModel.findOne({Email:email,Password:elpass},{_id:1});
SID=req.sessionID;
Session(UID,SID);
Sessions.push(SID);


res.redirect('Success',{domainName:DomainName});
res.redirect("Home",{domainName:DomainName});

}






const userForgotPassword=async (req,res)=>{
   app.render('ForgetPassword',{domainName:DomainName});
     const Email =req.body.un;
       if( EmailValidation(Email)!==true){res.status(401).json({message:"that's not a valid email "})}
        else if(user=await userModel.findOne({Email}) ===null){
            res.status(404).json({message:"this email is not found "});
        }
        else{
            
            let userpass = user.password; 
            const jwt_secret="theinvalidofthevalid";
        const secret=jwt_secret+userpass;
        const token=jwt.sign(payload,secret,{expiresIn:'60m'});
        const link=`http://localhost:3000/UpdatingThePassword/${user._id}/${token}`
        }
        
 
     
        const transporter=mail.createTransport({

        service:'Gmail',
        auth:{
            user:myMail,
            pass:paass
        }
     });
const MailDetails={
    from: myMail,
    to: Email,
    subject:'You Forgot your Password',
   html:
  ` <p>you request a password reset</p>
   <p>click the link below to reset your password notice the link is available for one hour </p>
   <a href=link>ResetPassword</a>
  <p>if you didn't request a password reset ignore this email</p>`
}
transporter.sendMail(MailDetails,(error,info)=>{
    if(error){
        console.log(error);
        
    }
    else{
res.json({message:"check your email to reset your password"})
}
})

}


const userUpdatdePassword=(req,res)=>{
   app.render('newPass',{domainName:DomainName});
    reqt.session.saveUninitialized=true;
    const Ncpass=req.body.pp2; 
    const Npass=req.body.pp;
    PasswordValidation(Ncpass);
    PasswordValidation(Npass);
    if(Npass!=Ncpass)
        res.status(500).json({message: 'the password does not match'});
    else{
        let  passAfter=Hashing(Npass);
        const userID= Session.CheckSession(req);
        userModel.findByIdAndUpdate(userID,{password:passAfter});
        res.status(200).json({message: 'password updated successfully'});

}
    

}
const Success=(req,res)=>{Router.render('Success')};
module.exports={userLogin,userForgotPassword,userRegister,userUpdatdePassword,userUpdatdePassword,Success}





