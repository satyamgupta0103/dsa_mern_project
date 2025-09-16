import React, { useEffect, useState } from "react";
import API from "../api/axios";

export default function Progress() {
  const [counts, setCounts] = useState({
    EASY: 0,
    MEDIUM: 0,
    HARD: 0,
    totalEasy: 0,
    totalMedium: 0,
    totalHard: 0,
  });

  useEffect(() => {
    compute();
  }, []);

  async function compute() {
    try {
      const resTopics = await API.get("/topics");
      const topics = resTopics.data.topics;
      const allProblems = topics.flatMap((t) => t.problems);
      const resProgress = await API.get("/topics/progress");
      const doneSet = new Set(
        (resProgress.data.progress || [])
          .filter((p) => p.done)
          .map((p) => p.problem._id)
      );

      const totalEasy = allProblems.filter((p) => p.level === "EASY").length;
      const totalMedium = allProblems.filter(
        (p) => p.level === "MEDIUM"
      ).length;
      const totalHard = allProblems.filter((p) => p.level === "HARD").length;

      const doneEasy = allProblems.filter(
        (p) => p.level === "EASY" && doneSet.has(p._id)
      ).length;
      const doneMedium = allProblems.filter(
        (p) => p.level === "MEDIUM" && doneSet.has(p._id)
      ).length;
      const doneHard = allProblems.filter(
        (p) => p.level === "HARD" && doneSet.has(p._id)
      ).length;

      setCounts({
        EASY: Math.round(totalEasy ? (doneEasy / totalEasy) * 100 : 0),
        MEDIUM: Math.round(totalMedium ? (doneMedium / totalMedium) * 100 : 0),
        HARD: Math.round(totalHard ? (doneHard / totalHard) * 100 : 0),
        totalEasy,
        totalMedium,
        totalHard,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Progress Reports</h2>
      <p>Easy: {counts.EASY}%</p>
      <p>Medium: {counts.MEDIUM}%</p>
      <p>Hard: {counts.HARD}%</p>
      <hr />
      <footer style={{ textAlign: "center", marginTop: 20 }}>
        © 2025 Dashboard. All Rights Reserved.
      </footer>
    </div>
  );
}
