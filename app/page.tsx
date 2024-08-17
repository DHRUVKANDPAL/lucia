import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/authenticate');
  return (
    <Button>Hello world</Button>
  );
}
