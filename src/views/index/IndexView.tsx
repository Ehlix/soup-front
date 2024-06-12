import { Filters } from './components/Filters';
import { ArtworkList } from './components/ArtworkList';

export const IndexView = () => {
  return (
    <div className="flex flex-col gap-2">
      <Filters />
      <ArtworkList />
    </div>
  );
};
