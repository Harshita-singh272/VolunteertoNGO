const ngoContactFields = [
  {
    Kind: "contactPersonName",
    Name: "Contact Person Name",
    Place: "e.g. Priya Sharma",
    required: true,
  },
  {
    Kind: "contactPersonRole",
    Name: "Contact Person Role",
    Place: "e.g. Volunteer Coordinator",
    required: true,
  },
  {
    Kind: "contactEmail",
    Name: "Contact Email",
    Type: "email",
    Place: "contact@organization.org",
    required: true,
  },
  {
    Kind: "contactPhone",
    Name: "Contact Phone Number",
    Type: "tel",
    Place: "(+91) | Enter Contact Number",
    required: true,
  },
  {
    Kind: "location",
    Name: "Location",
    Place: "City, State",
    required: true,
  },
  {
    Kind: "website",
    Name: "Website",
    Type: "url",
    Place: "https://yourorganization.org",
  },
  {
    Kind: "socialLink",
    Name: "Social Media",
    Type: "url",
    Place: "Instagram, LinkedIn, Facebook, etc.",
  },
];

export default ngoContactFields;