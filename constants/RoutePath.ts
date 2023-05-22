export const routePath = {
  root: () => '/' as const,
  transfer: () => '/transfer' as const,
  history: () => '/history' as const,
}

export type RoutePath<Path extends keyof typeof routePath> = ReturnType<
  (typeof routePath)[Path]
>
