import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Topics() {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({}); // map problemId->done

  useEffect(() => {
    fetchData();
    fetchProgress();
  }, []);

  async function fetchData() {
    try {
      const res = await API.get("/topics");
      setTopics(res.data.topics || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchProgress() {
    try {
      const res = await API.get("/topics/progress");
      const map = {};
      (res.data.progress || []).forEach((p) => {
        map[p.problem._id] = !!p.done;
      });
      setProgress(map);
    } catch (err) {
      console.error(err);
    }
  }

  async function toggle(problemId, done) {
    try {
      await API.post("/topics/toggle", { problemId, done });
      setProgress((prev) => ({ ...prev, [problemId]: done }));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>DSA Sheet</h2>
      <p style={{ textAlign: "center" }}>Explore these exciting topics!</p>
      {topics.map((topic) => (
        <div key={topic._id} className="card" style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0 }}>
              {topic.title}
              {/* <span className="small-badge">{topic.status}</span> */}
            </h3>
          </div>

          <div style={{ marginTop: 12 }}>
            <h3>Sub Topics</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>LeetCode Link</th>
                  <th>YouTube Link</th>
                  <th>Article Link</th>
                  <th>Level</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topic.problems.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <input
                        className="checkbox"
                        type="checkbox"
                        checked={!!progress[p._id]}
                        onChange={(e) => toggle(p._id, e.target.checked)}
                      />
                      {p.name}
                    </td>
                    <td>
                      <a href={p.leetLink || "#"} target="_blank">
                        Practise
                      </a>
                    </td>
                    <td>
                      <a href={p.youtubeLink || "#"} target="_blank">
                        Watch
                      </a>
                    </td>
                    <td>
                      <a href={p.articleLink || "#"} target="_blank">
                        Read
                      </a>
                    </td>
                    <td>{p.level}</td>
                    <td>{progress[p._id] ? "Done" : "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
