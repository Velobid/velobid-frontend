"use client"

// import type React from "react"
import * as React from "react"

import { Form } from "@heroui/form"
import { Input, Textarea } from "@heroui/input"
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@heroui/modal"
import { Button } from "@heroui/button"
import { Plus } from "lucide-react"

interface CreateAuctionModalProps {
    trigger?: React.ReactNode
}

export default function CreateAuctionModal({ trigger }: CreateAuctionModalProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const [password, setPassword] = React.useState("");
    const [submitted, setSubmitted] = React.useState(null);
    const [errors, setErrors] = React.useState({});

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
                        // onSubmit={onSubmit}
                    >
                        <div className="flex flex-col gap-4 w-full">
                            <Input
                                isRequired
                                errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your name";
                                    }

                                    // return errors.name;
                                }}
                                label="Name"
                                labelPlacement="outside"
                                name="name"
                                placeholder="Enter your name"
                            />

                            <Textarea
                                isRequired
                                label="Description"
                                labelPlacement="outside"
                                name="description" 
                                placeholder="Enter your description" 
                            />

                            <Input
                                isRequired
                                errorMessage={({validationDetails}) => {
                                    if (validationDetails.valueMissing) {
                                        return "Please enter your auction duration";
                                    }
                                }}
                                label="Duration"
                                labelPlacement="outside"
                                name="duration"
                                placeholder="Enter your auction duration"
                            />

                            <Input
                                isRequired
                                label="Starting Bid"
                                labelPlacement="outside"
                                name="startingBid"
                                placeholder="Enter your starting bid"
                            />

                            <div className="flex gap-4 mt-2">
                                <Button className="w-full" color="primary" type="submit">
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
    );
  
}

