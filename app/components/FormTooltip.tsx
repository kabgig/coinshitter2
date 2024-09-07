import { InputRightElement, Tooltip } from "@chakra-ui/react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface Props {
  text: string;
}
const FormTooltip = ({ text }: Props) => {
  return (
    <InputRightElement>
      <Tooltip label={text} fontSize="md">
        <span>
          <AiOutlineInfoCircle />
        </span>
      </Tooltip>
    </InputRightElement>
  );
};

export default FormTooltip;
