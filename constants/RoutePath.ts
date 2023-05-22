export const routePath = {
  root: () => '/' as const,
  history: () => '/history' as const,
}

export type RoutePath<Path extends keyof typeof routePath> = ReturnType<
  (typeof routePath)[Path]
>
