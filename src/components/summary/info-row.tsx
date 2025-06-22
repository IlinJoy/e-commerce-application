import Typography from '@mui/material/Typography';

type CartAsideRowProps = {
  title: string;
  info?: string | number;
  className?: string;
};

export function InfoRow({ title, info = '', className }: CartAsideRowProps) {
  return (
    <Typography className={className}>
      <span>{title}: </span>
      {info}
    </Typography>
  );
}
