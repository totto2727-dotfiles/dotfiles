import $ from "jsr:@david/dax";
import { String } from "jsr:@totto/function/effect";

export async function exist(name: string) {
  return String.isNonEmpty(await $`which ${name}`.text());
}
