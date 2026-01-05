"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

// ✅ TypeScript interfaces for GitHub API data
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  html_url: string;
}

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubStats {
  stars: number;
  forks: number;
}

export default function GitHubCustomCard() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<GitHubStats>({ stars: 0, forks: 0 });

  useEffect(() => {
    // 1️⃣ Fetch user profile
    fetch("https://api.github.com/users/Muhammad-Sumair-Ali")
      .then(res => res.json())
      .then((data: GitHubUser) => setUserData(data));

    // 2️⃣ Fetch repos to calculate stars and forks
    fetch("https://api.github.com/users/Muhammad-Sumair-Ali/repos?per_page=100")
      .then(res => res.json())
      .then((repos: GitHubRepo[]) => {
        let totalStars = 0;
        let totalForks = 0;
        repos.forEach(repo => {
          totalStars += repo.stargazers_count;
          totalForks += repo.forks_count;
        });
        setStats({ stars: totalStars, forks: totalForks });
      });
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-300 dark:border-zinc-700 shadow-lg rounded-xl w-full sm:w-[300px]">
      <div className="flex flex-col items-start justify-start p-4 gap-2">
        {/* GitHub Logo */}
        <div className="w-5 h-5 overflow-hidden hidden dark:flex items-center justify-center">
          <Image
            src="/github-mark-white.png"
            alt="GitHub"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="w-5 h-5 overflow-hidden flex dark:hidden items-center justify-center">
          <Image
            src="/github-mark.png"
            alt="GitHub"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Profile Image using Next.js Image */}
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-300 dark:border-zinc-700">
          <Image
            src={userData.avatar_url}
            alt={userData.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Name & Bio */}
        <div className="text-left space-y-0.5">
          <h3 className="text-base font-semibold">{userData.name}</h3>
          <p className="text-xs text-gray-500 font-normal dark:text-gray-300 leading-tight">
            {userData.bio || "Full Stack Developer"}
          </p>
        </div>

        {/* GitHub Stats */}
        <div className="flex gap-3 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
            </svg>
            <span>{stats.stars} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
            </svg>
            <span>{stats.forks} forks</span>
          </div>
        </div>

        {/* GitHub Button */}
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 px-4 py-1.5 border border-zinc-800 dark:border-gray-400 text-zinc-800 dark:text-gray-300 rounded-full text-xs font-semibold hover:bg-zinc-800 hover:text-zinc-100 dark:hover:bg-zinc-700 transition-colors"
        >
          View profile
        </a>
      </div>
    </div>
  );
}
