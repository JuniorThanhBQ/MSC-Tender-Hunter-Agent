import { z } from "zod";

export const SearchFilterSchema = z.looseObject({
  fieldName: z.string(),
  searchType: z.string(),
  fieldValues: z.array(z.string())
});

export const SearchClauseSchema = z.looseObject({
  index: z.string(),
  keyWord: z.string(),
  matchType: z.string(),
  matchFields: z.array(z.string()),
  filters: z.array(SearchFilterSchema)
});

export const SearchRequestEnvelopeSchema = z.looseObject({
  pageSize: z.number().int(),
  pageNumber: z.string(),
  query: z.array(SearchClauseSchema)
});

export const SearchRequestSchema = z.array(SearchRequestEnvelopeSchema);

export const TenderLocationSchema = z.looseObject({
  provCode: z.string().optional(),
  provName: z.string().optional(),
  districtCode: z.string().optional(),
  districtName: z.string().optional(),
  parentCode: z.string().optional(),
  name: z.string().optional()
});

export const TenderSummarySchema = z.looseObject({
  id: z.string().optional(),
  notifyId: z.string().optional(),
  notifyNo: z.string().optional(),
  notifyVersion: z.string().optional(),
  notifyNoStand: z.string().optional(),
  bidName: z.array(z.string()).optional(),
  investorName: z.string().optional(),
  investorCode: z.string().optional(),
  publicDate: z.string().optional(),
  originalPublicDate: z.string().optional(),
  bidCloseDate: z.string().optional(),
  bidOpenDate: z.string().optional(),
  bidForm: z.string().optional(),
  bidMode: z.string().optional(),
  investField: z.array(z.string()).optional(),
  bidField: z.string().optional(),
  isInternet: z.number().int().optional(),
  locations: z.array(TenderLocationSchema).optional(),
  processApply: z.string().optional(),
  status: z.string().optional(),
  statusForNotify: z.string().optional(),
  planType: z.string().optional(),
  planNo: z.string().optional(),
  stepCode: z.string().optional(),
  type: z.string().optional(),
  numPetition: z.number().int().optional(),
  numClarifyReq: z.number().int().optional(),
  numBidderTech: z.number().int().optional(),
  numPetitionHsmt: z.number().int().optional(),
  numPetitionLcnt: z.number().int().optional(),
  numPetitionKqlcnt: z.number().int().optional(),
  bidId: z.string().optional(),
  bidNo: z.string().optional(),
  bidPrice: z.array(z.number()).optional(),
  priceInit: z.number().optional(),
  priceStep: z.number().optional(),
  score: z.string().optional(),
  isMedicine: z.number().int().optional(),
  isDomestic: z.number().int().optional(),
  isMultiLot: z.number().int().optional(),
  workType: z.string().optional()
});

export const SearchPageSchema = z.looseObject({
  content: z.array(TenderSummarySchema)
});

export const SearchResponseSchema = z.looseObject({
  page: SearchPageSchema
});

export const CategorySearchRequestSchema = z.looseObject({
  categoryTypeCodeLst: z.array(z.string())
});

export const CategoryOptionSchema = z.looseObject({
  code: z.string(),
  name: z.string(),
  nameEn: z.string(),
  categoryTypeCode: z.string()
});

export const CategorySearchResponseSchema = z.looseObject({
  categories: z.record(z.string(), z.array(CategoryOptionSchema))
});

export const AreaSearchRequestSchema = z.looseObject({
  areaType: z.string(),
  parentCode: z.string()
});

export const AreaSchema = z.looseObject({
  code: z.string().optional(),
  areaType: z.string().optional(),
  name: z.string().optional(),
  nameTranslate: z.string().optional(),
  orderIndex: z.number().int().optional(),
  status: z.number().int().optional(),
  parentCode: z.string().optional(),
  parent: z.union([z.looseObject({}), z.null()]).optional(),
  parentDTO: z.union([z.looseObject({}), z.null()]).optional(),
  groupCode: z.string().optional(),
  createdDate: z.string().optional(),
  createdBy: z.string().optional(),
  lastModifiedDate: z.string().optional(),
  lastModifiedBy: z.string().optional()
});

export const AreaSearchResponseSchema = z.looseObject({
  areas: z.array(AreaSchema)
});

export const PopularKeywordRequestSchema = z.looseObject({
  pageSize: z.number().int(),
  pageNumber: z.number().int(),
  sort: z.string(),
  popularKeyword: z.looseObject({
    status: z.number().int()
  })
});

export const SortStateSchema = z.looseObject({
  sorted: z.boolean(),
  unsorted: z.boolean(),
  empty: z.boolean()
});

export const PopularKeywordSchema = z.looseObject({
  id: z.string(),
  keyword: z.string(),
  resultType: z.string(),
  linkUrl: z.string(),
  answerContent: z.string().nullable(),
  status: z.number().int(),
  displayOrder: z.number().int(),
  createdDate: z.string(),
  updatedDate: z.string()
});

export const PopularKeywordPageSchema = z.looseObject({
  content: z.array(PopularKeywordSchema),
  totalPages: z.number().int(),
  pageSize: z.number().int(),
  currentPage: z.number().int(),
  totalElements: z.number().int(),
  sort: SortStateSchema,
  last: z.boolean(),
  first: z.boolean(),
  empty: z.boolean()
});

export const PopularKeywordResponseSchema = z.looseObject({
  page: PopularKeywordPageSchema
});

export type SearchRequest = z.infer<typeof SearchRequestSchema>;
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
export type TenderSummary = z.infer<typeof TenderSummarySchema>;
export type CategorySearchRequest = z.infer<typeof CategorySearchRequestSchema>;
export type CategorySearchResponse = z.infer<typeof CategorySearchResponseSchema>;
export type AreaSearchRequest = z.infer<typeof AreaSearchRequestSchema>;
export type AreaSearchResponse = z.infer<typeof AreaSearchResponseSchema>;
export type PopularKeywordRequest = z.infer<typeof PopularKeywordRequestSchema>;
export type PopularKeywordResponse = z.infer<typeof PopularKeywordResponseSchema>;
