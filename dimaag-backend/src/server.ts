import axios from "axios";
import { app } from "./app";
import { db } from "./config/database";
import { syncWithClerk } from "./config/syncWithClerk";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { getSummary } from "./helpers/getSummary";
const PORT = 3000;

(async () => {
  try {
    const loader = YoutubeLoader.createFromUrl(
      "https://youtu.be/TBxS0XhdfmU?si=2l4HXtyWQsbkfPv-",
      {
        language: "es",
        addVideoInfo: true,
      }
    );

    const docs = await loader.load();
    
    await getSummary(docs[0].pageContent)

    return
    // try {
    //   const response = await axios.get("https://publish.twitter.com/oembed", {
    //     params: {
    //       url: "https://x.com/bryan_johnson/status/1891912456878133755",
    //       format: "json",
    //     },
    //   });
    //   console.log(response.data.html);
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching tweet embed:", error);
    //   throw error;
    // }
    await db.execute("select 1");
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
