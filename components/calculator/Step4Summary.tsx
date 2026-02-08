"use client";

import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { calculatePremium } from "@/lib/pricing";
import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import { useTranslation } from "@/components/LanguageProvider";

interface StepProps {
  form: UseFormReturn<FormData>;
}

export function Step4Summary({ form }: StepProps) {
  const { t } = useTranslation();
  const values = form.getValues();
  const premium = calculatePremium(values);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = async () => {
    const isValid = await form.trigger([
      "firstName",
      "lastName",
      "email",
      "phone",
    ]);

    if (isValid) {
      setIsSubmitting(true);
      const finalData = {
        ...form.getValues(),
        estimatedPremium: premium,
      };
      
      try {
        const response = await fetch("https://hook.eu2.make.com/6o2r6nvid3i0aw3c6aj06prepippvhu4", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        });

        if (!response.ok) {
          throw new Error("Submission failed");
        }

        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting form:", error);
        // In a real app, we would use a toast notification here
        alert(t.summary.submitError);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in zoom-in-50">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-primary">{t.summary.successTitle}</h2>
        <p className="text-muted-foreground max-w-md">
          {t.summary.successMessage.replace("{email}", form.getValues("email"))}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">
          {t.summary.title}
        </h3>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <div className="flex items-center justify-between space-x-4 px-4 py-2 bg-muted/30 rounded-md">
            <h4 className="text-sm font-semibold">
              {t.summary.vehicle}: {values.brand} {values.model}
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2 px-4 text-sm text-muted-foreground animate-in slide-in-from-top-2">
            <div className="grid grid-cols-2 gap-2">
              <span>{t.summary.vehicle}:</span>
              <span className="font-medium text-foreground">
                {t.options.vehicleTypes[values.vehicleType]}
              </span>
              <span>{t.summary.year}:</span>
              <span className="font-medium text-foreground">
                {values.firstRegistrationDate && !isNaN(values.firstRegistrationDate.getTime())
                  ? format(values.firstRegistrationDate, "yyyy")
                  : "-"}
              </span>
              <span>{t.summary.power}:</span>
              <span className="font-medium text-foreground">
                {values.powerKw} kW
              </span>
              <span>{t.summary.status}:</span>
              <span className="font-medium text-foreground">
                {values.userStatus ? t.fields.userStatus.options[values.userStatus] : "-"}
              </span>
            </div>
            <div className="pt-2">
              <span className="block mb-1">{t.summary.coveragesChosen}:</span>
              <ul className="list-disc pl-5 space-y-1">
                {values.coverages.rc && <li>{t.coverages.rc.label}</li>}
                {values.coverages.omnium && <li>{t.coverages.omnium.label}</li>}
                {values.coverages.assistance && <li>{t.coverages.assistance.label}</li>}
                {values.coverages.legalProtection && (
                  <li>{t.coverages.legalProtection.label}</li>
                )}
                {values.coverages.driverProtection && (
                  <li>{t.coverages.driverProtection.label}</li>
                )}
                {values.coverages.fireTheftResting && (
                  <li>{t.coverages.fireTheftResting.label}</li>
                )}
                {values.coverages.assistancePlus && (
                  <li>{t.coverages.assistancePlus.label}</li>
                )}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {!showContactForm ? (
        <div className="flex justify-center pt-4">
          <Button size="lg" onClick={() => setShowContactForm(true)}>
            {t.summary.cta}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-muted/30 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold">{t.summary.contactTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.firstName}</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.lastName}</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.email}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jean.dupont@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.contact.phone}</FormLabel>
                    <FormControl>
                      <Input placeholder="+32 470 00 00 00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={onSubmit} 
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? t.summary.submitting : t.summary.submit}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
