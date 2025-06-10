import Typography from '@mui/material/Typography';

type CartAsideRowProps = {
  title: string;
  info?: string;
};

export function CartAsideRow({ title, info = '' }: CartAsideRowProps) {
  return (
    <Typography>
      <span>{title}: </span>
      {info}
    </Typography>
  );
}
