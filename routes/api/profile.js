const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

//req /api/profile/me
//desc getting current profile
//res profile

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      res.json("profile Not Found!");
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.error(err);
    res.status(404).json(err);
  }
});

// Creating And Updating Profile
//@route post /api/profile
//@desc Crreating and updating profile
//@private

router.post(
  "/",
  [
    auth,
    [
      check("skills", "skills are required!")
        .not()
        .isEmpty(),
      check("status", "status required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // pulling out all request by body
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      instagram
    } = req.body;
    //now we checking fields(bio etc) are added before submitting them to database.
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }
    //build social object
    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (youtube) profileFields.social.youtube = youtube;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    try {
      //if profile is already then update..
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
      }

      //if profile not found
      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json("server Error");
    }
  }
);

//getting all profile

//@route get /api/profile
//@desc getting All profiles
//@public

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error Occured!!!");
  }
});

//getting profile by user Id
//@route get /user/user_id
//@desc getting profile by uid
//access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json("profile not found");
    }
    res.json(profile);
  } catch (err) {
    console.log(err);
    if (err.kind == "ObjectId") {
      return res.status(400).json("profile not found!!!");
    }
    res.status(500).json("server Error!!!");
  }
});

//Deleling user and profile
//@route  delete /api/route
//@desc Deleting User And Profile
//@access private

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.status(200).json("profile has been Deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json("server Error Occured!");
  }
});

//Adding Profile Experience
//@route  put /api/profile/experience
//@desc Adding Profile Experience
//@access private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title required")
        .not()
        .isEmpty(),
      check("company", "company required")
        .not()
        .isEmpty(),
      check("from", "from required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const addExp = { title, company, location, from, to, current, description };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(addExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server errors Occured!!");
    }
  }
);

// Deletng experience from profile

//@route delete /api/profile/experience/:exp_id
//@desc Deletng experience from profile
//@access private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeExp = profile.experience
      .map(exp => exp.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeExp, 1);
    await profile.save();
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error occured!!!");
  }
});

// Adding Education to profile
//@route put /education
//@desc  Adding Education to profile
//access private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required")
        .not()
        .isEmpty(),
      check("degree", "degree is required")
        .not()
        .isEmpty(),
      check("fieldofstudy", "fieldofstudy is required")
        .not()
        .isEmpty(),
      check("from", "from is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const addEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(addEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).json("server Error");
    }
  }
);

//Deleting Education from Profile
//@route delete /eduction/:edu_id
//@desc Deleting Education
//@access private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeEdu = profile.education
      .map(edu => edu.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeEdu);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.log(err);
    res.status(500).json("server error");
  }
});

module.exports = router;
