import { Category } from "@/interfaces/category";

export async function GetAllCategories(): Promise<Category[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`
  );
  const { data }: { data: Category[] } = await response.json();

  if (!response.ok) {
    throw Error("Can't fetch the data");
  }
  console.log(data);
  return data;
}
