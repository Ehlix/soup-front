'use client';
import { reatomComponent } from '@reatom/npm-react';
import { Button } from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type NewArtworkSchema, newArtworkSchema } from './validation';
import { sessionDataAtom, uploadImage } from '@/model';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/Input';
import { Image } from '@/components/cards/Image';
import { getImageUrl } from '@/lib/api/artworks';
import {
  uploadNewArtwork,
  currentSubjectDescription,
  setCurrentSubject,
} from './model';
import { Cross2Icon } from '@radix-ui/react-icons';
import { mediumList, subjectList } from '@/lib/static/artworkMeta';
import { Textarea } from '@/components/ui/Textarea';
import { UploadImage } from './components/UploadImage';

export const NewArtworkView = reatomComponent(({ ctx }) => {
  const loading = ctx.spy(uploadImage.statusesAtom).isPending;
  const subjectDescription = ctx.spy(currentSubjectDescription);
  const folders = ctx.get(sessionDataAtom)?.userProfile?.folders;

  const form = useForm<NewArtworkSchema>({
    resolver: zodResolver(newArtworkSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: '',
      files: [],
      medium: [],
      subjects: [],
      folders: [],
    },
    mode: 'onSubmit',
  });

  const onSubmit = (payload: NewArtworkSchema) => {
    uploadNewArtwork(ctx, payload);
  };

  const uploadThumbnailHandler = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpg, image/jpeg, image/png';
    input.onchange = async () => {
      if (!input.files) return;
      const file = input.files[0];
      const data = await uploadImage(ctx, file);
      if (!data) return;
      form.setValue('thumbnail', data.data.file, { shouldValidate: true });
    };
    input.click();
  };

  const arrFieldHandler = (
    formField: 'medium' | 'subjects' | 'folders',
    value: string,
  ) => {
    if (form.getValues(formField).includes(value)) {
      form.setValue(
        'medium',
        form.getValues(formField).filter((item) => item !== value),
        { shouldValidate: true },
      );
    } else {
      form.setValue(formField, [...form.getValues(formField), value], {
        shouldValidate: true,
      });
    }
  };

  const subjectHoverHandler = (e: React.MouseEvent, subject: string) => {
    e.preventDefault();
    setCurrentSubject(ctx, subject);
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="flex w-11/12 flex-col gap-1 lg:w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="mb-4 flex gap-4">
              <Button
                disabled={
                  loading || ctx.spy(uploadNewArtwork.statusesAtom).isPending
                }
                type="submit"
                className="w-32"
              >
                {ctx.spy(uploadNewArtwork.statusesAtom).isPending
                  ? 'Saving...'
                  : 'Save'}
              </Button>
            </div>
            <div className="text-3xl font-bold">Create new artwork</div>
            <div className="flex items-end gap-4 sm:flex-col sm:items-start sm:gap-0">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="w-full sm:order-last">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="thumbnail"
                render={() => (
                  <FormItem className="self-start sm:order-first">
                    <FormLabel>Thumbnail</FormLabel>
                    <div className="group relative flex size-52 min-w-52 items-center justify-center border border-border">
                      <button
                        type="button"
                        disabled={loading}
                        className="z-10 h-full w-full p-0"
                        onClick={uploadThumbnailHandler}
                      >
                        {form.watch('thumbnail') ? (
                          <div className="z-10 h-full w-full p-0 transition-all group-hover:opacity-55 group-hover:blur-sm">
                            <Image src={getImageUrl(form.watch('thumbnail'))} />
                          </div>
                        ) : (
                          <div className="text-lg">Upload</div>
                        )}
                        {loading ? (
                          <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center text-lg transition-opacity">
                            Loading ...
                          </div>
                        ) : (
                          !!form.watch('thumbnail') && (
                            <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center text-lg opacity-0 transition-opacity group-hover:opacity-100">
                              Upload
                            </div>
                          )
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormLabel>Artworks</FormLabel>
                  <UploadImage
                    images={form.watch('files')}
                    emit={(v) => form.setValue('files', v)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medium"
              render={() => (
                <FormItem>
                  <FormLabel>Medium</FormLabel>
                  <div className="grid grid-cols-5 gap-1 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1">
                    {mediumList.map((medium) => (
                      <Button
                        key={medium.name}
                        type="button"
                        disabled={
                          form.getValues('medium').length >= 3 &&
                          !form.getValues('medium').includes(medium.name)
                        }
                        variant={
                          form.getValues('medium').includes(medium.name)
                            ? 'default'
                            : 'outline'
                        }
                        onClick={() => arrFieldHandler('medium', medium.name)}
                        className="capitalize"
                      >
                        {medium.name}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subjects"
              render={() => (
                <FormItem>
                  <FormLabel>Subjects</FormLabel>
                  <div className="flex flex-wrap gap-1">
                    {form.watch('subjects').map((subject) => (
                      <Button
                        key={subject}
                        type="button"
                        variant={'outline'}
                        onClick={() => arrFieldHandler('subjects', subject)}
                        className="flex h-7 gap-1 px-2"
                      >
                        {subject}
                        <Cross2Icon />
                      </Button>
                    ))}
                  </div>
                  <div className="flex h-[18.1rem] gap-1">
                    <div className="flex w-full max-w-72 flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
                      {subjectList.map((subject) => (
                        <Button
                          key={subject.name}
                          type="button"
                          disabled={
                            form.getValues('subjects').length >= 3 &&
                            !form.getValues('subjects').includes(subject.name)
                          }
                          variant={
                            form.getValues('subjects').includes(subject.name)
                              ? 'default'
                              : 'outline'
                          }
                          onPointerOver={(e) =>
                            subjectHoverHandler(e, subject.name)
                          }
                          onClick={() =>
                            arrFieldHandler('subjects', subject.name)
                          }
                          className="h-fit text-wrap capitalize"
                        >
                          {subject.name}
                        </Button>
                      ))}
                    </div>
                    <div className="flex h-full w-full items-center justify-center rounded-md border border-input p-2">
                      <p className="text-wrap text-center text-base">
                        {subjectDescription}
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {folders && (
              <FormField
                control={form.control}
                name="folders"
                render={() => (
                  <FormItem>
                    <FormLabel>Folders</FormLabel>
                    <div className="grid grid-cols-5 gap-1 lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1">
                      {folders.map((folder) => (
                        <Button
                          key={folder}
                          type="button"
                          variant={
                            form.getValues('folders').includes(folder)
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => arrFieldHandler('folders', folder)}
                          className="capitalize"
                        >
                          {folder}
                        </Button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}, 'NewArtworkView');
