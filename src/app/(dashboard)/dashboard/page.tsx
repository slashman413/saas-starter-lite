import { prisma } from "@/lib/prisma";
import { requireMembership } from "@/lib/tenant";

export default async function DashboardPage() {
  const { organizationId } = await requireMembership();

  const [projects, members] = await Promise.all([
    prisma.project.count({ where: { organizationId } }),
    prisma.membership.count({ where: { organizationId } }),
  ]);

  const stats = [
    { label: "Projects", value: projects },
    { label: "Members", value: members },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="mt-1 text-3xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="font-bold text-gray-800">Getting started</h2>
        <ul className="mt-3 space-y-2 text-sm text-gray-600">
          <li>Create a project using the Projects tab.</li>
          <li>Invite team members via the Members tab.</li>
          <li>Swap the &quot;Project&quot; model for your real business entity.</li>
        </ul>
        <p className="mt-4 text-sm">
          Want billing, API keys, and audit logs?{" "}
          <a
            href="https://slashmaster6.gumroad.com/l/kuvajr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 hover:underline"
          >
            Upgrade to the full version
          </a>
          .
        </p>
      </div>
    </div>
  );
}
