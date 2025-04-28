import { useLanguage } from "@/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const languages = [
  { value: "en", label: "English" },
  { value: "ja", label: "日本語" },
  { value: "vi", label: "Tiếng Việt" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const getCurrentLanguageLabel = () => {
    return languages.find((lang) => lang.value === language)?.label || "English";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between"
        >
          {getCurrentLanguageLabel()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((lang) => (
              <CommandItem
                key={lang.value}
                value={lang.value}
                onSelect={(currentValue) => {
                  setLanguage(currentValue as "en" | "ja" | "vi");
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    language === lang.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {lang.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function MobileLanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium">Language</span>
      <div className="flex space-x-2">
        {languages.map((lang) => (
          <Button
            key={lang.value}
            variant={language === lang.value ? "default" : "outline"}
            size="sm"
            onClick={() => setLanguage(lang.value as "en" | "ja" | "vi")}
            className="px-2 py-1 text-xs"
          >
            {lang.value.toUpperCase()}
          </Button>
        ))}
      </div>
    </div>
  );
}