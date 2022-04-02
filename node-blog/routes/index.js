let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
mongoose.connect("localhost:27017/EmployeeData");
let Schema = mongoose.Schema;

const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

let employeeSchema = new Schema(
  {
    userName: String,
    userAge: Number,
    userRole: String,
  },
  { collection: "employees" }
);
let EmployeeModel = mongoose.model("employeeInfo", employeeSchema);

let accountSchema = new Schema(
  {
    userName: String,
    userSalary: Number,
  },
  { collection: "accounts" }
);
let AccountModel = mongoose.model("accountInfo", accountSchema);

// https://www.youtube.com/watch?v=HGgyd1bYWsE 
let userSchema = new Schema(
  {
    userName: String,
    userEmail: String,
    userPassword: String,
  },
  { collection: "userInfo" }
);

let userModel = mongoose.model("userInfo", userSchema);

const validateRegister = (data) => {
  console.log("validate")
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		userEmail: Joi.string().email().required().label("User Email"),
		userPassword: passwordComplexity().required().label("User Password"),
	});
  console.log(schema.validate(data), "---")
	return schema.validate(data);
};

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
});

router.post("/setEmployee", async (req, res) => {
  console.log(req.body)
  try{
    const user = await EmployeeModel.findOne({ userName: req.body.userName });
    if(user){
      console.log("User Exists Username")
      return res.status(401).send({ message: "User Exists Username" });
    }
    var data = new EmployeeModel(req.body)
    await data.save()
    res.end()
  }catch(error){
    res.status(500).send({ message: "Internal Server Error" });
    console.log("Internal Server Error")
  }
});

router.post("/setAccount", async (req, res) => {
  console.log(req.body)
  try{
    const user = await AccountModel.findOne({ userName: req.body.userName });
    if(user){
      console.log("User Exists Username")
      return res.status(401).send({ message: "User Exists Username" });
    }
    var data = new AccountModel(req.body)
    await data.save()
    res.end()
  }catch(error){
    res.status(500).send({ message: "Internal Server Error" });
    console.log("Internal Server Error")
  }
});

router.post("/getEmployee", function (req, res, next) {
  EmployeeModel.find().then(function (docs) {
      console.log("/getEmployee: " + docs)
    res.status(200).json(docs)
  });
});

router.post("/getAccount", function (req, res, next) {
  AccountModel.find().then(function (docs) {
     console.log("/getAccount: " + docs)
    res.status(200).json(docs)
  });
});

router.post("/setUser", async (req, res) => {
  console.log(req.body)
	try {
    console.log("Try")
		const { error } = validateRegister(req.body);
		if (error) {
      console.log("Error")
			return res.status(400).send({ message: error.details[0].message });
    }

    console.log("Error Avoid")
		const user = await userModel.findOne({ userEmail: req.body.userEmail });
		if (user){
			return res.status(409).send({ message: "User with given email already Exist!" });
    }
    console.log("Exists")

    const hashPassword = await bcrypt.hash(req.body.userPassword, 10);

    console.log("Encrypted")

		await new userModel({ ...req.body, userPassword: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
    console.log("User created successfully")
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
    console.log("Internal Server Error")
	}
});

router.post("/getUser", function (req, res, next) {
  userModel.find().then(function (docs) {
     console.log("/getUser: " + docs)
    res.status(200).json(docs)
  });
});

module.exports = router;