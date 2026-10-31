-- Ensure a deactivated profile cannot be exposed by a second permissive SELECT policy.
-- PostgreSQL combines permissive policies with OR, so the former public-read-all
-- policy made the original deactivation filter ineffective.
drop policy if exists "Enable read access for all users" on public.profiles;
drop policy if exists "Hide deactivated profiles from public" on public.profiles;

create policy "Read active profiles or own deactivated profile"
on public.profiles
for select
to public
using (
  deactivated_at is null
  or id = (select auth.uid())
);
