import algoliasearch from "algoliasearch";
const config = process.env;

const {
  REACT_APP_APPLICATION_ID: applicationId,
  REACT_APP_API_KEY: apiKey,
  REACT_APP_INDEX_NAME: indexName,
}: any = config;

const index = algoliasearch(applicationId, apiKey).initIndex(indexName);

export const search = async (
  id: string,
  query: string,
  section: string,
  label: string,
  topics: string,
  byline: string
) => {
  try {
    const topicArray =
      topics?.split(", ").map((topic) => `topic:'${topic}'}`) ?? [];

    return await index.search("", {
      hitsPerPage: 9,
      similarQuery: query + (byline.length > 1 ? " " + byline : ""),
      ignorePlurals: true,
      removeStopWords: true,
      filters: id ? `NOT objectID:${id}` : undefined,
      optionalFilters: [`section:${section}`, `label:${label}`, ...topicArray],
    });
  } catch (e) {
    console.error(e);
  }
};
