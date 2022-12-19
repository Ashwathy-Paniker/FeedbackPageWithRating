import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Spacer,
  Box,
  Input,
  Flex,
  Stack,
  HStack,
  Wrap,
  WrapItem,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  StackDivider,
  ChakraBaseProvider,
  chakra,Image
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

import theme from "../Theme";
import {
  addReview,
  getReview,
  deleteReview,
  getCount,
  getAvg,
} from "../config/MyService";

function getRating() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
export default function Feedback() {
  let [feedback, setFeedback] = useState("");
  let [rating, setRating] = useState("");
  let [review, setReview] = useState("");
  let [count, setCount] = useState("");
  let [avg, setAvg] = useState("");

  let [active, setActive] = useState(false);
  // let [color, setColor] = useState("blue");

  const regFeedback = RegExp(/^(\w+\s?){10,100}/g);
  const submitreview = () => {
    let formdata = {
      feedback: feedback,
      rating: rating,
    };
    addReview(formdata).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
      }
    });
  };
  const DeleteReview = (id) => {
    console.log("Delete user called");
    deleteReview(id).then((res) => {
      console.log(id._id);
      alert("User Deleted :(");
    });
    GetUser();
  };

  useEffect(() => {
    GetUser();
    GetCount();
    GetAvg();
  }, [review]);

  const GetUser = () => {
    getReview().then((res) => {
      if (res.data.review) {
        console.log(res.data.review);
        let data1 = res.data.review;
        setReview(data1);
        console.log([data1]);

      } else {
        console.log(res.data.err);
      }
    });
  };
  const GetCount = () => {
    getCount().then((res) => {
      if (res.data.result) {
        console.log(res.data.result);
        let data1 = res.data.result;
        setCount(data1);

      } else {
        console.log(res.data.err);
      }
    });
  };
  const GetAvg = () => {
    getAvg().then((res) => {
      if (res.data.result) {
        let data1 = res.data.result;
        console.log(data1);
        console.log(Math.round(data1[0].AverageValue));
        setAvg(Math.round(data1[0].AverageValue));

      } else {
        console.log(res.data.err);
      }
    });
  };

  const nums = getRating();
  const handleClick = (num) => {
    setActive(true);
    setRating(num);
    console.log(rating);
  };
  return (
    <>
      <Box p={10}>
        <Card align="center" boxShadow="2xl" p={10} bg="#EDFDFD">
          <CardHeader>
            <Heading
              size="md"
              fontSize={35}
              fontFamily={"Work Sans"}
              fontWeight={"bold"}
            >
              How would you rate yourself with us ?
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={10} align="center">
              <Wrap direction={"row"} spacing={4}>
                {nums.map((num, index) => {
                  return (
                    <WrapItem>
                      <Button
                        borderRadius="60"
                        key={index}
                        onClick={() => handleClick(num)}
                        colorScheme={active ? "linkedin" : "facebook"}
                        variant='outline'
                      >
                        {num}
                      </Button>
                    </WrapItem>
                  );
                })}
              </Wrap>
              {/* --------------------------------------------*/}
              <FormControl>
                <Flex>
                  <Input
                    placeholder="Write Something..."
                    onChange={(event) => {
                      setFeedback(event.target.value);
                    }}
                  />{" "}
                  <Button
                    colorScheme='linkedin'
                    align="center"
                    onClick={submitreview}
                  
                  >
                    Send
                  </Button>
                </Flex>
                <Box>
                  {feedback != "" && !regFeedback.test(feedback) && (
                    <Box>
                      <Text color={"red"}> * Enter min 10 Character !</Text>
                    </Box>
                  )}
                </Box>
              </FormControl>
              {/* --------------------------------------------*/}
            </VStack>
          </CardBody>
        </Card>
      </Box>
      {/* --------------------------------------------*/}
      <Flex pr={20} pl={20}>
        <Box>
          {
            count ? <Text
            align="center"
            fontSize={25}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
          >
            {count} Reviews
          </Text>:" "
          }         
        </Box>
        <Spacer />
        <Box>
          {
            avg ?
            <Text
            align="center"
            fontSize={25}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
          >
            Average Rating: {avg}
          </Text> :" "
          }
          
        </Box>
      </Flex>
      <br />

      {review.length > 0 ? (
        review.map((val, index) => (
          <Box pr={20} pl={20}>
            <Card p={5} bg="#E6FFFA" boxShadow="2xl">
              <Flex>
                <Box align="center" w="600px" p={5}>
                  {val.feedback}
                </Box>
                <Spacer />
                <Box align="center" w="90px" p={5}>
                  <Button borderRadius="50" variant='outline'colorScheme='linkedin'>{val.rating}</Button>
                </Box>
                <Spacer />
                <Box align="center" w="70px" p={5}>
                  <SmallCloseIcon
                    color="red.500"
                    boxSize={6}
                    onClick={() => {
                      DeleteReview(val);
                    }}
                  />
                </Box>
              </Flex>
            </Card>
            <br />
          </Box>
        ))
      ) : (
        <Box align="center">
          <Text as="i" color="gray.500">No Review found</Text>
          <Image src="./images/nodata3.jpg" alt="No data" />
        </Box>
      )}
    </>
  );
}
