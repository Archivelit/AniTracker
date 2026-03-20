import Link from "next/link";
import { Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitchButton from "../ui/theme-switch-button";
 
export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    
            <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="AniTrack — go to home"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <Tv className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-bold tracking-tight text-foreground">
                    Ani
                    <span className="text-primary">Tracker</span>
                </h2>
            </Link>
    
            <nav className="flex items-center gap-2" aria-label="Authentication">
                
                <ThemeSwitchButton />

                <Button variant="ghost" size="sm" asChild className="border border-muted">
                    <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" asChild>
                    <Link href="/signup">Sign up</Link>
                </Button>
            </nav>
    
        </div>
        </header>
    );
}
 