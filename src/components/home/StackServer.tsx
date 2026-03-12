import { getPublicSkillsByCategory } from "@/dal/tech.dal";
import StackArchitecture from "./StackArchitecture";

export default async function StackServer() {
  const categories = await getPublicSkillsByCategory();
    console.log("Categories")
  return <StackArchitecture data={categories} />;
}
