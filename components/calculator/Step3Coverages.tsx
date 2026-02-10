"use client";

import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from "@/components/LanguageProvider";

interface StepProps {
  form: UseFormReturn<FormData>;
}

export function Step3Coverages({ form }: StepProps) {
  const { t } = useTranslation();
  const vehicleType = form.watch("vehicleType");
  const registrationStatus = form.watch("registrationStatus");
  const omniumSelected = form.watch("coverages.omnium");

  const isAssistanceDisabled =
    vehicleType === "moped" || vehicleType === "tractor";

  const showOmniumWarning =
    registrationStatus === "storage" && omniumSelected;

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) return;
    const target = e.target as HTMLElement;
    if (target.closest('button[role="checkbox"]') || target.closest('label')) return;
    
    e.currentTarget.querySelector<HTMLButtonElement>('button[role="checkbox"]')?.click();
  };

  return (
    <div className="space-y-6">
      {showOmniumWarning && (
        <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200 text-yellow-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">{t.warnings.omnium}</p>
            <p>{t.warnings.omniumDesc}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* RC Simple - Always checked and disabled (required) */}
        <FormField
          control={form.control}
          name="coverages.rc"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  disabled
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.rc.label}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    (Inclus)
                  </span>
                </FormLabel>
                <FormDescription>
                  {t.coverages.rc.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Omnium */}
        <FormField
          control={form.control}
          name="coverages.omnium"
          render={({ field }) => (
            <FormItem
              className="flex flex-col space-y-4 rounded-md border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t.coverages.omnium.label}
                  </FormLabel>
                  <FormDescription>
                    {t.coverages.omnium.description}
                  </FormDescription>
                </div>
              </div>
              {omniumSelected && (
                <div className="pl-6 pt-2">
                  <FormField
                    control={form.control}
                    name="coverages.omniumType"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="full" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t.coverages.omniumType.full}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mini" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {t.coverages.omniumType.mini}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    )}
                  />
                </div>
              )}
            </FormItem>
          )}
        />

        {/* Assistance */}
        <FormField
          control={form.control}
          name="coverages.assistance"
          render={({ field }) => (
            <FormItem
              className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                isAssistanceDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
              // onClick={handleCardClick}
            >
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  disabled={isAssistanceDisabled}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.assistance.label}
                </FormLabel>
                <FormDescription>
                  {isAssistanceDisabled
                    ? "Non disponible pour ce type de véhicule"
                    : t.coverages.assistance.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Assistance Plus */}
        <FormField
          control={form.control}
          name="coverages.assistancePlus"
          render={({ field }) => (
            <FormItem
              className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                isAssistanceDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  disabled={isAssistanceDisabled}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.assistancePlus.label}
                </FormLabel>
                <FormDescription>
                  {isAssistanceDisabled
                    ? "Non disponible pour ce type de véhicule"
                    : t.coverages.assistancePlus.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Legal Protection */}
        <FormField
          control={form.control}
          name="coverages.legalProtection"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              // onClick={handleCardClick}
            >
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.legalProtection.label}
                </FormLabel>
                <FormDescription>
                  {t.coverages.legalProtection.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Driver Protection */}
        <FormField
          control={form.control}
          name="coverages.driverProtection"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
              // onClick={handleCardClick}
            >
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.driverProtection.label}
                </FormLabel>
                <FormDescription>
                  {t.coverages.driverProtection.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Fire / Theft Resting */}
        <FormField
          control={form.control}
          name="coverages.fireTheftResting"
          render={({ field }) => (
            <FormItem
              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <FormControl>
                <Checkbox
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {t.coverages.fireTheftResting.label}
                </FormLabel>
                <FormDescription>
                  {t.coverages.fireTheftResting.description}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
