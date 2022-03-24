let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
mongoose.connect("localhost:27017/EmployeeData");
let Schema = mongoose.Schema;

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

let employeeSchema = new Schema(
  {
    name: String,
    age: Number,
    role: String,
  },
  { collection: "employees" }
);
let EmployeeModel = mongoose.model("employeeInfo", employeeSchema);

let accountSchema = new Schema(
  {
    name: String,
    salary: Number,
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
  { collection: "users" }
);

userSchema.methods.generateAuthToken = function () {
  console.log("Token")
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {expiresIn: "7d",});
  console.log(token)
	return token;
};

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

router.post("/setEmployee", function (req, res, next) {
  console.log(req.body)
  var data = new EmployeeModel(req.body)
  data.save()
  res.end()
});

router.post("/setAccount", function (req, res, next) {
  console.log(req.body)
  var data = new AccountModel(req.body)
  data.save()
  res.end()
});

router.post("/getEmployee", function (req, res, next) {
  EmployeeModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getEmployee: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

router.post("/getAccount", function (req, res, next) {
  AccountModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getAccount: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

router.post("/getUser", async (req, res) => {
  console.log(req.body)
	try {
		const { error } = validateLogin(req.body);
		if (error){
      console.log(error)
			return res.status(400).send({ message: error.details[0].message });
    }

		const user = await userModel.findOne({ userName: req.body.userName });
		if (!user){
      console.log("Invalid Username")
			return res.status(401).send({ message: "Invalid Username or Password" });
    }
		const validPassword = await bcrypt.compare(
			req.body.userPassword,
			user.userPassword
		);
    
    console.log("Compare")

		if (!validPassword){
      console.log("Invalid Password")
			return res.status(401).send({ message: "Invalid Username or Password" });
    }
		//const token = user.generateAuthToken();

    console.log("Logging")
		res.status(200).send({ message: "logged in successfully" });
    console.log("Logged In")
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validateLogin = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		userPassword: Joi.string().required().label("User Password"),
	});
	return schema.validate(data);
};

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

module.exports = router;