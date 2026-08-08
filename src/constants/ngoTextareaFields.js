const ngoTextareaFields = [
  {
    Kind: "mission",
    Name: "Mission & Goals",
    Place:
      "What is your organization's mission? What change are you working toward?",
    Count: "5",
    required: true,
  },
  {
    Kind: "description",
    Name: "About Your Organization",
    Place:
      "Tell volunteers about your organization, its background, the communities you work with, and the kind of work you do.",
    Count: "6",
    required: true,
  },
  {
    Kind: "programs",
    Name: "Programs & Activities",
    Place:
      "Describe your regular programs, projects, events, drives, or other activities.",
    Count: "5",
    required: true,
  },
  {
    Kind: "volunteerHelp",
    Name: "How Can Volunteers Help?",
    Place:
      "Example:• Teach mathematics or English to students  • Conduct basic computer-literacy workshops  • Create educational material  • Assist during weekend activities  • Help with our website or social media    {Mention whether prior experience or specific skills are required.}",
    Count: "6",
    required: true,
  },
  {
    Kind: "currentNeeds",
    Name: "Current Needs",
    Place:
      "Is there anything your organization currently needs help with? For example: volunteers for an upcoming drive, book donations, event support, etc.",
    Count: "5",
  },
];

export default ngoTextareaFields;