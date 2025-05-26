import type { CategoryWithChildren } from '@/utils/catalog-utils';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type CategoryItemProps = {
  id: string;
  name: string;
  slug: string;
  children: CategoryWithChildren[];
  selectedCategoryId: string | null;
  onClick: (path: string, id: string) => void;
  level: number;
};

export function CategoryListItem({ id, name, slug, level, children, selectedCategoryId, onClick }: CategoryItemProps) {
  const hasChildren = children.length > 0;
  const levelOffset = 2;

  return (
    <>
      <ListItemButton
        key={id}
        selected={id === selectedCategoryId}
        onClick={() => onClick(slug, id)}
        sx={{ pl: levelOffset + level * levelOffset }}
      >
        <ListItemText primary={name} />
      </ListItemButton>
      {hasChildren && (
        <List>
          {children.map((subCategory) => (
            <CategoryListItem
              id={subCategory.id}
              selectedCategoryId={selectedCategoryId}
              slug={`${slug}/${subCategory.slug['en-US']}`}
              onClick={onClick}
              name={`> ${subCategory.name['en-US']}`}
              children={subCategory.children}
              level={level + 1}
            />
          ))}
        </List>
      )}
    </>
  );
}
