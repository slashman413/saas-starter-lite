import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { route, created, err } from "@/lib/api";
import { Role } from "@prisma/client";

const schema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  orgName: z.string().min(1).max(80),
});

function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "org"
  );
}

// POST /api/register — create user + their first organization (as OWNER).
export const POST = route(async (req) => {
  const body = schema.parse(await req.json());

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) return err("Email already registered", 409);

  const passwordHash = await bcrypt.hash(body.password, 12);

  // Ensure a unique slug.
  const base = slugify(body.orgName);
  let slug = base;
  for (let i = 1; await prisma.organization.findUnique({ where: { slug } }); i++) {
    slug = `${base}-${i}`;
  }

  const org = await prisma.organization.create({
    data: {
      name: body.orgName,
      slug,
      memberships: {
        create: {
          role: Role.OWNER,
          user: {
            create: { name: body.name, email: body.email, passwordHash },
          },
        },
      },
    },
    include: {
      memberships: { include: { user: true } },
    },
  });

  const user = org.memberships[0].user;
  return created({ userId: user.id, organization: { id: org.id, slug: org.slug } });
});
