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


module.exports = {
    register
  };