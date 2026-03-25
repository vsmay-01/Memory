import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomAuth = (token[0]!=='!');

    let decodedData;

    if (!(token && isCustomAuth)) { 
      
      decodedData = token.slice(1);

      req.userId = decodedData;
    } else {

      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;