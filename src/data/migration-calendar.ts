export type MigrationMonth = {
  month: number;
  labelKey: string;
  locationKey: string;
  highlightKey: string;
  intensity: "low" | "medium" | "high" | "peak";
};

export const MIGRATION_CALENDAR: MigrationMonth[] = [
  { month: 1, labelKey: "migration.months.jan", locationKey: "migration.locations.ndutu", highlightKey: "migration.highlights.calving", intensity: "peak" },
  { month: 2, labelKey: "migration.months.feb", locationKey: "migration.locations.ndutu", highlightKey: "migration.highlights.calving", intensity: "peak" },
  { month: 3, labelKey: "migration.months.mar", locationKey: "migration.locations.ndutu", highlightKey: "migration.highlights.predators", intensity: "high" },
  { month: 4, labelKey: "migration.months.apr", locationKey: "migration.locations.west", highlightKey: "migration.highlights.rains", intensity: "medium" },
  { month: 5, labelKey: "migration.months.may", locationKey: "migration.locations.west", highlightKey: "migration.highlights.green", intensity: "medium" },
  { month: 6, labelKey: "migration.months.jun", locationKey: "migration.locations.grumeti", highlightKey: "migration.highlights.river", intensity: "high" },
  { month: 7, labelKey: "migration.months.jul", locationKey: "migration.locations.north", highlightKey: "migration.highlights.crossing", intensity: "peak" },
  { month: 8, labelKey: "migration.months.aug", locationKey: "migration.locations.mara", highlightKey: "migration.highlights.crossing", intensity: "peak" },
  { month: 9, labelKey: "migration.months.sep", locationKey: "migration.locations.mara", highlightKey: "migration.highlights.crossing", intensity: "high" },
  { month: 10, labelKey: "migration.months.oct", locationKey: "migration.locations.north", highlightKey: "migration.highlights.return", intensity: "high" },
  { month: 11, labelKey: "migration.months.nov", locationKey: "migration.locations.east", highlightKey: "migration.highlights.shortRains", intensity: "medium" },
  { month: 12, labelKey: "migration.months.dec", locationKey: "migration.locations.south", highlightKey: "migration.highlights.calving", intensity: "medium" },
];
