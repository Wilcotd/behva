"use client";

import { LanguageProvider, useTranslation } from "@/components/LanguageProvider";
import { Calculator } from "@/components/calculator/Calculator";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Content() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  return (
    <main className="font-body py-8">
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <LanguageSwitcher />
        </div>
        <Calculator searchParams={params} />
      </div>
    </main>
  );
}

export function ClientPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LanguageProvider>
        <Content />
      </LanguageProvider>
    </Suspense>
  );
}
