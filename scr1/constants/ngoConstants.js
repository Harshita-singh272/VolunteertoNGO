import helpingHandsLogo from "../assets/helping-hands.jpg";
import greenEarthLogo from "../assets/green-earth.png";
import careShareLogo from "../assets/care-share.png";
import pawsClawsLogo from "../assets/paws-claws.png";

export const nearbyNgos = [
  {
    id: 1,
    organizationName: "Helping Hands Foundation",
    logo: helpingHandsLogo,

    description:
      "Supporting children's education and providing learning resources to underserved communities.",

    causes: [
      "Education",
      "Child Welfare"
      ,"Animal Welfare",
      "Community Service"
    ],

    distance: 2.1,
    location: "Delhi",
  },

  {
    id: 2,
    organizationName: "Green Earth Initiative",
    logo: greenEarthLogo,

    description:
      "Working with local communities on tree plantation, environmental awareness, and cleaner neighborhoods.",

    causes: [
      "Environment",
      "Community Service"
    ],

    distance: 3.6,
    location: "Delhi",
  },

  {
    id: 3,
    organizationName: "Care & Share NGO",
    logo: careShareLogo,

    description:
      "Organizing community support programs and providing companionship and assistance to elderly people.",

    causes: [
      "Community Service",
      "Elderly Care"
    ],

    distance: 4.2,
    location: "Mumbai",
  },

  {
    id: 4,
    organizationName: "Paws & Claws Shelter",
    logo: pawsClawsLogo,

    description:
      "Rescuing and caring for abandoned animals while promoting responsible animal care in the community.",

    causes: [
      "Animal Welfare",
      "Community Service"
    ],

    distance: 4.8,
    location: "Delhi",
  },
];