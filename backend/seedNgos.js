
require("dotenv").config();

const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const NgoProfile = require("./models/NgoProfile");

const removedNgoEmail = "helpinghands@volunteerconnect.demo";

const ngoAccounts = [
  {
    username: "Green Earth Initiative",
    email: "greenearth@volunteerconnect.demo",
    password: "Green@Demo2026",
    organizationName: "Green Earth Initiative",
    contactPersonName: "Ananya Verma",
    contactPersonRole: "Coordinator",
    contactPhone: "9000000002",
    location: "Delhi",
    description:
      "Working with local communities on tree plantation, environmental awareness, and cleaner neighborhoods.",
    mission:
      "To promote environmental awareness and cleaner neighborhoods through community participation.",
    causes: ["Environment", "Community Service"],
    programs: "Tree plantation drives and environmental awareness campaigns.",
    volunteerHelp: "Tree plantation, clean-up drives and awareness activities.",
    currentNeeds: "Environmental volunteers and community outreach support.",
  },
  {
    username: "Care & Share NGO",
    email: "careshare@volunteerconnect.demo",
    password: "Care@Demo2026",
    organizationName: "Care & Share NGO",
    contactPersonName: "Meera Kapoor",
    contactPersonRole: "Director",
    contactPhone: "9000000003",
    location: "Mumbai",
    description:
      "Organizing community support programs and providing companionship and assistance to elderly people.",
    mission:
      "To support elderly people through companionship, assistance and community programs.",
    causes: ["Community Service", "Elderly Care"],
    programs: "Elderly care and community assistance programs.",
    volunteerHelp: "Companionship, event assistance and community support.",
    currentNeeds: "Volunteers for elderly assistance and outreach.",
  },
  {
    username: "Paws & Claws Shelter",
    email: "pawsclaws@volunteerconnect.demo",
    password: "Paws@Demo2026",
    organizationName: "Paws & Claws Shelter",
    contactPersonName: "Rohan Mehta",
    contactPersonRole: "Shelter Manager",
    contactPhone: "9000000004",
    location: "Delhi",
    description:
      "Rescuing and caring for abandoned animals while promoting responsible animal care in the community.",
    mission:
      "To rescue and care for abandoned animals and promote responsible animal care.",
    causes: ["Animal Welfare", "Community Service"],
    programs: "Animal rescue, shelter care and animal welfare awareness.",
    volunteerHelp: "Animal care, shelter assistance and awareness activities.",
    currentNeeds: "Animal care volunteers and community outreach support.",
  },
];

const seedNgos = async () => {
  try {
    await connectDB();

    const removedNgo = await User.findOne({
      email: removedNgoEmail,
      role: "ngo",
    });

    if (removedNgo) {
      await NgoProfile.deleteOne({ user: removedNgo._id });
      await User.deleteOne({ _id: removedNgo._id });
      console.log("Removed Helping Hands Foundation.");
    }

    for (const ngo of ngoAccounts) {
      let user = await User.findOne({ email: ngo.email });

      if (!user) {
        const hashedPassword = await bcrypt.hash(ngo.password, 12);

        user = await User.create({
          username: ngo.username,
          email: ngo.email,
          password: hashedPassword,
          role: "ngo",
        });
      } else if (user.role !== "ngo") {
        throw new Error(
          `The email ${ngo.email} already belongs to a non-NGO account.`
        );
      }

      await NgoProfile.findOneAndUpdate(
        { user: user._id },
        {
          user: user._id,
          organizationName: ngo.organizationName,
          contactPersonName: ngo.contactPersonName,
          contactPersonRole: ngo.contactPersonRole,
          contactEmail: ngo.email,
          contactPhone: ngo.contactPhone,
          location: ngo.location,
          mission: ngo.mission,
          description: ngo.description,
          programs: ngo.programs,
          volunteerHelp: ngo.volunteerHelp,
          currentNeeds: ngo.currentNeeds,
          causes: ngo.causes,
          logoUrl: "",
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
        }
      );

      console.log(`Created or updated: ${ngo.organizationName}`);
    }

    console.log("NGO demo account seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("NGO seeding failed:", error.message);
    process.exit(1);
  }
};

seedNgos();
