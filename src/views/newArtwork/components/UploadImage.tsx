import { Button } from '@/components/ui/Button';
import { getImageUrl } from '@/lib/api/artworks';
import { uploadImage } from '@/model';
import { reatomComponent } from '@reatom/npm-react';
import { Image } from '@/components/cards/Image';
import { TrashIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

type Props = {
  images: string[];
  emit?: (files: string[]) => void;
};

export const UploadImage = reatomComponent<Props>(({ ctx, images, emit }) => {
  const loading = ctx.spy(uploadImage.statusesAtom).isPending;

  const uploadArtworksHandler = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/jpg, image/jpeg, image/png';
    input.onchange = async () => {
      if (!input.files || !input.files.length) return;
      const files = Array.from(input.files);
      const data = await Promise.all(
        files.map(async (file) => {
          const data = await uploadImage(ctx, file);
          return data.data.file;
        }),
      );
      emit && emit([...images, ...data.filter((image) => !!image)]);
    };
    input.click();
  };

  const positionHandler = (position: 'up' | 'down', image: string) => {
    const index = images.indexOf(image);
    if (position === 'up' && index > 0) {
      emit &&
        emit([
          ...images.slice(0, index - 1),
          images[index],
          images[index - 1],
          ...images.slice(index + 1),
        ]);
    }
    if (position === 'down' && index < images.length - 1) {
      emit &&
        emit([
          ...images.slice(0, index),
          images[index + 1],
          images[index],
          ...images.slice(index + 2),
        ]);
    }
  };

  const deleteImageHandler = (file: string) => {
    emit && emit(images.filter((image) => image !== file));
  };
  return (
    <>
      <Button
        type="button"
        disabled={loading}
        variant="outline"
        className="w-full"
        onClick={uploadArtworksHandler}
      >
        Add
      </Button>
      {!!images.length && (
        <div className="grid w-full grid-cols-5 gap-1 rounded-md border border-border p-1 xl:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1">
          {images.map((image) => (
            <div className="relative aspect-square" key={image}>
              <Image src={getImageUrl(image)} className="bg-muted" />
              <button
                type="button"
                onClick={() => deleteImageHandler(image)}
                className="absolute right-0.5 top-0.5 rounded-full bg-black p-1 text-destructive"
              >
                <TrashIcon />
              </button>
              <button
                type="button"
                onClick={() => positionHandler('up', image)}
                className="absolute bottom-0.5 left-0.5 rotate-180 rounded-full bg-black p-1"
              >
                <DoubleArrowRightIcon />
              </button>
              <button
                type="button"
                onClick={() => positionHandler('down', image)}
                className="absolute bottom-0.5 right-0.5 rounded-full bg-black p-1"
              >
                <DoubleArrowRightIcon className="" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}, 'UploadImage');
