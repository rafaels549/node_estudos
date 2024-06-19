const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register  =  async (req,res) => {
    const {name, email, password, confirmPassword} = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "As senhas não coincidem." });
      }
     const userExists = await User.findOne({email:email})

     const salt = await bcrypt.genSalt(12);
     const passwordHash = await bcrypt.hash(password, salt);
      if(userExists){
         return res.status(500).json("Usuário já existe")
      }
        
        const newUser = await User.create({
          name,
          email,
          passwordHash
        });
        try {
        newUser.save()
    
        
        return res.status(201).json("Usuário criado com sucesso");
      } catch (error) {

        console.error("Erro ao registrar usuário:", error);
        return res.status(500).json({ error: "Erro ao registrar usuário." });
      }
    
}

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}

const login  = async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado!" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha inválida" });
    }
  

    try {
      const secret = process.env.SECRET;
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
  
      res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
}


module.exports = {
    register
  };