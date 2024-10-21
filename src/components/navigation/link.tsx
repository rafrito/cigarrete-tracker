import Link from "next/link"
import { NavigationMenuItem } from "@/components/ui/navigation-menu";

export default function NavigationLink({ page, href }: { page: string, href: string }) {
    return (
        <NavigationMenuItem className="w-32">
            <Link className="flex w-fill my-1 p-2 rounded-md justify-center border-borderColor hover:bg-highlightGray text-primary-foreground text-lg" href={href}>{page}</Link>
        </NavigationMenuItem>
    )
}
 