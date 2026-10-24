'use client'

import { Switch } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => { }

const ThemeToggler = () => {
    const { resolvedTheme, setTheme } = useTheme()

    // server/hydration-e false, client-e true
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    )

    if (!mounted) return <div className='h-7.75 w-12.75' />

    return (
        <Switch
            isSelected={resolvedTheme === 'dark'}
            onChange={(selected) => setTheme(selected ? 'dark' : 'light')}
            aria-label='Toggle theme'
        >
            {({ isSelected }) => (
                <Switch.Content>
                    <Switch.Control
                        className={`h-7.75 w-12.75 rounded-full bg-primary dark:bg-foreground transition-all duration-300
              ${isSelected ? 'bg-primary shadow-[0_0_12px_rgba(244,63,94,0.35)]' : ''}
            `}
                    >
                        <Switch.Thumb
                            className={`size-6.75 rounded-full bg-background shadow-sm ${isSelected ? 'ms-5.5 shadow-lg' : ''}`}
                        >
                            <Switch.Icon>
                                {isSelected ? (
                                    <Sun className='size-4 text-primary' />
                                ) : (
                                    <Moon className='size-4 text-foreground' />
                                )}
                            </Switch.Icon>
                        </Switch.Thumb>
                    </Switch.Control>
                </Switch.Content>
            )}
        </Switch>
    )
}

export default ThemeToggler