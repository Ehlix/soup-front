import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { UseFormReturn } from 'react-hook-form';
import { ProfileSchema } from '../validation';
import { SelectCountry } from '@/components/selectors/selectCountry';
import { useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { type MouseEvent } from 'react';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
export const Profile = ({ form }: { form: UseFormReturn<ProfileSchema> }) => {
  const countryHandler = useCallback(
    (value: string) => {
      form.setValue('country', value, { shouldValidate: true });
    },
    [form],
  );

  const uploadAvatarHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpg, image/jpeg, image/png';
    input.onchange = () => {
      if (!input.files) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (!reader.result) return;
        form.setValue('avatar', reader.result as string, {
          shouldValidate: true,
        });
      };
    };
    input.click();
    return;
  };

  const deleteAvatarHandler = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    form.setValue('avatar', '', { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-1">
      <Form {...form}>
        <div className="flex items-end gap-4 sm:flex-col sm:items-center">
          <div className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Headline</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input type="string" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="relative mb-[1.38rem] flex size-[12.25rem] min-w-[12.25rem] items-center justify-center border border-border sm:order-first sm:mb-0 sm:mt-2">
            <button
              onClick={uploadAvatarHandler}
              className="group relative z-10 p-2"
            >
              <Avatar className="size-full transition-all group-hover:opacity-55 group-hover:blur-sm">
                <AvatarImage src={form.watch('avatar')} />
                <AvatarFallback />
              </Avatar>
              <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center text-lg opacity-0 transition-opacity group-hover:opacity-100">
                Upload avatar
              </div>
            </button>
            <button
              onClick={deleteAvatarHandler}
              className="absolute right-0 top-0 z-30 p-0.5 pt-1.5"
            >
              <TrashIcon className="size-5 text-destructive" />
            </button>
            <button
              onClick={deleteAvatarHandler}
              className="absolute bottom-0 left-0 z-30 p-0.5 pt-1.5"
            >
              <Pencil1Icon className="size-5 text-border" />
            </button>
          </div>
        </div>
        <FormField
          control={form.control}
          name="country"
          render={() => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <SelectCountry emit={countryHandler} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about yourself</FormLabel>
              <FormControl>
                <Input type="string" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};