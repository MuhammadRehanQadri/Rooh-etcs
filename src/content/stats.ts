export type Stat = {
  key: string;
  valueKey: string;
  labelKey: string;
  suffix?: string;
};

export const heroStats: Stat[] = [
  { key: "projects", valueKey: "stats.projectsValue", labelKey: "stats.projectsLabel", suffix: "+" },
  { key: "years", valueKey: "stats.yearsValue", labelKey: "stats.yearsLabel", suffix: "+" },
  { key: "clients", valueKey: "stats.clientsValue", labelKey: "stats.clientsLabel", suffix: "+" },
  { key: "workforce", valueKey: "stats.workforceValue", labelKey: "stats.workforceLabel", suffix: "+" },
];
