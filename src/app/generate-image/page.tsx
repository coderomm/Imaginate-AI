"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Download, LoaderCircle, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { Spotlight } from "@/components/ui/spotlight";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import UserGenImages from "@/components/UserGenImages";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useClearSessionIfLoginNotRequired } from "@/utils/clearSession";
import { decryptURL } from "@/utils/encryption";

enum btnType { 'submit', 'button' }

const formSchema = z.object({
    prompt: z
        .string()
        .min(5, { message: "Too short prompt. Must be atleast 5 characters long!" }),
});

export default function Page() {
    const [refreshKey, setRefreshKey] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [outputImg, setOutputImg] = useState<string | null>(null);
    const { data: session } = useSession();

    const { toast } = useToast();
    const loginRequired = process.env.NEXT_PUBLIC_LOGIN_REQUIRED === "true";

    useClearSessionIfLoginNotRequired();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (loginRequired && !session) {
            toast({ variant: "destructive", description: "Login required to generate an image." });
            return;
        }
        try {
            setLoading(true);
            const response = await fetch("/api/image", {
                method: "POST",
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (response.status === 200) {
                if (loginRequired) {
                    setRefreshKey(prev => prev + 1);
                } else {
                    const decryptedURL = decryptURL(data.url);
                    setOutputImg(decryptedURL);
                }
            } else {
                toast({ variant: "destructive", description: data.error });
            }
        } catch (error) {
            toast({ variant: "destructive", description: "An error occurred while generating the image." });
            console.error(error);
        } finally {
            setLoading(false);
        }
    } const downloadImage = async (imageUrl: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'generated-image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    return (
        <>
            <section className="__generateImage min-h-dvh px-4 py-6 md:px-24 md:py-10 w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 custom-text-color w-full p-3">
                    Imaginate & Generate.
                </h1>
                <div className="flex items-center justify-center w-full max-w-6xl h-auto py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-center items-center w-full
                            md:w-[80%] flex-col md:flex-row gap-3">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="w-full max-w-full">
                                        <FormLabel className="text-white/85">Type you prompt below to generate any image you can imagine!</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type a prompt ..."
                                                maxLength={1500}
                                                role="group"
                                                id="prompt-input"
                                                disabled={loading}
                                                className="disabled:pointer-events-none resize-none w-full transition-all text-white/90 border-white h-auto bg-white/5 shadow-lg shadow-neutral-600/5 backdrop-blur-lg hover:backdrop-blur-0"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <HoverBorderGradient
                                containerClassName="rounded-full"
                                as="button"
                                buttonType={btnType.submit}
                                btnDisabled={!form.formState.isValid || loading}
                                className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
                                 bg-black text-white flex items-center space-x-2 w-full md:w-auto">
                                <span className="flex justify-center items-center gap-2 w-auto">
                                    Generate <Plus />
                                </span>
                            </HoverBorderGradient>
                        </form>
                    </Form>
                </div>

                <>
                    {loading && (
                        <div className="flex items-center justify-center gap-2 w-full max-w-6xl md:w-[80%] py-1 h-[30px]
                     bg-white/5 animate-pulse rounded-lg p-1 image-loading-bg cursor-not-allowed">
                            Generating ... <LoaderCircle className="animate-spin" />
                        </div>
                    )}
                    {loginRequired && session && (
                        <div className="w-full max-w-6xl py-5 md:py-10">
                            <UserGenImages key={refreshKey} />
                        </div>
                    )}
                    {!loginRequired && (
                        <div className="w-full md:max-w-6xl py-5 md:py-10 flex items-center justify-center flex-col gap-3">
                            <AnimatePresence mode="wait">
                                {!loginRequired && (
                                    <>
                                        <motion.div
                                            className={`bg-white/5 rounded-lg p-1 w-full md:w-[500px] h-full md:h-[500px] relative ${outputImg ? '' : 'animate-pulse'}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {outputImg ? (
                                                <Image
                                                    src={outputImg || ''}
                                                    alt={'image'}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    style={{ width: '100%', height: 'auto' }}
                                                    className="!w-full !h-auto object-cover rounded-t-lg md:rounded-lg shadow-lg cursor-pointer"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex flex-col justify-center items-center gap-3 text-white/70 text-center p-3">
                                                    Enter your prompt and hit generate! <Plus />
                                                </div>
                                            )}
                                        </motion.div>
                                        {outputImg && (
                                            <button
                                                onClick={() => downloadImage(outputImg || '')}
                                                className="p-2 bg-white/5 rounded-full hover:bg-white/60 transition-colors text-white/90 flex items-center justify-center gap-1 text-base py-2 px-5"
                                                title="Download image"
                                            >
                                                Download <Download className="w-5 h-5" />
                                            </button>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </>
            </section >
        </>
    );
}