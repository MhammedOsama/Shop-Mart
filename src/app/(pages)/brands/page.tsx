import { Category } from "@/interfaces";
import GridItems from "@/components/GridItems/GridItems";
import { GetAllBrands } from "./_action/GetAllBrands";

export default async function Brands() {
  const brands: Category[] = await GetAllBrands();
  console.log(brands);

  return <GridItems items={brands} type='brands' />;
}
