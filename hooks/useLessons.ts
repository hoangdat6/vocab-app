import { useState, useEffect } from "react";
import { Theme, Lesson } from "@/types/lessonTypes";
import { getThemes } from "@/services/lessonService";

export function useLessons() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    const data = getThemes();
    setThemes(data);
    const all = data.flatMap((theme) =>
      theme.lessons.map((lesson) => ({
        ...lesson,
        difficulty: theme.difficulty,
        themeId: theme.id,
        themeName: theme.title,
        themeColor: theme.color,
        themeIcon: theme.icon
      }))
    );
    setAllLessons(all);
  }, []);

  useEffect(() => {
    let newFilteredThemes = [...themes];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      newFilteredThemes = newFilteredThemes.filter((theme) =>
        theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by difficulty
    if (difficulty !== "all") {
      newFilteredThemes = newFilteredThemes.filter(
        (theme) => theme.difficulty === difficulty
      );
    }

    // (Optional) Sort themes by some criterion if needed
    // ...sorting logic...

    setFilteredThemes(newFilteredThemes);
  }, [themes, searchQuery, difficulty, sortBy]);

  return {
    themes,
    allLessons,
    filteredThemes,
    searchQuery,
    setSearchQuery,
    difficulty,
    setDifficulty,
    sortBy,
    setSortBy,
  };
}
