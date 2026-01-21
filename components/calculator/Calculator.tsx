"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, FormData, defaultValues } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Step1User } from "./Step1User";
import { Step2Vehicle } from "./Step2Vehicle";
import { Step3Coverages } from "./Step3Coverages";
import { Step4Summary } from "./Step4Summary";
import { PriceSummary } from "@/components/calculator/PriceSummary";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/components/LanguageProvider";

export function Calculator({
  prefilledData,
}: {
  prefilledData?: Record<string, string>;
}) {
  const { t } = useTranslation();
  const formSchema = useMemo(() => createFormSchema(t), [t]);
  const [currentStep, setCurrentStep] = useState(0);

  const fieldMapping: Record<string, string> = {
    "Type voertuign": "vehicleType",
    "Datum eerste ingebruikname": "firstRegistrationDate",
    "Lid van een club": "isClubMember",
    Voornaam: "firstName",
    Naam: "lastName",
    "E-mail": "email",
    Telefoonnummer: "phoneNumber",
  };

  const transformedPrefilledData = useMemo(() => {
    if (!prefilledData) return {};
    const transformed: Record<string, unknown> = {};
    for (const key in prefilledData) {
      const newKey = fieldMapping[key.replace(/\+/g, " ")] || key;
      const value = prefilledData[key];
      if (value.includes("|")) {
        const [label, val] = value.split("|");
        transformed[newKey] = { label, value: val };
      } else {
        transformed[newKey] = value;
      }
    }
    return transformed;
  }, [prefilledData]);

  const steps = [
    { id: "user", title: t.steps.user },
    { id: "vehicle", title: t.steps.vehicle },
    { id: "coverage", title: t.steps.coverage },
    { id: "summary", title: t.steps.summary },
  ];

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      ...defaultValues,
      ...transformedPrefilledData,
    },
    mode: "onChange", // Validate on change for real-time feedback
  });

  const nextStep = async () => {
    let isValid = false;
    // Trigger validation for current step fields
    if (currentStep === 0) {
      isValid = await form.trigger([
        "userStatus",
        "clubName",
        "otherClub",
        "behvaRefNumber",
        "contractType",
        "vehicleOrContractNumber",
      ]);
    } else if (currentStep === 1) {
      isValid = await form.trigger([
        "vehicleType",
        "registrationStatus",
        "registrationNumber",
        "plateType",
        "plateFormat",
        "brand",
        "model",
        "chassisNumber",
        "firstRegistrationDate",
        "powerKw",
      ]);
    } else if (currentStep === 2) {
      isValid = await form.trigger(["coverages"]);
    }

    if (isValid || currentStep === 2) { // Step 3 (coverages) might be always valid as they have defaults, but let's check.
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div id="behva-calculator" className="w-full">
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Main Form Area */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                {t.common.step} {currentStep + 1} {t.common.of} {steps.length}
              </span>
              <span className="text-sm">
                {steps[currentStep].title}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Form {...form}>
            <form className="space-y-6">
              <Card className="p-6 shadow-none">
                {currentStep === 0 && <Step1User form={form} />}
                {currentStep === 1 && <Step2Vehicle form={form} />}
                {currentStep === 2 && <Step3Coverages form={form} />}
                {currentStep === 3 && <Step4Summary form={form} />}
              </Card>

              {currentStep < 3 && (
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={cn(
                      "px-6 py-2 rounded-md text-sm font-medium transition-colors",
                      currentStep === 0
                        ? "invisible"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    {t.common.previous}
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                  >
                    {t.common.next}
                  </button>
                </div>
              )}
            </form>
          </Form>
        </div>

        {/* Sticky Price Summary */}
        <div className="lg:w-80 lg:shrink-0">
          <div className="sticky top-8">
            <PriceSummary form={form} />
          </div>
        </div>
      </div>
    </div>
  );
}
