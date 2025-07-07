import type TreeItemData from "../tree/TreeItemData";
import type { Catalog, CatalogItemBase, LeagueCatalogItem, RegionCatalogItem, SportCatalogItem } from "~/hooks/catalog/useCatalog";

export interface CatalogueNode extends TreeItemData<CatalogueNode> {
}

function baseToCalalogueNode(item: CatalogItemBase): CatalogueNode {
  return {
    id: item.uuid,
    name: item.name,
  };
}

function leagueToCatalogueNode(item: LeagueCatalogItem): CatalogueNode {
  return baseToCalalogueNode(item);
}

function regionToCatalogueNode(item: RegionCatalogItem): CatalogueNode {
  return {
    ...baseToCalalogueNode(item),
    children: item.leagues.map((league) => leagueToCatalogueNode(league))
  };
} 

function sportToCatalogueNode(item: SportCatalogItem): CatalogueNode {
  return {
    ...baseToCalalogueNode(item),
    children: item.regions.map((region) => regionToCatalogueNode(region)),
  };
}

export function buildCatalogueTree(catalog: Catalog): CatalogueNode {
  return {
    id: "root",
    name: "Catalog",
    children: catalog.sports.map((sport) => sportToCatalogueNode(sport)),
  };
}
