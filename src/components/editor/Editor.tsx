import React, { useRef, useState } from "react";
import { Editor as DraftEditor, EditorState, RichUtils } from "draft-js";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
} from "@mui/icons-material";
import { Toolbar, Button, Box } from "@mui/material";
import { RowStack } from "../MUI/Stack";

const Editor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<DraftEditor>(null);

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleCodeClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "CODE"));
  };

  const handleChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleBoxClick = () => {
    if (editorRef.current !== null) {
      editorRef.current.focus();
    }
  };

  return (
    <>
      <RowStack
        sx={{
          border: 1,
          borderColor: "grey.400",
          borderRadius: 1,
          "& .MuiButtonBase-root": {
            borderColor: "grey.500",
            minWidth: 0,
            p: 0.5,
            color: "black",
          },
        }}
        gap={1}
        p={1}
      >
        <Button
          onClick={handleBoldClick}
          tabIndex={-1}
          size="small"
          variant="outlined"
        >
          <FormatBold />
        </Button>
        <Button
          onClick={handleItalicClick}
          tabIndex={-1}
          size="small"
          variant="outlined"
        >
          <FormatItalic />
        </Button>
        <Button
          onClick={handleUnderlineClick}
          tabIndex={-1}
          size="small"
          variant="outlined"
        >
          <FormatUnderlined />
        </Button>
        <Button
          onClick={handleCodeClick}
          tabIndex={-1}
          size="small"
          variant="outlined"
        >
          <Code />
        </Button>
      </RowStack>
      <Box
        sx={{
          p: 2,
          border: 1,
          borderColor: "grey.400",
          borderRadius: 1,
          "&: hover": { borderColor: "black" },
        }}
        onClick={handleBoxClick}
      >
        <DraftEditor
          editorState={editorState}
          onChange={handleChange}
          ref={editorRef}
        />
      </Box>
    </>
  );
};

export default Editor;
