"use client";
import React from "react";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const SubscribeForm = () => {
  return (
    <>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input type="email" placeholder="Enter your email" />
      </FormControl>
      <Button colorScheme="teal" type="submit">
        Subscribe
      </Button>
    </>
  );
};

export default SubscribeForm;
