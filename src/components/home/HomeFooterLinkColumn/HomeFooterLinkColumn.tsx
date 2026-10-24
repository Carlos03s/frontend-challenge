import type { HomeFooterLinkColumn as HomeFooterLinkColumnProps } from '@/types/homeFooter'

export function HomeFooterLinkColumn({ title, links }: HomeFooterLinkColumnProps) {
  const linkElements = links.map((link) => (
    <li key={link.id}>
      <a className="font-mono text-sm font-normal leading-[30px] text-foreground" href={link.href}>
        {link.label}
      </a>
    </li>
  ))

  return (
    <nav aria-label={title} className="flex flex-1 flex-col items-start gap-2">
      <h3 className="font-mono text-lg font-bold leading-4 text-foreground">{title}</h3>
      <ul>{linkElements}</ul>
    </nav>
  )
}
