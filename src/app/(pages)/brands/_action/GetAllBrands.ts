import { Category } from "@/interfaces/category";

export async function GetAllBrands(): Promise<Category[]> {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  const { data }: { data: Category[] } = await response.json();

  if (!response.ok) {
    throw Error("Can't fetch the data");
  }
  console.log(data);
  return data;
}
