
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const VolunteerRequest = require("./models/VolunteerRequest");

const migrateNgoResponses = async () => {
  try {
    await connectDB();

    const requests = await VolunteerRequest.collection
      .find({})
      .toArray();

    let migrated = 0;

    for (const request of requests) {
      if (request.ngoResponse) {
        continue;
      }

      const messages = request.ngoMessages || [];
      const lastMessage = messages[messages.length - 1];

      const update = {
        $unset: {
          ngoMessages: "",
        },
      };

      if (lastMessage?.message?.trim()) {
        update.$set = {
          ngoResponse: {
            message: lastMessage.message.trim(),
            sentAt: lastMessage.sentAt || new Date(),
          },
        };
      }

      await VolunteerRequest.collection.updateOne(
        { _id: request._id },
        update
      );

      migrated++;
    }

    console.log(`Migration completed. Records processed: ${migrated}`);
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

migrateNgoResponses();
