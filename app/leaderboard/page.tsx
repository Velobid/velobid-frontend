"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar } from "@heroui/avatar"
import { Input } from "@heroui/input"
import { Kbd } from "@heroui/kbd"
import { Trophy } from "lucide-react"

import { SearchIcon } from "@/components/icons";

export default function LeaderboardPage() {
  const [tabs, setTabs] = useState("topBidders")

  const topPlayers = [
    {
      id: 1,
      name: "BabyKnight",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "124 ETH",
      totalBids: "82",
      totalStats: "42 - 21",
      winrate: "64%",
      kda: "1.23",
      rank: "Challenger",
    },
    {
      id: 2,
      name: "Rootless",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "102 ETH",
      totalBids: "58",
      totalStats: "42 - 21",
      winrate: "64%",
      kda: "1.23",
      rank: "Challenger",
    },
    {
      id: 3,
      name: "Teodorr2000",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "96 ETH",
      totalBids: "54",
      totalStats: "42 - 21",
      winrate: "64%",
      kda: "1.23",
      rank: "Challenger",
    },
  ]

  const leaderboardPlayers = [
    {
      id: 4,
      place: 4,
      name: "Rens",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "86 ETH",
      totalBids: "38",
      totalStats: "42 - 21",
      winrate: "64%",
      kda: "1.23",
      rank: "Challenger",
    },
    {
      id: 5,
      place: 5,
      name: "Edwin",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "78 ETH",
      totalBids: "36",
      totalStats: "42 - 21",
      winrate: "64%",
      kda: "1.23",
      rank: "Challenger",
    },
    {
      id: 6,
      place: 6,
      name: "FlyWithMe",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "74 ETH",
      totalBids: "32",
      totalStats: "20 - 21",
      winrate: "49%",
      kda: "5.23",
      rank: "Challenger",
    },
    {
      id: 7,
      place: 8,
      name: "BigBob007",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "67 ETH",
      totalBids: "25",
      totalStats: "20 - 21",
      winrate: "49%",
      kda: "5.23",
      rank: "Grandmaster",
    },
    {
      id: 8,
      place: 10,
      name: "Pudge",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "64 ETH",
      totalBids: "24",
      totalStats: "20 - 21",
      winrate: "49%",
      kda: "5.23",
      rank: "Master",
    },
    {
      id: 9,
      place: 12,
      name: "n0nameplayer",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "58 ETH",
      totalBids: "20",
      totalStats: "12 - 21",
      winrate: "34%",
      kda: "1.23",
      rank: "Master",
    },
    {
      id: 10,
      place: 12,
      name: "n0nameplayer",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "52 ETH",
      totalBids: "17",
      totalStats: "12 - 21",
      winrate: "34%",
      kda: "1.23",
      rank: "Master",
    },
    {
      id: 11,
      place: 13,
      name: "Kimberly Mastrangelo",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "49 ETH",
      totalBids: "15",
      totalStats: "12 - 21",
      winrate: "34%",
      kda: "1.23",
      rank: "Gold",
    },
    {
      id: 12,
      place: 13,
      name: "Kimberly Mastrangelo",
      avatar: "/placeholder.svg?height=80&width=80",
      totalSpends: "45 ETH",
      totalBids: "12",
      totalStats: "12 - 21",
      winrate: "34%",
      kda: "1.23",
      rank: "Gold",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }

  return (
    <div className="flex h-screen">

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Club header with gradient background */}
        <div className="relative border-b dark:border-[#2A2A2A]">
          {/* Gradient background */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-[url('/CosmicVoyagers.jpg?height=400&width=1200')] bg-cover bg-center opacity-20"
              style={{ filter: "blur(2px)" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121212] via-white/70 dark:via-[#121212]/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="relative px-6 py-4 mt-24 flex items-center gap-6 z-10">
            <Avatar className="h-16 w-16 rounded-full ring-2 ring-[#FF6B00]/30">
              <Avatar src="/placeholder.svg?height=64&width=64" alt="Club" />
            </Avatar>

            <div className="flex-1">
              <h1 className="text-xl font-bold text-start">John Doe</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-start">
                Top Spender in last auction period.
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Leaderboard resets in: </span>
              <span className="text-black dark:text-white">2 1 : 5 2</span>
            </div>
          </div>
        </div>

        {/* Leaderboard filters */}
        <div className="px-6 py-4 flex items-center justify-between border-b dark:border-[#2A2A2A]">
          <div className="flex items-center gap-6">
            <button className="text-sm font-medium px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] rounded" onClick={() => setTabs('topBidders')}>Top Bidders</button>
            <button className="text-sm font-medium px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] rounded" onClick={() => setTabs('topSpender')}>Top Spenders</button>
          </div>
          <div className="w-[300px]">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                  K
                </Kbd>
              }
              labelPlacement="outside"
              placeholder="Search..."
              startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
            />
          </div>
        </div>

        {/* Top 3 players */}
        <motion.div className="grid grid-cols-3 gap-4 px-6 py-4" variants={container} initial="hidden" animate="show">
          {topPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              variants={item}
              className="rounded-md p-4 border dark:border-[#2A2A2A] flex items-center justify-between"
            >
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <Avatar name={player.name} />
                    </Avatar>

                    <div>
                      <div className="font-medium text-start">{player.name}</div>
                    </div>
                  </div>

                  <Trophy className="h-6 w-6 text-amber-500" />
                </div>

                <div key={`stats-${player.id}`} className="flex justify-between text-sm">
                  <div className="flex flex-row gap-2 w-full justify-between items-center">
                    <div className="text-gray-600 dark:text-gray-400">{tabs == 'topBidders' ? 'Total Bids' : 'Total Spends'}</div>
                    <div className="font-medium mt-1">{tabs == 'topBidders' ? player.totalBids : player.totalSpends}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Leaderboard table */}
        <div className="px-6 py-6 flex-1 overflow-auto">
          { tabs == 'topBidders' ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm">
                  <th className="pb-3 font-medium w-[10%] text-center">Place</th>
                  <th className="pb-3 font-medium w-[70%]">Player name</th>
                  <th className="pb-3 font-medium w-[20%] text-center">Total Bid</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardPlayers.map((player) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * (player.place - 3) }}
                    className="border-t dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-[#1A1A1A]/50"
                  >
                    <td className="py-3 text-sm">{player.place}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <Avatar name={player.name} />
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-sm">{player.totalBids}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm">
                  <th className="pb-3 font-medium w-[10%] text-center">Place</th>
                  <th className="pb-3 font-medium w-[70%]">Player name</th>
                  <th className="pb-3 font-medium w-[20%] text-center">Total Spend</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardPlayers.map((player) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 * (player.place - 3) }}
                    className="border-t dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-[#1A1A1A]/50"
                  >
                    <td className="py-3 text-sm">{player.place}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <Avatar name={player.name} />
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-sm">{player.totalSpends}</div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
