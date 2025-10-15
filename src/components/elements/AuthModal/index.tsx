'use client';
import { Dialog, DialogContent } from '@/components/elements/Dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Variants } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'motion/react';
import { Button } from '@/components/elements/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/elements/Form';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string(),
});

export const LoginForm = () => {
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    setLoading(false);
  };

  return (
    <Dialog open={false}>
      <DialogContent asChild forceMount>
        <motion.div
          //   initial="closed"
          //   animate="open"
          //   exit="closed"
          className="fixed left-1/2 top-1/2 z-50 flex w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-xl border border-neutral-800 bg-black/80 p-16 text-text-body shadow-2xl outline-none"
        >
          <h1 className="mb-6 text-xl text-text-strong">
            Login to create a comment
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input
                        className="h-10 w-full rounded-md bg-neutral-700 px-3 outline-none"
                        {...field}
                        placeholder="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="h-10 w-full">
                Login
              </Button>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
