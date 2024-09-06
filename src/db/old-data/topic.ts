import { dbClient, dbSchema } from "@/db";
import { OLD_DATA } from "@/db/old-data/data";
import { createSlug } from "@/utils/string";

const main = async () => {
  console.log("Adding topics...");

  await dbClient.delete(dbSchema.topics);

  await OLD_DATA.map(async (topic) => {
    await dbClient.insert(dbSchema.topics).values({
      title: topic.title,
      slug: createSlug(topic.title),
      description: topic.description,
    });

    console.log(`Topic ${topic.title} added successfully`);
  });
};

main().catch((err) => {
  console.error(`Error adding topics: ${err}`);
});
