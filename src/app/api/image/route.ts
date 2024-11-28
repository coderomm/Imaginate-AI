import prisma from "@/db";
import { NEXT_AUTH_CONFIG } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH_CONFIG);
    if (!session) {
        return NextResponse.json({
            error: 'You are not logged in',
        }, { status: 401 })
    }

    const { prompt }: { prompt: string } = await req.json();

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return NextResponse.json({ error: "No user found" }, { status: 401 });
    }

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100000) + 1;
    }

    const randomSeed = generateRandomNumber();

    const imageUrl = `${process.env.IMAGE_AI_API}/${encodeURIComponent(
        prompt
    )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

    await fetch(imageUrl);

    await prisma.post.create({
        data: {
            prompt: prompt,
            url: imageUrl,
            seed: randomSeed,
            userId: user.id,
        },
    });

    return NextResponse.json({ url: imageUrl })
}

export async function GET() {
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