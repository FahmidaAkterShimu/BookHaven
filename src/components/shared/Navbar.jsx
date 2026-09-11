'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Library, LogIn, LogOut } from 'lucide-react';

import { useRouter } from 'next/navigation';
import ThemeToggler from '@/lib/ThemeToggler';
import { authClient } from '@/lib/auth-client';

import { Avatar } from '@heroui/react';
import { toast } from 'sonner';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('Logged out successfully 👋');
                    router.push('/');
                    router.refresh();
                },
            },
        });
    };

    const isActive = (path) => pathname === path;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Books', href: '/books' },
        { name: 'My Profile', href: '/profile' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur border-b border-border supports-backdrop-filter:bg-card/80">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex justify-between items-center h-16">

                    {/* LOGO */}
                    <div className="shrink-0">
                        <Link href="/" className="font-serif text-lg font-bold flex items-center gap-2">
                            <Library className='w-7 h-7 text-primary' />
                            BookHaven
                        </Link>
                    </div>

                    {/* DESKTOP NAVIGATION*/}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive(link.href) || (link.name === 'Home' && pathname === '/')
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-[#FFB900]/10'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>


                    {/* DESKTOP RIGHT SIDE */}
                    <div className="hidden md:flex items-center gap-3">

                        {/* Theme Toggle */}
                        <ThemeToggler />

                        {/* Loading skeleton */}
                        {isPending && (
                            <div className='h-10 w-24 animate-pulse rounded-2xl bg-primary/10' />
                        )}


                        {/* ── DESKTOP: Logged In ── */}
                        {!isPending && user && (
                            <div className='flex items-center gap-3'>
                                {/* User Info */}
                                <div className='flex items-center gap-2 hover:bg-[#FFB900]/10 rounded-lg px-3 py-2 transition-colors'>
                                    {/* Avatar */}
                                    <Link href="/profile" className='flex items-center justify-center'>
                                        <Avatar
                                            src={user?.image || undefined}
                                            size="sm"
                                            color="success"
                                            className="w-8 h-8 rounded-full border border-border cursor-pointer ring-2 ring-primary transition-transform hover:scale-105"
                                        >
                                            <Avatar.Fallback>
                                                {(user?.name || 'User')
                                                    .split(' ')
                                                    .map((word) => word[0])
                                                    .join('')
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </Avatar.Fallback>
                                        </Avatar>
                                    </Link>

                                    <span className='text-sm font-semibold text-foreground'>
                                        {user.name}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex justify-center items-center gap-1.5 bg-primary hover:bg-[#FFB900]/10 text-primary-foreground
                                    hover:text-foreground px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        )}

                        {!isPending && !user && (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-all"
                            >
                                <LogIn className="w-5 h-5" />
                                Login
                            </Link>
                        )}

                    </div>


                    {/* MOBILE RIGHT SIDE */}
                    <div className="md:hidden flex items-center gap-2">

                        {!isPending && user && (
                            <Link href="/profile">
                                <Avatar
                                    src={user?.image || undefined}
                                    size="sm"
                                    color="success"
                                    className="w-8 h-8 rounded-full border border-border cursor-pointer ring-2 ring-primary transition-transform hover:scale-105"
                                >
                                    <Avatar.Fallback>
                                        {(user?.name || 'User')
                                            .split(' ')
                                            .map((word) => word[0])
                                            .join('')
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>
                            </Link>
                        )}

                        {/* MOBILE HAMBURGER Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:bg-gray-100 focus:outline-none transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                    </div>
                </div>
            </div>


            {/* MOBILE MENU-DROPDOWN */}
            <div
                className={`absolute top-20 left-0 w-full bg-background shadow-md md:hidden transition-all duration-200 ease-in-out rounded-lg ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                    }`}
                id="mobile-menu"
            >
                <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
                    <div className="flex justify-center py-2">
                        <ThemeToggler />
                    </div>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`w-full px-4 py-3 text-base font-medium rounded-md transition-colors ${isActive(link.href) || (link.name === 'Home' && pathname === '/')
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-[#FFB900]/10'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}


                    {/* MOBILE LOGIN/LOGOUT Button */}
                    {!user ? (
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex justify-center items-center gap-2 w-full mt-2 bg-primary hover:bg-[#244B29] text-primary-foreground text-center py-3.5 rounded-md text-base font-semibold transition-colors shadow-sm"
                        >
                            <LogIn className="w-5 h-5" />
                            Login
                        </Link>
                    ) : (
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                handleLogout();
                            }}
                            className="flex justify-center items-center gap-2 w-full mt-2 bg-primary hover:bg-[#244B29] text-primary-foreground text-center py-3.5 rounded-md text-base font-semibold transition-colors shadow-sm cursor-pointer"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}