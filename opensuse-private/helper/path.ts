import $ from "jsr:@david/dax";
import * as os from "node:os";

export function getHomeDirectory() {
  return os.homedir();
}

export function homePath(filePath: string) {
  return $.path(getHomeDirectory()).join(filePath).toString();
}

export function configPath(filePath: string) {
  return $.path(getHomeDirectory()).join(".config").join(filePath).toString();
}

export function localBinPath(filePath: string) {
  return $.path(getHomeDirectory()).join(".local").join("bin").join(filePath)
    .toString();
}

export function localSharePath(filePath: string) {
  return $.path(getHomeDirectory()).join(".local").join("share").join(filePath)
    .toString();
}

export function localStatePath(filePath: string) {
  return $.path(getHomeDirectory()).join(".local").join("state").join(filePath)
    .toString();
}
