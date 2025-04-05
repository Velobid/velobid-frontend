"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ethers, formatEther } from "ethers"

import { Button } from "@heroui/button"
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card"
import { Tabs, Tab } from "@heroui/tabs"
import CreateAuctionModal from "@/components/create-auction-modal"
import { getContract, getProvider } from "@/contract/contract"
import abi from "@/contract/abi";

export default function Dashboard() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Ensure dark mode is applied on initial render
  useState(() => {
    document.documentElement.classList.add("dark")
  })

  const [overview, setOverview] = useState({
    activeAuctions: 0,
    upcoming: 0,
    totalBids: 0,
    avgBid: "0 ETH",
  })

  const fetchOverview = async () => {
    try {
      // const auctions: string[] = await contract.getAuctions(0, 100) // array of address
      const contract = await getContract();
      console.log("Contract address (via getAddress):", await contract.getAddress());
      console.log("ABI includes getAuctions:", !!contract.interface.getFunction("getAuctions"));

      const auctions = await contract.getAuctions(0, 100)
      console.log("Auctions:", auctions)

      let active = 0
      let upcoming = 0
      let totalBids = 0
      let totalValue = 0n // native bigint

      for (const address of auctions) {
        const auction = new ethers.Contract(address, abi, await getProvider())
        const status = await auction.status()
        const bids = await auction.getBids() // assumed array of { amount: bigint }

        totalBids += bids.length

        const bidSum = bids.reduce((acc: bigint, b: { amount: bigint }) => acc + b.amount, 0n)
        totalValue += bidSum

        if (status === 0) active++
        else if (status === 1) upcoming++
      }

      const avgBid = totalBids > 0 ? formatEther(totalValue / BigInt(totalBids)) : "0"

      setOverview({
        activeAuctions: active,
        upcoming,
        totalBids,
        avgBid: `${avgBid} ETH`,
      })
    } catch (err) {
      console.error("Fetch Overview Error:", err)
    }
  }

  useEffect(() => {
    fetchOverview()
  }, [])

  return (
    <div className={`min-h-screen w-full bg-background`}>
      <div className="grid min-h-screen w-full">

        {/* Main Content */}
        <main className="flex flex-col">

          {/* Dashboard Content */}
          <div className="flex-1 space-y-8 p-6 pt-16 md:p-8 md:pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold tracking-tight">Auction Dashboard</h1>
              <div className="ml-auto"></div>
              <CreateAuctionModal />
            </div>

            {/* Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Auction Overview Card */}
              <Card className="p-2">
                <CardHeader className="pb-2">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold leading-none tracking-tight text-start text-xl">Auction Overview</span>
                    <span className="text-sm text-foreground-500">Summary of your auction activities</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Active Auctions</p>
                      <p className="text-2xl font-bold">{overview.activeAuctions}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Upcoming</p>
                      <p className="text-2xl font-bold">{overview.upcoming}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Total Bids</p>
                      <p className="text-2xl font-bold">{overview.totalBids}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Avg. Bid Value</p>
                      <p className="text-2xl font-bold">{overview.avgBid}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Financial Overview Card */}
              <Card className="p-2">
                <CardHeader className="pb-2">
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold leading-none tracking-tight text-start text-xl">Financial Overview</span>
                    <span className="text-sm text-foreground-500">Your earnings and transactions</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Total Revenue</p>
                      <p className="text-2xl font-bold">156.8 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">This Month</p>
                      <p className="text-2xl font-bold">24.5 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Highest Sale</p>
                      <p className="text-2xl font-bold">12.6 ETH</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground-500">Pending</p>
                      <p className="text-2xl font-bold">3.2 ETH</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* Top Collections */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Top Collections</h2>

              </div>
              <Tabs aria-label="Options">
                <Tab key="all" title="All">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Collection Card 1 */}
                    <CollectionCard
                      image="/CosmicVoyagers.jpg?height=400&width=400"
                      name="Cosmic Voyagers"
                      creator="@cosmic_artist"
                      price="4.5 ETH"
                      timeLeft="6h 24m"
                      bidCount={18}
                    />

                    {/* Collection Card 2 */}
                    <CollectionCard
                      image="/DigitalDreamscape.jpg?height=400&width=400"
                      name="Digital Dreamscape"
                      creator="@dream_creator"
                      price="2.8 ETH"
                      timeLeft="12h 10m"
                      bidCount={24}
                      featured={true}
                    />

                    {/* Collection Card 3 */}
                    <CollectionCard
                      image="/AbstractRealms.jpg?height=400&width=400"
                      name="Abstract Realms"
                      creator="@abstract_mind"
                      price="3.2 ETH"
                      timeLeft="2h 45m"
                      bidCount={15}
                    />

                    {/* Collection Card 4 */}
                    <CollectionCard
                      image="/NeonGenesis.jpg?height=400&width=400"
                      name="Neon Genesis"
                      creator="@neon_artist"
                      price="5.6 ETH"
                      timeLeft="4h 30m"
                      bidCount={32}
                    />

                    {/* Collection Card 5 */}
                    <CollectionCard
                      image="/PixelPunks.jpg?height=400&width=400"
                      name="Pixel Punks"
                      creator="@pixel_master"
                      price="1.8 ETH"
                      timeLeft="8h 15m"
                      bidCount={12}
                    />

                    {/* Collection Card 6 */}
                    <CollectionCard
                      image="/EtherealEchoes.jpg?height=400&width=400"
                      name="Ethereal Echoes"
                      creator="@ethereal_creator"
                      price="3.9 ETH"
                      timeLeft="5h 50m"
                      bidCount={27}
                    />
                  </div>
                </Tab>
                <Tab key="active" title="Active">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Active Collection Cards */}
                    <CollectionCard
                      image="/DigitalDreamscape.jpg?height=400&width=400"
                      name="Digital Dreamscape"
                      creator="@dream_creator"
                      price="2.8 ETH"
                      timeLeft="12h 10m"
                      bidCount={24}
                      featured={true}
                    />

                    <CollectionCard
                      image="/AbstractRealms.jpg?height=400&width=400"
                      name="Abstract Realms"
                      creator="@abstract_mind"
                      price="3.2 ETH"
                      timeLeft="2h 45m"
                      bidCount={15}
                    />

                    <CollectionCard
                      image="/NeonGenesis.jpg?height=400&width=400"
                      name="Neon Genesis"
                      creator="@neon_artist"
                      price="5.6 ETH"
                      timeLeft="4h 30m"
                      bidCount={32}
                    />
                  </div>
                </Tab>
                <Tab key="upcoming" title="Upcoming">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Upcoming Collection Cards */}
                    <CollectionCard
                      image="/FutureVisions.jpg?height=400&width=400"
                      name="Future Visions"
                      creator="@future_artist"
                      price="TBD"
                      timeLeft="Starts in 2d"
                      bidCount={0}
                      upcoming={true}
                    />

                    <CollectionCard
                      image="/MetaverseMarvels.jpg?height=400&width=400"
                      name="Metaverse Marvels"
                      creator="@meta_creator"
                      price="TBD"
                      timeLeft="Starts in 5d"
                      bidCount={0}
                      upcoming={true}
                    />

                    <CollectionCard
                      image="/QuantumArtifacts.jpg?height=400&width=400"
                      name="Quantum Artifacts"
                      creator="@quantum_artist"
                      price="TBD"
                      timeLeft="Starts in 1d"
                      bidCount={0}
                      upcoming={true}
                    />
                  </div>
                </Tab>
              </Tabs>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface CollectionCardProps {
  image: string
  name: string
  creator: string
  price: string
  timeLeft: string
  bidCount: number
  featured?: boolean
  upcoming?: boolean
}

function CollectionCard({
  image,
  name,
  creator,
  price,
  timeLeft,
  bidCount,
  featured = false,
  upcoming = false,
}: CollectionCardProps) {

  const placeBid = async () => {
    try {
      const contract = new ethers.Contract("AUCTION_ADDRESS", abi, await getProvider())
      const tx = await contract.placeBid({ value: ethers.parseEther("1") })
      await tx.wait()
      alert("Bid placed!")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${featured ? "border-primary" : ""}`}>
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={400}
          height={400}
          className="aspect-square w-full object-cover"
        />
        {featured && (
          <div className="absolute top-2 right-2 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            Featured
          </div>
        )}
        {upcoming && (
          <div className="absolute top-2 right-2 rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
            Upcoming
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded-full bg-background/80 px-2 py-1 text-xs font-medium backdrop-blur-sm">
          {timeLeft}
        </div>
      </div>
      <CardBody className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm font-medium text-primary">{price}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>{creator}</p>
            <p>{bidCount} bids</p>
          </div>
          <Button variant="bordered" className="w-full" onPress={placeBid}>
            {upcoming ? "Remind Me" : "Place Bid"}
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
