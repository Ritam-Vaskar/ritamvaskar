import ExperienceForm from "../../../../components/admin/ExperienceForm";
import connectDB from "../../../../../utils/mongodb";
import Experience from "../../../../../models/Experience";
import { notFound } from "next/navigation";

export default async function EditExperiencePage({ params }) {
  const { id } = await params;
  await connectDB();
  
  const experience = await Experience.findById(id).lean();
  if (!experience) return notFound();

  // Convert MongoDB ObjectId to string
  const serialized = JSON.parse(JSON.stringify(experience));

  return (
    <main className="min-h-screen pt-[60px] pb-12">
      <ExperienceForm initialData={serialized} />
    </main>
  );
}
