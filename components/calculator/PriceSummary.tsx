"use client";

import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { calculatePremium } from "@/lib/pricing";
import { useTranslation } from "@/components/LanguageProvider";

interface PriceSummaryProps {
  form: UseFormReturn<FormData>;
}

export function PriceSummary({ form }: PriceSummaryProps) {
  const { t } = useTranslation();
  // Watch all fields to update price in real-time
  const values = form.watch();
  const premium = calculatePremium(values);

  const resolveLabel = (path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split('.').reduce((prev: any, curr) => prev ? prev[curr] : null, t) || path;
  };

  return (
    <Card className="w-full py-0 overflow-hidden gap-0">
      <div className="bg-primary text-primary-foreground p-6 space-y-4">
        <h3 className="font-heading font-bold text-xl">{t.summary.title}</h3>
        <div className="space-y-1">
          <div className="text-sm font-medium opacity-90">{t.summary.annualPremium}</div>
          <div className="text-4xl font-bold">{premium.annual.toFixed(2)} €</div>
          {premium.monthly && (
            <div className="text-sm opacity-90">
              {t.summary.monthlyPremium}: {premium.monthly.toFixed(2)} €
            </div>
          )}
        </div>
      </div>

      <CardContent className="py-6 space-y-4">
        <div className="space-y-2">
          <div className="text-xs font-heading font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
            {t.summary.breakdown}
          </div>
          <div className="space-y-1">
            {premium.breakdown.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{resolveLabel(item.label)}</span>
                <span className={item.amount < 0 ? "text-green-600" : ""}>
                  {item.amount > 0 ? "+" : ""}
                  {item.amount.toFixed(2)} €
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 text-xs text-muted-foreground italic text-center">
          {t.summary.disclaimer}
        </div>
      </CardContent>
    </Card>
  );
}
