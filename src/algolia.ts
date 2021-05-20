import algoliasearch from "algoliasearch";

export const search = async (
  id: string,
  headline: string,
  section: string,
  label: string,
  topics: string,
  byline: string
) => {
  const app = (localStorage.getItem("algolia") || "").split(",");

  if (app.length !== 3) return;

  const [applicationId, apiKey, indexName] = app;

  console.log(applicationId, apiKey, indexName);

  if (!applicationId || !apiKey || !indexName) return;

  const index = algoliasearch(applicationId, apiKey).initIndex(indexName);

  try {
    const topicArray =
      topics?.split(", ").map((topic) => `topic.name:'${topic}'}`) ?? [];
    const query = headline + (byline.length > 1 ? ' "' + byline + '"' : "");

    const optionalWords = headline
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => !word.match(/^[A-Z].*/));

    console.log("optionalWords", optionalWords);

    const filterSection = section !== "" ? `section:${section}` : undefined;
    const filterId = id ? `NOT objectID:${id}` : undefined;
    const filters = [filterSection, filterId].filter(Boolean).join(" AND ");
    console.log("filters", filters);
    return await index.search(query, {
      hitsPerPage: 9,
      ignorePlurals: true,
      removeStopWords: true,
      optionalWords: [...optionalWords, byline],
      filters:
        "algoliaData.publishedTimestamp >= " + new Date(2021, 4).getTime(),
      optionalFilters: [`label:${label}`, ...topicArray],
    });
  } catch (e) {
    console.error(e);
  }
};
