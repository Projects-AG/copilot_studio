// src/components/knowledge/types.ts

export interface KnowledgeItem {
  id: string;
  name: string;
  description: string;
  sourceType: "website" | "file";
  sourceUrl?: string;
  fileName?: string;
  status: "Ready" | "Processing";
  modifiedAt: string;
}
