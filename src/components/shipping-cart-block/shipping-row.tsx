import Typography from '@mui/material/Typography';

type CartAsideRowProps = {
  title: string;
  info?: string;
};

export function ShippingRow({ title, info = '' }: CartAsideRowProps) {
  return (
    <Typography>
      <span>{title}: </span>
      {info}
    </Typography>
  );
}
