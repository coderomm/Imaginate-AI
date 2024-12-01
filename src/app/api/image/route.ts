import prisma from "@/db";
import { NEXT_AUTH_CONFIG } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const loginRequired = process.env.LOGIN_REQUIRED === "true";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
    let session = null;
    let user = null;

    if (loginRequired) {
        session = await getServerSession(NEXT_AUTH_CONFIG);
        if (!session) {
            return NextResponse.json({
                error: 'You are not logged in',
            }, { status: 401 })
        }

        user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 401 });
        }
    }

    const { prompt }: { prompt: string } = await req.json();
    if (!prompt || prompt.length < 5) {
        return NextResponse.json(
            { error: "Invalid prompt. It must be at least 5 characters long." },
            { status: 400 }
        );
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100000) + 1;
    }

    const randomSeed = generateRandomNumber();

    const imageUrl = `${process.env.IMAGE_AI_API}/${encodeURIComponent(
        prompt
    )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

    try {
        const fetchResponse = await fetch(imageUrl);
        if (!fetchResponse.ok) {
            throw new Error("Failed to generate image.");
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch image. Please try again later." },
            { status: 500 }
        );
    }

    if (loginRequired && user) {
        await prisma.post.create({
            data: {
                prompt: prompt,
                url: imageUrl,
                seed: randomSeed,
                userId: user.id,
            },
        });
    }

    return NextResponse.json({ url: imageUrl })
}

export async function GET() {
    if (loginRequired) {
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        if (!session) {
            return NextResponse.json(
                { error: "You are Unauthorized" },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "No user found" }, { status: 401 });
        }

        const posts = await prisma.post.findMany({
            where: {
                userId: user.id,
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(posts);
    }
}