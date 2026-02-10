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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { config } from "@/lib/config";
import { useTranslation } from "@/components/LanguageProvider";
import { CheckCircle } from "lucide-react";

interface StepProps {
  form: UseFormReturn<FormData>;
}

export function Step1User({ form }: StepProps) {
  const { t } = useTranslation();
  const userStatus = form.watch("userStatus");
  const clubName = form.watch("clubName");
  const contractType = form.watch("contractType");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="userStatus"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t.fields.userStatus.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col sm:flex-row gap-4"
              >
                <FormItem className="flex-1">
                  <FormControl>
                    <RadioGroupItem value="individual" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="relative font-normal font-weight-normal cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                    {t.fields.userStatus.options.individual}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex-1">
                  <FormControl>
                    <RadioGroupItem value="club_member" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="relative font-normal font-weight-normal cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                    {t.fields.userStatus.options.club_member}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex-1">
                  <FormControl>
                    <RadioGroupItem value="supporter" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="relative font-normal font-weight-normal cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                    {t.fields.userStatus.options.supporter}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {userStatus === "club_member" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-lg animate-in fade-in slide-in-from-top-2">
          <FormField
            control={form.control}
            name="clubName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.clubName.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.fields.clubName.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {config.clubs.map((club) => (
                      <SelectItem key={club} value={club}>
                        {club}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {clubName === "Autre club" && (
            <FormField
              control={form.control}
              name="otherClub"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.fields.otherClub.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t.fields.otherClub.placeholder}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="behvaRefNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.behvaRefNumber.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t.fields.behvaRefNumber.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <FormField
        control={form.control}
        name="contractType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>{t.fields.contractType.label}</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col sm:flex-row gap-4"
              >
                <FormItem className="flex-1">
                  <FormControl>
                    <RadioGroupItem value="new" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="relative font-normal font-weight-normal cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                    {t.fields.contractType.options.new}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex-1">
                  <FormControl>
                    <RadioGroupItem value="change" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="relative font-normal font-weight-normal cursor-pointer flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    <CheckCircle className="absolute top-2 right-2 h-5 w-5 text-primary opacity-0 peer-data-[state=checked]:opacity-100 transition-opacity" />
                    {t.fields.contractType.options.change}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {contractType === "change" && (
        <FormField
          control={form.control}
          name="vehicleOrContractNumber"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-top-2">
              <FormLabel>
                {t.fields.vehicleOrContractNumber.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    t.fields.vehicleOrContractNumber.placeholder
                  }
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
