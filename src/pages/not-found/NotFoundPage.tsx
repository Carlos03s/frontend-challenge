import { Link } from '@tanstack/react-router'

import { PageContent } from '@/components/layout/PageContent/PageContent'

export function NotFoundPage() {
  return (
    <PageContent className="gap-4">
      <h1 className="font-mono text-2xl text-foreground">Página não encontrada</h1>
      <p className="font-mono text-base text-secondary">O endereço informado não existe.</p>
      <Link className="font-mono text-base text-text-accent" to="/">
        Voltar ao início
      </Link>
    </PageContent>
  )
}
