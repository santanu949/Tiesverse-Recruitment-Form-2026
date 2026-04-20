import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

// PASTED YOUR GENERATED SCRIPT URL HERE
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxo_NdaVTHGcyFS_NdpjWd23kHD1R6bFHjXtC7HwAbM1CFcJYigBwUmM53yx5hV4hHo/exec";

const schema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    roles: z.array(z.string()).min(1, "Please select at least one role"),
    status: z.string().min(1, "Please select your current status"),
    qualification: z.string().min(1, "Please select your highest qualification"),
    upscExperience: z.enum(["Yes", "No"], { required_error: "Please select an option" }),
    upscAttempts: z.string().optional(),
    contentExperience: z.string().min(1, "Please select your experience level"),
    portfolioLink: z.string().optional(),
    resume: z.any()
}).superRefine((data, ctx) => {
    if (data.upscExperience === "Yes" && (!data.upscAttempts || Number(data.upscAttempts) < 1)) {
        ctx.addIssue({ path: ["upscAttempts"], message: "Please enter a valid number of attempts", code: z.ZodIssueCode.custom });
    }
    if (data.contentExperience !== "No experience" && (!data.portfolioLink || data.portfolioLink.length < 5)) {
        ctx.addIssue({ path: ["portfolioLink"], message: "Portfolio link or Handle is required for experienced candidates", code: z.ZodIssueCode.custom });
    }
});

const ROLES = [
    "Content Researcher", "Content Writer", "Graphic Designer",
    "Video Editor (Reels)", "Social Media Manager", "Outreach & Marketing"
];

// Helper function to convert file to base64 for Google Apps Script
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve({
                base64: base64String,
                fileName: file.name,
                mimeType: file.type
            });
        };
        reader.onerror = (error) => reject(error);
    });
};

export const RecruitmentForm = () => {
    const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { roles: [] }
    });

    const watchUpsc = watch("upscExperience");
    const watchContentExp = watch("contentExperience");

    const onSubmit = async (data) => {
        setSubmitStatus({ type: null, message: '' });

        try {
            let base64File = null;
            // data.resume is a FileList from the input type="file"
            if (data.resume && data.resume.length > 0) {
                base64File = await convertToBase64(data.resume[0]);
            }

            // Prepare payload exactly as Apps Script expects it
            const payload = {
                ...data,
                resume: base64File
            };

            const response = await fetch(SCRIPT_URL, {
                method: "POST",
                // We omit Content-Type header to bypass strict CORS preflight checks on Apps Script
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === "success") {
                setSubmitStatus({ type: 'success', message: 'Application submitted successfully! We will be in touch.' });
                reset(); // Clear the form
            } else {
                setSubmitStatus({ type: 'error', message: result.message || 'Something went wrong.' });
            }

        } catch (error) {
            console.error("Submission Error:", error);
            setSubmitStatus({ type: 'error', message: 'Network error. Please try again later.' });
        }
    };

    return (
        <div className="relative">
            {/* Alert Messages */}
            {submitStatus.type && (
                <div className={`p-4 mb-8 rounded-xl font-bold border-2 animate-in fade-in slide-in-from-top-4 duration-300 ${submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border-green-200'
                        : 'bg-red-50 text-red-800 border-red-200'
                    }`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* 2-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <Input label="Full Name" placeholder="eg: Ashutosh Patra" {...register("fullName")} error={errors.fullName} />
                    <Input label="Email Address" type="email" placeholder="eg: yourname@email.com" {...register("email")} error={errors.email} />

                    <Input label="WhatsApp Number" type="tel" placeholder="eg: 9876543210" {...register("phone")} error={errors.phone} />
                    <Select label="Current Status" {...register("status")} error={errors.status} options={[
                        { value: "Student", label: "Student (Preparing for exams)" },
                        { value: "Working Professional", label: "Working Professional" }
                    ]} />

                    <Select label="Highest Qualification" {...register("qualification")} error={errors.qualification} options={[
                        { value: "Graduate", label: "Graduate" },
                        { value: "Postgraduate", label: "Postgraduate" },
                        { value: "Other", label: "Other" }
                    ]} />
                    <Select label="Appeared for UPSC / State PSC?" {...register("upscExperience")} error={errors.upscExperience} options={[
                        { value: "Yes", label: "Yes" },
                        { value: "No", label: "No" }
                    ]} />
                </div>

                {watchUpsc === "Yes" && (
                    <div className="w-full md:w-1/2 pr-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Input label="Number of Attempts" type="number" placeholder="eg: 2" {...register("upscAttempts")} error={errors.upscAttempts} />
                    </div>
                )}

                {/* Roles Section */}
                <div className="space-y-3 pt-6 border-t-2 border-borderLight mt-8">
                    <label className="text-sm font-extrabold text-textMain uppercase tracking-wide">Select Roles (Multiple allowed)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {ROLES.map((role) => (
                            <label key={role} className="flex items-center gap-3 cursor-pointer group bg-background border-2 border-borderLight p-3.5 rounded-xl hover:border-primary hover:shadow-md transition-all">
                                <input type="checkbox" value={role} {...register("roles")}
                                    className="w-5 h-5 rounded border-borderLight text-primary focus:ring-primary focus:ring-2 cursor-pointer" />
                                <span className="text-sm text-textMain font-bold">{role}</span>
                            </label>
                        ))}
                    </div>
                    {errors.roles && <span className="text-xs text-red-600 font-bold">{errors.roles.message}</span>}
                </div>

                {/* Experience & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t-2 border-borderLight mt-8">
                    <Select label="Content Creation Experience" {...register("contentExperience")} error={errors.contentExperience} options={[
                        { value: "Professional", label: "Yes (Professional experience)" },
                        { value: "Basic/Personal", label: "Yes (Basic / Personal projects)" },
                        { value: "No experience", label: "No experience" }
                    ]} />

                    {watchContentExp && watchContentExp !== "No experience" ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <Input label="Portfolio / Work Links (or IG Handle)" placeholder="https://..." {...register("portfolioLink")} error={errors.portfolioLink} />
                        </div>
                    ) : <div />}
                </div>

                {/* File Upload */}
                <div className="flex flex-col gap-1.5 w-full text-left pt-4">
                    <label className="text-sm font-extrabold text-textMain uppercase tracking-wide">Upload Resume (PDF/DOC)</label>
                    <div className="relative overflow-hidden group rounded-xl">
                        <input type="file" accept=".pdf,.doc,.docx" {...register("resume", { required: "Resume is required" })}
                            className="w-full text-sm text-textMain bg-background border-2 border-borderLight rounded-xl py-3 px-4 file:mr-4 file:py-2 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-extrabold file:bg-primary file:text-white hover:file:bg-primaryHover transition-all cursor-pointer group-hover:border-primary" />
                    </div>
                    {errors.resume && <span className="text-xs text-red-600 mt-1 font-bold">{errors.resume.message}</span>}
                </div>

                <Button type="submit" isLoading={isSubmitting} className="mt-10">
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </Button>
            </form>
        </div>
    );
};