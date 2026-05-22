"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { services } from "@/content/services";
import { toast } from "sonner";
import { Loader2Icon, SendIcon } from "lucide-react";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  service: z.string().max(80).optional().or(z.literal("")),
  subject: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  website: z.string().max(0).optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const t = useTranslations("pages.contact");
  const tCommon = useTranslations("common");
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", company: "", service: "", subject: "", message: "", website: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error("send failed");
      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = [
    { value: "", label: t("any") },
    ...services.map((s) => ({ value: s.slug, label: s.title })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} error={errors.name?.message}>
          <Input {...register("name")} aria-invalid={!!errors.name} />
        </Field>
        <Field label={t("email")} error={errors.email?.message}>
          <Input type="email" {...register("email")} aria-invalid={!!errors.email} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("phone")}>
          <Input type="tel" {...register("phone")} />
        </Field>
        <Field label={t("company")}>
          <Input {...register("company")} />
        </Field>
      </div>

      <Field label={t("service")}>
        <Select options={serviceOptions} {...register("service")} placeholder={t("selectService")} />
      </Field>

      <Field label={t("subject")}>
        <Input {...register("subject")} />
      </Field>

      <Field label={t("message")} error={errors.message?.message}>
        <Textarea rows={6} {...register("message")} aria-invalid={!!errors.message} />
      </Field>

      <Button type="submit" size="xl" disabled={loading} className="w-full sm:w-auto">
        {loading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <SendIcon className="size-4 rtl:rotate-180" />
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
