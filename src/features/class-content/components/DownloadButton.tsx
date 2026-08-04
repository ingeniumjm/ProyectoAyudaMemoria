import { Button } from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";

interface DownloadButtonProps {
  content: string;
  fileName: string;
  label?: string;
}

const DownloadButton = ({
  content,
  fileName,
  label = "Descargar código de la clase",
}: DownloadButtonProps) => {
  const handleDownload = () => {
    const file = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(downloadUrl);
  };

  return (
    <Button
      type="button"
      size="sm"
      leftIcon={<MdOutlineFileDownload aria-hidden="true" />}
      onClick={handleDownload}
      isDisabled={!content.trim()}
      color="#d9b8ff"
      bg="rgba(126, 34, 206, 0.16)"
      border="1px solid"
      borderColor="rgba(192, 132, 252, 0.48)"
      fontWeight="600"
      _hover={{ bg: "rgba(126, 34, 206, 0.28)" }}
      _active={{ bg: "rgba(126, 34, 206, 0.36)" }}
      _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
    >
      {label}
    </Button>
  );
};

export default DownloadButton;
