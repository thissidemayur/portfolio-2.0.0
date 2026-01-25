"use client";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Save,
  ChevronLeft,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  ExternalLink,
  Award,
  Eye,
} from "lucide-react";
import { iCertificate } from "@/types/database";
import Link from "next/link";
import {
  updateCertAction,
  createCertAction,
} from "@/actions/certificates.actions";
import { useRouter } from "next/navigation";

const certSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issue_date: z.string().min(1, "Issue date is required"),
  expiry_date: z.string().optional().nullable(),
  image_url: z.string().url("Must be a valid URL"),
  slug: z.string().min(1, "Slug is required"),
  verify_link: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  credential_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  is_industry_standard: z.boolean().default(false),
  show_on_home: z.boolean().default(false),
});

type CertFormValues = z.infer<typeof certSchema>;

interface CertificateFormProps {
  cert?: iCertificate;
  isEdit?: boolean;
}

export default function CertificateForm({
  cert,
  isEdit = false,
}: CertificateFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CertFormValues>({
    resolver: zodResolver(certSchema),
    defaultValues: {
      ...cert,
      issue_date: cert?.issue_date
        ? new Date(cert.issue_date).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      expiry_date: cert?.expiry_date
        ? new Date(cert.expiry_date).toISOString().split("T")[0]
        : "",
      verify_link: cert?.verify_link || "",
      credential_url: cert?.credential_url || "",
      is_industry_standard: cert?.is_industry_standard || false,
      show_on_home: cert?.show_on_home || false,
    },
  });

  // Watch values for Live Preview
  const watchedValues = useWatch({ control });

  const onSubmit = async (data: CertFormValues) => {
    const result =
      isEdit && cert
        ? await updateCertAction(cert.id, data)
        : await createCertAction(data);
    if (result.success) {
      router.push("/admin/certifications");
      router.refresh();
    } else {
      alert(result.error || "Operation failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 px-0.5 md:px-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-10">
        <div className="flex items-center gap-4">
          
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              {isEdit ? "Update_Node" : "Initialize_Node"}
            </h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
              {isEdit
                ? `ID: ${cert?.id} // ${cert?.slug}`
                : "Status: Awaiting_Data"}
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Area */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-8 space-y-8"
        >
          <section className="bg-[#0A0A0A] p-6 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8">
            <div className="flex items-center gap-2 text-white/20 mb-4">
              <Eye size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                Core_Registry_Data
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper label="Title" error={errors.title?.message}>
                <input
                  {...register("title")}
                  placeholder="Cloud Architecture Professional"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 transition-all"
                />
              </InputWrapper>
              <InputWrapper label="Issuer" error={errors.issuer?.message}>
                <input
                  {...register("issuer")}
                  placeholder="Google / AWS / Coursera"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm outline-none focus:border-blue-500/50 transition-all"
                />
              </InputWrapper>
            </div>

            <InputWrapper label="Image_URL" error={errors.image_url?.message}>
              <div className="relative group">
                <ImageIcon
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                />
                <input
                  {...register("image_url")}
                  placeholder="https://s3.amazonaws.com/..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pl-12 text-xs font-mono text-blue-400 outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </InputWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <InputWrapper
                label="Issue_Date"
                error={errors.issue_date?.message}
              >
                <input
                  type="date"
                  {...register("issue_date")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white/60 outline-none"
                />
              </InputWrapper>
              <InputWrapper
                label="Expiry_Date"
                error={errors.expiry_date?.message}
              >
                <input
                  type="date"
                  {...register("expiry_date")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white/60 outline-none"
                />
              </InputWrapper>
              <InputWrapper label="Slug" error={errors.slug?.message}>
                <input
                  {...register("slug")}
                  placeholder="google-cert-01"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-emerald-400 font-mono outline-none"
                />
              </InputWrapper>
            </div>
          </section>

          <section className="bg-[#0A0A0A] p-6 md:p-10 rounded-[2.5rem] border border-white/5 space-y-8">
            <div className="flex items-center gap-2 text-white/20 mb-4">
              <ExternalLink size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                Verification_End_Points
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputWrapper
                label="Verify_Link"
                error={errors.verify_link?.message}
              >
                <input
                  {...register("verify_link")}
                  placeholder="https://credly.com/..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs font-mono outline-none"
                />
              </InputWrapper>
              <InputWrapper
                label="Credential_URL (PDF)"
                error={errors.credential_url?.message}
              >
                <input
                  {...register("credential_url")}
                  placeholder="https://drive.google.com/..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs font-mono outline-none"
                />
              </InputWrapper>
            </div>
          </section>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex items-center justify-center gap-3 w-full py-8 bg-white text-black rounded-[2.5rem] font-black uppercase text-xs tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20 overflow-hidden shadow-2xl shadow-white/5"
          >
            <div className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000" />
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Save size={18} />{" "}
                {isEdit ? "Commit_System_Changes" : "Deploy_To_Registry"}
              </>
            )}
          </button>
        </form>

        {/* Sidebar / Preview Area */}
        <div className="lg:col-span-4 space-y-8">
          {/* Live Preview Card */}
          <div className="sticky top-10 space-y-8">
            <div className="space-y-4">
              <h3 className="text-[10px] font-mono uppercase text-white/20 tracking-widest px-4">
                Live_Preview
              </h3>
              <div className="relative group bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden aspect-[4/3] flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                {watchedValues.image_url ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={watchedValues.image_url}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm group-hover:blur-none transition-all duration-700"
                  />
                ) : (
                  <ImageIcon size={40} className="text-white/5 mb-4" />
                )}

                <div className="relative z-10 space-y-2">
                  <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                    {watchedValues.issuer || "Issuer_Name"}
                  </p>
                  <h4 className="text-xl font-black italic uppercase leading-none text-white">
                    {watchedValues.title || "Certificate_Title"}
                  </h4>
                  <div className="flex justify-center gap-2 mt-4">
                    {watchedValues.show_on_home && (
                      <span className="bg-blue-500/20 text-blue-400 text-[8px] font-black px-2 py-1 rounded-full border border-blue-500/20">
                        HOME
                      </span>
                    )}
                    {watchedValues.is_industry_standard && (
                      <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-black px-2 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <Award size={8} /> GOLD
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Config Panel */}
            <div className="p-8 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] space-y-8">
              <h3 className="text-[10px] font-mono uppercase text-white/20 tracking-widest">
                Visibility_Logic
              </h3>
              <ToggleSwitch
                label="Featured_Home"
                description="Display in carousel"
                register={register("show_on_home")}
              />
              <ToggleSwitch
                label="Gold_Tier"
                description="Industry standard rank"
                register={register("is_industry_standard")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-components
function ToggleSwitch({ label, description, register }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
          {label}
        </p>
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">
          {description}
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" {...register} className="sr-only peer" />
        <div className="w-11 h-6 bg-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/20 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:bg-white" />
      </label>
    </div>
  );
}

function InputWrapper({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] ml-4">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-[9px] font-mono mt-1 ml-4 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  );
}
