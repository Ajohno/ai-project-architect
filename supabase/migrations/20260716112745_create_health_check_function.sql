create or replace function public.health_check()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object('ok', true, 'database', 'connected');
$$;

revoke all on function public.health_check() from public;
grant execute on function public.health_check() to anon, authenticated;

comment on function public.health_check() is
  'Returns a non-sensitive database connectivity status for application health checks.';
