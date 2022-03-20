let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
mongoose.connect("localhost:27017/EmployeeData");
let Schema = mongoose.Schema;

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
  { collection: "employees" }
);
let AccountModel = mongoose.model("accountInfo", accountSchema);

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
     console.log("/getNoEmployees: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

router.post("/getAccount", function (req, res, next) {
  EmployeeModel.find().then(function (docs) {
    let theDoc = docs[docs.length-1]
     console.log("/getNoEmployees: " + theDoc)
     // theDoc = JSON.stringify(theDoc)
    res.status(200).json(theDoc)
  });
});

module.exports = router;
