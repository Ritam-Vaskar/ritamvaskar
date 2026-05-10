import ProjectForm from "../../../../components/admin/ProjectForm";
import connectDB from "../../../../../utils/mongodb";
import Project from "../../../../../models/Project";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  await connectDB();

  const project = await Project.findById(id).lean();
  if (!project) return notFound();

  const serialized = JSON.parse(JSON.stringify(project));

  return (
    <main className="min-h-screen pt-[60px] pb-12">
      <ProjectForm initialData={serialized} />
    </main>
  );
}
