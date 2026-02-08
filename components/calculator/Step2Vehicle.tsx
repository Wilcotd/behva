"use client";

import { useState, useEffect } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";

interface StepProps {
  form: UseFormReturn<FormData>;
}

interface DatePickerInputProps {
  value?: Date;
  onChange: (date?: Date) => void;
  placeholder?: string;
}

function DatePickerInput({ value, onChange, placeholder }: DatePickerInputProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) {
      setInputValue(format(value, "dd/MM/yyyy"));
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Simple masking: Allow digits and slashes, but we'll reformat
    const digits = val.replace(/\D/g, "").slice(0, 8);
    
    if (val.length < inputValue.length) {
      // User is deleting, just update state directly but keep valid chars
      // Or better: allow natural deletion, but maybe enforce format if they type again
      // We'll just let them delete.
      setInputValue(val);
    } else {
      // User is typing
      let formatted = digits;
      if (digits.length >= 3) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      }
      if (digits.length >= 5) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
      }
      setInputValue(formatted);
      val = formatted;
    }

    if (val === "") {
      onChange(undefined);
      return;
    }

    if (val.length === 10) {
      const parsed = parse(val, "dd/MM/yyyy", new Date());
      if (isValid(parsed)) {
        if (parsed.getFullYear() > 1900 && parsed <= new Date()) {
          onChange(parsed);
        }
      }
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder || "DD/MM/YYYY"}
        className="flex-1"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "px-3",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function Step2Vehicle({ form }: StepProps) {
  const { t } = useTranslation();
  const registrationStatus = form.watch("registrationStatus");

  const isRegisteredOrPending =
    registrationStatus !== "storage";

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="vehicleRank"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              {t.fields.vehicleRank.label}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={t.fields.vehicleRank.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1">{t.options.vehicleRanks["1"]}</SelectItem>
                <SelectItem value="2">{t.options.vehicleRanks["2"]}</SelectItem>
                <SelectItem value="3+">{t.options.vehicleRanks["3+"]}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.vehicleType.label}</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
              <Select onValueChange={field.onChange} value={field.value}>
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
                  value={field.value}
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
              <Select onValueChange={field.onChange} value={field.value}>
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
              <FormControl>
                <DatePickerInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t.fields.firstRegistrationDate.placeholder}
                />
              </FormControl>
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

        <FormField
          control={form.control}
          name="vehicleValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.fields.vehicleValue.label}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={t.fields.vehicleValue.placeholder}
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
