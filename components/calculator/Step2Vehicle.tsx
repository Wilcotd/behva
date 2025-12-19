"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormData,
  vehicleTypes,
  registrationStatuses,
  plateTypes,
  plateFormats,
} from "@/lib/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";

interface StepProps {
  form: UseFormReturn<FormData>;
}

export function Step2Vehicle({ form }: StepProps) {
  const { t } = useTranslation();
  const registrationStatus = form.watch("registrationStatus");

  const isRegisteredOrPending =
    registrationStatus !== "storage";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.vehicleType.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t.fields.vehicleType.placeholder}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t.options.vehicleTypes[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="registrationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t.fields.registrationStatus.label}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        t.fields.registrationStatus.placeholder
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {registrationStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {t.options.registrationStatuses[status]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {isRegisteredOrPending && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg animate-in fade-in slide-in-from-top-2">
          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t.fields.registrationNumber.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      t.fields.registrationNumber.placeholder
                    }
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plateType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.fields.plateType.label}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t.fields.plateType.placeholder}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {plateTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {t.options.plateTypes[type]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plateFormat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.plateFormat.label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t.fields.plateFormat.placeholder}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plateFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {t.options.plateFormats[format]}
                    </SelectItem>
                  ))}
                </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.brand.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.fields.brand.placeholder}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.model.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t.fields.model.placeholder}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="chassisNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t.fields.chassisNumber.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={t.fields.chassisNumber.placeholder}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstRegistrationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                {t.fields.firstRegistrationDate.label}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-input hover:bg-input border-input",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>JJ/MM/AAAA</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="powerKw"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.powerKw.label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t.fields.powerKw.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
