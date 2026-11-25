
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./models/User");
const VolunteerProfile = require("./models/VolunteerProfile");
const NgoProfile = require("./models/NgoProfile");
const VolunteerRequest = require("./models/VolunteerRequest");

const demoVolunteers = [
  {
    username: "Aarav Sharma",
    email: "aarav@volunteerconnect.demo",
    fullName: "Aarav Sharma",
    skills: "Teaching, Communication, Event Management",
    availability: "Weekends",
    reason: "I would like to contribute my time and skills to support your organization and its community initiatives.",
    additionalMessage: "I am available on weekends and excited to participate in your activities.",
    status: "pending",
  },
  {
    username: "Priya Verma",
    email: "priya@volunteerconnect.demo",
    fullName: "Priya Verma",
    skills: "Social Media, Content Writing, Photography",
    availability: "Weekdays",
    reason: "I am interested in supporting your organization through communication and awareness activities.",
    additionalMessage: "I can help with social media campaigns and community outreach.",
    status: "accepted",
  },
  {
    username: "Rahul Mehta",
    email: "rahul@volunteerconnect.demo",
    fullName: "Rahul Mehta",
    skills: "Event Management, First Aid, Teamwork",
    availability: "Flexible",
    reason: "I want to volunteer and contribute to meaningful social work in my community.",
    additionalMessage: "I am comfortable working with teams and organizing events.",
    status: "rejected",
  },
  {
    username: "Ananya Singh",
    email: "ananya@volunteerconnect.demo",
    fullName: "Ananya Singh",
    skills: "Teaching, Animal Care, Communication",
    availability: "Weekends",
    reason: "I am passionate about helping others and would love to support your current programs.",
    additionalMessage: "I can dedicate my weekends to volunteering.",
    status: "pending",
  },
];

const createVolunteerProfile = async (volunteer) => {
  const hashedPassword = await bcrypt.hash(
    "Volunteer@Demo2026",
    12
  );

  const user = await User.findOneAndUpdate(
    { email: volunteer.email },
    {
      $set: {
        username: volunteer.username,
        email: volunteer.email,
        password: hashedPassword,
        role: "volunteer",
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  const profile = await VolunteerProfile.findOneAndUpdate(
    { user: user._id },
    {
      $set: {
        user: user._id,
        fullName: volunteer.fullName,
        phone: "9876543210",
        emergencyContact: "Demo Emergency Contact",
        emergencyPhone: "9876501234",
        gender: "Not specified",
        dateOfBirth: "2002-05-15",
        location: "Delhi",
        bio: "I am passionate about volunteering and supporting meaningful causes.",
        interests: ["Education", "Environment", "Community Service"],
        skills: volunteer.skills,
        availability: volunteer.availability,
        profileImageUrl: "",
        consent: true,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return { user, profile };
};

const seedRequests = async () => {
  try {
    await connectDB();

    const ngos = await NgoProfile.find({});

    if (ngos.length === 0) {
      throw new Error(
        "No NGO profiles found. Run npm run seed:ngos first."
      );
    }

    let totalRequests = 0;

    for (const volunteer of demoVolunteers) {
      const { user, profile } =
        await createVolunteerProfile(volunteer);

      for (const ngoProfile of ngos) {
        const request = await VolunteerRequest.findOneAndUpdate(
          {
            volunteer: user._id,
            ngo: ngoProfile.user,
          },
          {
            $set: {
              volunteer: user._id,
              ngo: ngoProfile.user,
              volunteerProfile: profile._id,
              ngoProfile: ngoProfile._id,
              ngoName: ngoProfile.organizationName,
              volunteerName: profile.fullName,
              skills: profile.skills,
              availability: profile.availability,
              reason: volunteer.reason,
              additionalMessage: volunteer.additionalMessage,
              status: volunteer.status,
            },
          },
          {
            new: true,
            upsert: true,
            runValidators: true,
          }
        );

        totalRequests++;

        console.log(
          `${request.volunteerName} -> ${request.ngoName}: ${request.status}`
        );
      }
    }

    console.log("--------------------------------");
    console.log("Demo requests seeded successfully.");
    console.log("NGO profiles:", ngos.length);
    console.log("Volunteer accounts:", demoVolunteers.length);
    console.log("Requests:", totalRequests);
    console.log("Demo volunteer password: Volunteer@Demo2026");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedRequests();
