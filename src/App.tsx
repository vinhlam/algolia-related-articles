import React, { useEffect, useState } from "react";
import { search } from "./algolia";
import moment from "moment";
import { AppWrapper, ArticleWrapper } from "./styles";

const parseByLine = (byline: any) =>
  byline
    .map(({ children }: any) =>
      children.map(({ attributes }: any) => attributes.value).join(" ")
    )
    .join(" ");
const App = () => {
  const [query, setQuery] = useState("cats");
  const [section, setSection] = useState("news");
  const [label, setLabel] = useState("");
  const [topics, setTopics] = useState("");
  const [byline, setByline] = useState("");
  const [results, setResults] = useState<any>();

  const handleSearchClick = async () => {
    setResults(await search("", query, section, label, topics, byline));
  };

  useEffect(() => {
    search("", query, section, label, topics, byline).then(setResults);
  }, []);

  const handleArticleClick = async ({
    id,
    headline,
    label,
    section,
    topics,
    byline,
  }: any) => {
    setQuery(headline ?? "");
    setSection(section ?? "");
    setLabel(label ?? "");
    setTopics(topics ?? "");
    setByline(byline ?? "");
    setResults(await search(id, headline, section, label, topics, byline));
  };

  console.log(results);
  return (
    <AppWrapper className="App">
      <div className="form">
        <div>
          <span>Query</span>
          <input value={query} onChange={(evt) => setQuery(evt.target.value)} />
        </div>
        <div>
          <span>Section</span>
          <input
            value={section}
            onChange={(evt) => setSection(evt.target.value)}
          />
        </div>
        <div>
          <span>Label</span>
          <input value={label} onChange={(evt) => setLabel(evt.target.value)} />
        </div>
        <div>
          <span>Topics</span>
          <input
            value={topics}
            onChange={(evt) => setTopics(evt.target.value)}
          />
        </div>
        <div>
          <span>Byline</span>
          <input
            value={byline}
            onChange={(evt) => setByline(evt.target.value)}
          />
        </div>
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <ArticleWrapper>
        {results?.hits?.map(
          ({
            id,
            headline,
            publishedTime,
            label,
            section,
            leadAsset,
            topics,
            keywords,
            byline,
            content,
            url,
          }: any) => (
            <div
              className="article"
              key={id}
              onClick={() =>
                handleArticleClick({
                  id,
                  headline,
                  label,
                  section,
                  topics: topics?.map(({ name }: any) => name).join(", "),
                  byline: parseByLine(byline),
                })
              }
            >
              <div
                className="headline"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a href={url} target="_TAB">
                  {headline}
                </a>
              </div>
              <div className="publishedTime">
                {moment(publishedTime).format("LLLL")}
              </div>
              <div className="byline">{parseByLine(byline)}</div>
              <div className="section">Section:{section}</div>
              <div className="image">
                <img src={leadAsset?.crop?.url} />
              </div>
              <div className="label">Label:{label}</div>
              <div className="topics">
                topics:{topics?.map(({ name }: any) => name).join(", ")}
              </div>
              <div className="keywords">Keywords:{keywords.join(", ")}</div>

              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )
        )}
      </ArticleWrapper>
    </AppWrapper>
  );
};

export default App;
