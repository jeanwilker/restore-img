'use client';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import useUserActions from '@/store/useUserActions';

export const links = [
  { name: 'Fotos', hash: 'fotos' },
  { name: 'Colorizar', hash: 'colorizar' },
] as const;

const OptionsList = () => {
  const { setActiveOption } = useUserActions();

  return (
    <TabsList>
      {links.map((link) => (
        <TabsTrigger
          key={link.hash}
          value={link.hash}
          className="relative"
          onClick={() => {
            setActiveOption(link.name);
          }}
        >
          {link.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default OptionsList;
