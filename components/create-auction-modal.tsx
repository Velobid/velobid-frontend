"use client"

import * as React from "react"
import { ethers, parseEther } from "ethers"
import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal"
import { Button } from "@heroui/button"
import { Plus } from "lucide-react"
import { getContract } from "@/contract/contract"


interface CreateAuctionModalProps {
    trigger?: React.ReactNode
}

type AuctionForm = {
    name: string
    description: string
    duration: string
    startingBid: string
}

export default function CreateAuctionModal({ trigger }: CreateAuctionModalProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const [formData, setFormData] = React.useState({
        name: "",
        description: "",
        duration: "",
        startingBid: "",
    })

    const [submitted, setSubmitted] = React.useState<typeof formData | null>(null)
    const [errors, setErrors] = React.useState({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true)
            const contract = await getContract()

            const { name, description, duration, startingBid } = formData

            const durationInSeconds = parseInt(duration) * 60 // misal menit ke detik
            const startingBidWei = parseEther(startingBid)

            const tx = await contract.createAuction(name, description, durationInSeconds, startingBidWei)
            await tx.wait()

            setSubmitted(formData)
            setFormData({ name: "", description: "", duration: "", startingBid: "" })
        } catch (err) {
            console.error("Auction creation failed:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <Button className="mt-4 md:mt-0" onPress={onOpen}>
                <Plus className="h-4 w-4" />
                Create Auction
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Auction</ModalHeader>
                            <ModalBody>
                                <Form
                                    className="w-full justify-center items-center space-y-4"
                                    validationErrors={errors}
                                    onReset={() => setSubmitted(null)}
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex flex-col gap-4 w-full">
                                        <Input
                                            isRequired
                                            label="Name"
                                            labelPlacement="outside"
                                            name="name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />

                                        <Textarea
                                            isRequired
                                            label="Description"
                                            labelPlacement="outside"
                                            name="description"
                                            placeholder="Enter your description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            isRequired
                                            type="number"
                                            label="Duration (minutes)"
                                            labelPlacement="outside"
                                            name="duration"
                                            placeholder="Enter duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />

                                        <Input
                                            isRequired
                                            type="number"
                                            label="Starting Bid (ETH)"
                                            labelPlacement="outside"
                                            name="startingBid"
                                            placeholder="Enter your starting bid"
                                            value={formData.startingBid}
                                            onChange={handleChange}
                                        />

                                        <div className="flex gap-4 mt-2">
                                            <Button className="w-full" color="primary" type="submit" isLoading={isSubmitting}>
                                                Submit
                                            </Button>
                                        </div>
                                    </div>

                                    {submitted && (
                                        <div className="text-small text-default-500 mt-4">
                                            Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                                        </div>
                                    )}
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
