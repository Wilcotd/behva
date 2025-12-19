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
                defaultValue={field.value}
                className="flex flex-col sm:flex-row gap-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="not_member" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
                    {t.fields.userStatus.options.not_member}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="member" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
                    {t.fields.userStatus.options.member}
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {userStatus === "member" && (
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
                defaultValue={field.value}
                className="flex flex-col sm:flex-row gap-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="new" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
                    {t.fields.contractType.options.new}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="change" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
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
