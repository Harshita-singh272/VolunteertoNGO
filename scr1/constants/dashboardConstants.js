import {
  Clock,
  Handshake,
  UserCog,
  Award
} from "lucide-react";

export const statCards = [
  {
    icon: Clock,
    statKey: "verifiedHours",
    title: "Verified Hours",
    caption: "Total volunteering time",
    buttonText: "View experience",
  },
  {
    icon: Handshake,
    statKey: "ngosSupported",
    title: "NGOs Supported",
    caption: "Organizations you've helped",
    buttonText: "View all",
  },
  {
    icon: UserCog,
    statKey: "requestsPending",
    title: "Requests Pending",
    caption: "Awaiting NGO response",
    buttonText: "View requests",
  },
  {
    icon: Award,
    statKey: "certificatesEarned",
    title: "Certificates Earned",
    caption: "Keep up the impact!",
    buttonText: "View certificates",
  },
];