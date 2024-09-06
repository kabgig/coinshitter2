import { Box, Flex } from "@radix-ui/themes";
import { Link } from "@radix-ui/themes";
import logo from "../assets/logo.png";
// import ColorModeSwitch from "./ColorModeSwitch";
// import ConnectWalletButton from "./ConnectWalletButton";

const NavBar = () => {
  //const { colorMode } = useColorMode();
  return (
    <Flex align="center" height="60px" width="100%">
      <Box>
        <Flex>
          <Link href="/">
            {/* {colorMode === "light" ? (
              <Image src={logo} boxSize="200px" objectFit="contain" />
            ) : (
              <Image
                src={logo}
                boxSize="200px"
                objectFit="contain"
                filter="invert(1)"
              />
            )} */}
          </Link>
          <Link href="/">Home</Link>
          <Link href="/launch">Launch</Link>
          <Link href="/faq">FAQ</Link>
        </Flex>
      </Box>

      <Box>
        <Flex>
          {/* <ConnectWalletButton />
          <ColorModeSwitch /> */}
        </Flex>
      </Box>
    </Flex>
  );
};

export default NavBar;
