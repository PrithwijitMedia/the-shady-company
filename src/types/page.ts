import { Block } from "./block";

export interface PageDocument {

  title: string;

  slug: string;

  status: string;

  blocks: Block[];
}