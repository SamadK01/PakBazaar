'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type DbStatus = {
  configured: boolean;
  hasUrl: boolean;
  hasKey: boolean;
  canConnect: boolean;
  error?: string | null;
};

const SQL = `create table if not exists products (
  id text primary key,
  slug text unique not null,
  name text not null,
  category text not null,
  price numeric not null,
  originalPrice numeric,
  description text not null,
  image text not null,
  stock bigint not null,
  featured boolean default false
);
create index if not exists products_category_idx on products(category);`;

export default function DbSetupPage() {
  const [status, setStatus] = useState<DbStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/db/status', { cache: 'no-store' })
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  const copySql = async () => {
    await navigator.clipboard.writeText(SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Database Setup</h1>

      <div className="p-4 border rounded-md bg-card space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          {!status ? (
            <span className="text-muted-foreground">Checking…</span>
          ) : status.canConnect ? (
            <span className="text-emerald-700">Connected</span>
          ) : (
            <span className="text-amber-700">Not Connected</span>
          )}
        </div>
        {status && !status.canConnect && (
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {!status.hasUrl && <li>SUPABASE_URL not set in Vercel envs</li>}
            {!status.hasKey && <li>SUPABASE_SERVICE_ROLE_KEY not set in Vercel envs</li>}
            {status.error && <li>Error: {status.error}</li>}
          </ul>
        )}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Steps</h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm">
          <li>Create table in Supabase using the SQL below.</li>
          <li>Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel project envs.</li>
          <li>Redeploy the project and return to this page.</li>
        </ol>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">SQL for products table</h3>
          <Button size="sm" onClick={copySql}>{copied ? 'Copied' : 'Copy SQL'}</Button>
        </div>
        <pre className="p-4 bg-muted rounded-md overflow-x-auto text-xs leading-relaxed">
{SQL}
        </pre>
      </div>

      <div className="flex gap-3">
        <Link href="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
        <Button onClick={() => window.location.reload()}>Re-check Status</Button>
      </div>
    </div>
  );
}

