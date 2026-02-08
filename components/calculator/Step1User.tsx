"use client";

import { useState, useEffect } from "react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
      setInputValue(val);
    } else {
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

export function Step1User({ form }: StepProps) {
  const { t } = useTranslation();
  const userStatus = form.watch("userStatus");
  const clubName = form.watch("clubName");
  const contractType = form.watch("contractType");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.firstName}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{t.contact.lastName.label}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.contact.lastName.placeholder} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contact.birthDate.label}</FormLabel>
              <FormControl>
                <DatePickerInput
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t.contact.birthDate.placeholder}
                />
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
              <FormLabel>{t.contact.email.label}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={t.contact.email.placeholder} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

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
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="individual" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
                    {t.fields.userStatus.options.individual}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="club_member" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
                    {t.fields.userStatus.options.club_member}
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="supporter" />
                  </FormControl>
                  <FormLabel className="font-normal font-weight-normal cursor-pointer">
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
