import { app } from "./app";
import { db } from "./config/database";
const PORT = 3000;

(async () => {
    await db.$client.connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })();
