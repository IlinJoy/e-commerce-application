import SvgIcon from '@mui/material/SvgIcon';

export function SpriteIcon({ id }: { id: string }) {
  const sprite = '/icons/sprite.svg';
  return (
    <SvgIcon>
      <svg>
        <use href={`${sprite}#${id}`} />
      </svg>
    </SvgIcon>
  );
}
