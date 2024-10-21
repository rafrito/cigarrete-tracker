import NavigationLink from "./link";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";


export default function NavBar() {
    return (
            <div className="flex w-full bg-primary">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationLink page="Formulário" href="/form" />
                        <NavigationLink page="Relatório" href="/" />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
    );
}  