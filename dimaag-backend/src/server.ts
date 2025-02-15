import { app } from "./app";
import { db } from "./config/database";
import { syncWithClerk } from "./config/syncWithClerk";
const PORT = 3000;

(async () => {
  try {
    await db.$client.connect();
    console.log("Connected to the database");
    await syncWithClerk();
    console.log("Synced with Clerk SUCCESSFUL");
  } catch (error) {
    console.error(
      "Error connecting to the database or syncing with Clerk:",
      error
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
