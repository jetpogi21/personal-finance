import { Stack, StackProps } from "@mui/material";

interface Props extends StackProps {
  gap?: number;
  component?: React.ElementType;
  [key: string]: unknown;
}

export const RowStack = ({ gap = 2, ...props }: Props) => {
  return <Stack direction="row" gap={gap} {...props} />;
};

export const ColumnStack = ({ gap = 2, ...props }: Props) => {
  return <Stack direction="column" gap={gap} {...props} />;
};
