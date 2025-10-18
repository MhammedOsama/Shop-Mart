import { GetAllCategories } from "./_action/GetAllCategories";
import { Category } from "@/interfaces";
import GridItems from "@/components/GridItems/GridItems";

export default async function Categories() {
  const categories: Category[] = await GetAllCategories();
  console.log(categories);

  return <GridItems items={categories} type='categories' />;
}
