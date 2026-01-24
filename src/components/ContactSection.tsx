"use client";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/ui/contact-form";

export default function ContactSection() {
  return (
    <section className="w-full flex justify-center px-4">
      <div className="max-w-6xl w-full space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Contact
          </h1>
          <p className="text-sm text-muted-foreground">
            Feel free to reach out about projects, collaboration, or questions.
          </p>
        </div>

        <Card className="border border-border/70 bg-card/80 shadow-sm">
          <div className="p-4 sm:p-8 md:p-10 space-y-8 text-neutral-900 leading-relaxed">
            <ContactForm />
          </div>
        </Card>
      </div>
    </section>
  );
}
