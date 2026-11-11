import type { Parsed } from "./parse.js";
import type { SearchResponse, TenderSummary } from "./schemas.js";

export type NormalizedTender = {
  notificationNumber?: string;
  title: string;
  investorName?: string;
  publicDate?: string;
  closingDate?: string;
  locations: Array<{
    provinceCode?: string;
    provinceName?: string;
    districtCode?: string;
    districtName?: string;
  }>;
  source: TenderSummary;
};

export function normalizeTender(tender: TenderSummary): NormalizedTender {
  return {
    notificationNumber: tender.notifyNoStand ?? tender.notifyNo,
    title: (tender.bidName ?? []).join(" ").trim(),
    investorName: tender.investorName,
    publicDate: tender.publicDate,
    closingDate: tender.bidCloseDate,
    locations: (tender.locations ?? []).map((location) => ({
      provinceCode: location.provCode,
      provinceName: location.provName,
      districtCode: location.districtCode,
      districtName: location.districtName
    })),
    source: tender
  };
}

export function normalizeSearchResult(parsed: Parsed<SearchResponse>): {
  items: NormalizedTender[];
  unexpectedFields: string[];
} {
  return {
    items: parsed.data.page.content.map(normalizeTender),
    unexpectedFields: parsed.unexpectedFields
  };
}
