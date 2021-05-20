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
  const [algolia, setAlgolia] = useState(localStorage.getItem("algolia") || "");

  const [headline, setHeadline] = useState(
    "If this was goodbye, Harry Kane went with a whimper"
  );
  const [section, setSection] = useState("sport");
  const [label, setLabel] = useState("Premier League");
  const [topics, setTopics] = useState("Premier League, Football");
  const [byline, setByline] = useState("Alyson Rudd");
  const [results, setResults] = useState<any>();

  const handleSearchClick = async () => {
    setResults(await search("", headline, section, label, topics, byline));
  };

  useEffect(() => {
    search("", headline, section, label, topics, byline).then(setResults);
  }, []);

  const handleArticleClick = async ({
    id,
    headline,
    label,
    section,
    topics,
    byline,
  }: any) => {
    setHeadline(headline ?? "");
    setSection(section ?? "");
    setLabel(label ?? "");
    setTopics(topics ?? "");
    setByline(byline ?? "");
    setResults(await search(id, headline, section, label, topics, byline));
  };
  const handleClearClick = async () => {
    setHeadline("");
    setSection("");
    setLabel("");
    setTopics("");
    setByline("");
  };

  console.log(results);
  return (
    <AppWrapper className="App">
      <div className="form">
        <div>
          <span>Headline</span>
          <input
            value={headline}
            onChange={(evt) => setHeadline(evt.target.value)}
          />
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
        <div className="buttons">
          <button onClick={handleSearchClick}>Search</button>
          <button onClick={handleClearClick}>Clear</button>
        </div>
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
      <div className="form">
        <div>
          <span>AlgoliaKeys</span>
          <input
            value={algolia}
            onChange={(evt) => {
              localStorage.setItem("algolia", evt.target.value);
              setAlgolia(evt.target.value);
            }}
          />
        </div>
      </div>
    </AppWrapper>
  );
};

export default App;
