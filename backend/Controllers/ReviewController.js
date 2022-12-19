const reviewmodel = require("../Model/ReviewSchema");
const { check, validationResult } = require("express-validator");

const reviewcontroller = {
  review: async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(200).json({
        status: 401,
        err: "Something went wrong with input you entered.Please recheck it !",
      });
      console.log(errors.array());
    } else {
      console.log(req.body);
      console.log(req.file);
      let feedback = req.body.feedback;
      let rating = req.body.rating;

      let ins = new reviewmodel({
        feedback: feedback,
        rating: rating,
      });
      await ins.save((err) => {
        if (err) {
          res.status(200).json({
            status: 401,
            err: "Something went wrong !",
          });
        } else {
          res
            .status(200)
            .json({ status: 200, msg: "Review Added Successfully !!" });
        }
      });
    }
  },
  getreview: async (req, res) => {
    await reviewmodel.find().then((review) => {
      console.log(review);
      res.json({ review: review });
    });
  },

  getCount: async (req, res) => {
    await reviewmodel.countDocuments().then((result) => {
      console.log(result);
      res.json({ result: result });
    });
    // console.log(result);
  },
  getAvg: async (req, res) => {
    reviewmodel
      .aggregate([
        {
          $group: {
            _id: "_id",
            AverageValue: { $avg: "$rating" },
          },
        },
      ])
      .then((result) => {
        console.log(result);
        res.json({ result: result});
      });
  },

  deletereview: async (req, res) => {
    console.log(req.params.id);
    try {
      console.log(req.params.id);
      await reviewmodel.findByIdAndDelete(req.params.id);
      res.status(200).json("Review Deleted");
    } catch (error) {
      res.status(500).json("ERROR IN Delete");
    }
  },
};

module.exports = reviewcontroller;
//// _id: "_id",