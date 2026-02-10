"use client";

import { UseFormReturn } from "react-hook-form";
import { FormData, PremiumBreakdown } from "@/lib/types";
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
  
  let premium: PremiumBreakdown = { annual: 0, monthly: 0, breakdown: [], notes: [], details: { rc: {}, omnium: {}, legalProtection: {} } };
  try {
    premium = calculatePremium(values);
  } catch (error) {
    console.error("Pricing calculation error:", error);
  }

  const resolveLabel = (path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return path.split('.').reduce((prev: any, curr) => prev ? prev[curr] : null, t) || path;
  };

  const hasValidEstimate = premium.annual > 0;

  return (
    <Card className="w-full py-0 overflow-hidden gap-0">
      <div className="bg-primary text-primary-foreground p-6 space-y-4">
        <h3 className="font-heading font-bold text-xl">{t.summary.title}</h3>
        {hasValidEstimate ? (
          <div className="space-y-1">
            <div className="text-sm font-medium opacity-90">{t.summary.annualPremium}</div>
            <div className="text-4xl font-bold">{premium.annual.toFixed(2)} €</div>
            {premium.monthly && (
              <div className="text-sm opacity-90">
                {t.summary.monthlyPremium}: {premium.monthly.toFixed(2)} €
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm opacity-90">
            {t.summary.calculating}
          </div>
        )}
      </div>

      {hasValidEstimate && (
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

          {premium.details && (
            <div className="space-y-2 pt-4">
              <div className="text-xs font-heading font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                {t.summary.calculationDetails}
              </div>
              <div className="space-y-3 text-xs text-muted-foreground">
                {premium.details.rc && premium.details.rc.base && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="font-semibold text-foreground mb-1">{t.coverages.rc.label}</div>
                    <div>{t.summary.details.category}: {premium.details.rc.category}</div>
                    <div>{t.summary.details.vehicleAge}: {premium.details.rc.vehicleAge} {t.summary.details.years}</div>
                    <div>{t.summary.details.ageGroup}: {premium.details.rc.ageGroup}</div>
                    <div>{t.summary.details.rank}: {premium.details.rc.rank === '1' ? t.summary.details.firstVehicle : t.summary.details.additionalVehicle}</div>
                    {premium.details.rc.power && <div>{t.summary.details.power}: {premium.details.rc.power} kW</div>}
                    <div className="font-medium mt-1">{t.summary.details.rule}: <span className="text-foreground">{premium.details.rc.rule}</span></div>
                    {premium.details.rc.condition && <div className="font-medium">{t.summary.details.condition}: <span className="text-foreground">{premium.details.rc.condition}</span></div>}
                  </div>
                )}
                {premium.details.omnium && premium.details.omnium.base && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="font-semibold text-foreground mb-1">{t.coverages.omnium.label}</div>
                    <div>{t.summary.details.vehicleValue}: {premium.details.omnium.vehicleValue} €</div>
                    <div>{t.summary.details.omniumType}: {premium.details.omnium.omniumType}</div>
                    <div className="font-medium mt-1">{t.summary.details.rule}: <span className="text-foreground">{resolveLabel(premium.details.omnium.rule)}</span></div>
                    {premium.details.omnium.percentage && <div className="font-medium">{t.summary.details.percentage}: <span className="text-foreground">{premium.details.omnium.percentage}%</span></div>}
                    {premium.details.omnium.minPremiumApplied && <div className="font-medium text-amber-600">{resolveLabel('summary.details.minPremiumApplied')}</div>}
                  </div>
                )}
                {premium.details.legalProtection && premium.details.legalProtection.base && (
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="font-semibold text-foreground mb-1">{t.coverages.legalProtection.label}</div>
                    {premium.details.legalProtection.rule && <div className="font-medium mt-1">{t.summary.details.rule}: <span className="text-foreground">{resolveLabel(premium.details.legalProtection.rule)}</span></div>}
                  </div>
                )}
              </div>
            </div>
          )}

          {premium.notes && premium.notes.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="text-xs font-heading font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                {t.summary.notes.title}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                {premium.notes.map((note, index) => (
                  <div key={index}>{resolveLabel(note)}</div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 text-xs text-muted-foreground italic text-center">
            {t.summary.disclaimer}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
