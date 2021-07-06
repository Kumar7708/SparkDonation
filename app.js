const express = require("express");
const Razorpay = require("razorpay");
const ejs = require("ejs");

const app = express();

const razorpay = new Razorpay({
    key_id: "rzp_test_20RxjMGYnUVE1v",
    key_secret: "XXH2DkS0MZoGkGYeGVotHWVZ",
});

let options = {
    amount: 50000, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
};

razorpay.orders.create(options, function(err, order) {
    console.log(order);
});

app.set('views', 'views')
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/sucess", function(req, res) {
    res.render("sucess");
});

app.post('/order', function(req, res) {
    let options = {
        amount: 50000, // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    razorpay.orders.create(options, function(err, order) {
        res.json(order);
    });
});

app.post('/is-order-complete', function(req, res) {
    razorpay.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument) => {
        if (paymentDocument.status == 'captured') {
            res.redirect('sucess');
        }
    })
});






app.listen(3000, function() {
    console.log("Server started on port 3000");
});