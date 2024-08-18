import { examples, gitHub } from "@/constant";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Link,
} from "@chakra-ui/react";
import { Icon } from "@/components/Icon";

export default function Index() {
  return (
    <main className="h-screen w-screen overflow-auto bg-[#f7f8fa] bg-[url('/images/bg.jpg')] bg-center bg-no-repeat bg-[length:100%_100%] md:flex md:justify-center md:content-center md:p-12">
      <div className="lg:bg-[rgba(0,0,0,0.4)] max-w-screen-xl rounded-md flex flex-col justify-center content-center">
        <div className="flex justify-between content-center al w-full text-3xl font-bold md:text-white pt-4 px-8">
          <div>Web3 Next Learn</div>
          <Link href={gitHub} target="_blank">
            <Icon name="AiFillGithub" size={32} />
          </Link>
        </div>
        <Flex className="flex flex-wrap md:p-4">
          {examples.map(({ name, url, description, technologyStack }) => {
            return (
              <Box key={name} className="w-full md:w-1/2 p-4" minH="360px">
                <Link className="!no-underline" href={url}>
                  <Card className="w-full h-full !bg-[rgba(0,0,0,0.4)] !text-white hover:border">
                    <CardHeader className="text-lg font-bold">
                      {name}
                    </CardHeader>
                    <CardBody>{description}</CardBody>
                    <CardFooter>
                      <Flex className="flex-col">
                        <Box className="font-bold pb-4">技术栈</Box>
                        <Box>
                          <Flex className="flex-wrap" gap={6}>
                            {technologyStack.map((technology) => {
                              return (
                                <Box
                                  className="rounded-md flex justify-center items-center md:bg-[rgba(0,0,0,0.4)] py-1 px-2"
                                  key={technology}
                                >
                                  {technology}
                                </Box>
                              );
                            })}
                          </Flex>
                        </Box>
                      </Flex>
                    </CardFooter>
                  </Card>
                </Link>
              </Box>
            );
          })}
        </Flex>
      </div>
    </main>
  );
}
