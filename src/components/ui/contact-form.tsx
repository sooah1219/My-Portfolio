"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    const promise = fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to send message.");
      }
      return data;
    });

    toast.promise(promise, {
      loading: "Sending your message...",
      success: "Message sent! I'll get back to you soon 🚀",
      style: {
        background: "#E7E6FF",
        color: "#4E47CE",
        fontFamily: "DM Sans, sans-serif",
        borderRadius: "10px",
        boxShadow: "0 4px 18px rgba(109, 101, 255, 0.35)",
        border: "#6D65FF",
      },
      error: (err) =>
        err instanceof Error ? err.message : "Something went wrong.",
    });

    try {
      await promise;
      form.reset();
    } catch (_) {}
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  autoComplete="name"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Tell me a bit about your project or question..."
                  className="text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button
            asChild
            variant="outline"
            aria-label="Book an interview"
            className="w-full sm:w-auto border-[#6D65FF] text-[#6D65FF] hover:bg-[#6D65FF]/10 hover:text-[#594FEE]"
          >
            <Link href="/calendar">Book an interview</Link>
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#6D65FF] text-white transition-colors hover:bg-[#5951E6]"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
