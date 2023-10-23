import nodemailer from "nodemailer";
// get all user
export const getAlluser = (req, res) => {
  res.send("message : I am from user");
};
// get all user
export const createUser = (req, res) => {
  res.status(200).json(req.body);
};
// get all user
export const registerUser = async (req, res) => {
  //create mail transport
  
  const transport = nodemailer.createTransport({

    host : process.env.MAIL_HOST,
    port : process.env.MAIL_PORT,
    auth : {
      user : process.env.MAIL_ADDRESS,
      pass : process.env.MAIL_PASS
    }

  })


 await transport.sendMail({
    from : `bd shop ${process.env.MAIL_ADDRESS}`,
    to : req.body.email,
    text : `your ar most wellcome`
  })


  res.status(200).json(req.body);
};
