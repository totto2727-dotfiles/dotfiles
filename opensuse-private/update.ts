// deno run -A update.ts
import $ from "jsr:@david/dax";
import { Array, pipe, Predicate } from "jsr:@totto/function/effect";
import {
  configPath,
  getHomeDirectory,
  homePath,
  localBinPath,
} from "./helper/path.ts";
import { rawURL, tokyoNightRawURL } from "./helper/github.ts";

function request(path: string) {
  return $.request(path).showProgress().text();
}

type SaveOption = {
  sudo?: boolean;
};

async function save(filePath: string, content: string, options?: SaveOption) {
  return await (Predicate.isTruthy(options?.sudo)
    ? $`sudo tee ${filePath}`
    : $`tee ${filePath}`).stdinText(content)
    .quiet(
      "stdout",
    );
}

class DownloadFile {
  private constructor(
    private readonly content: string,
    public readonly savePath: string,
    private readonly saveOption?: SaveOption,
  ) {}

  static async download(
    downloadURL: string,
    savePath: string,
    saveOption?: SaveOption,
  ) {
    return new DownloadFile(await request(downloadURL), savePath, saveOption);
  }

  public async save() {
    return await save(this.savePath, this.content, this.saveOption);
  }
}

function emplyLine() {
  $.log();
}

async function logBlock(title: string, fn: () => Promise<void>) {
  $.logStep(title, "");
  await fn();
  emplyLine();
}

async function main() {
  await logBlock("home directory", async () => {
    await $`echo ${getHomeDirectory()}`;
  });

  await logBlock("zypper", async () => {
    await $`sudo zypper dup`;
    return;
  });

  await logBlock("mise", async () => {
    await $`mise install`;
    await $`mise self-update`;
    await $`mise up`;
  });

  await logBlock("configs", async () => {
    const dockerCredentialGHPath = localBinPath("docker-credential-gh");

    await $`mkdir -p ${configPath("git")}`;

    const downloadFileParameterArray = [
      // bash
      [rawURL("bash", ".bashrc"), homePath(".bashrc")],
      [rawURL("bash", ".profile"), homePath(".profile")],
      [rawURL("bash", ".inputrc"), homePath(".inputrc")],
      [rawURL("bash", ".alias"), homePath(".alias")],
      // podman
      [
        rawURL("bash", "auth.json"),
        configPath("containers/auth.json"),
      ],
      [
        rawURL("bash", "registries.conf"),
        configPath("containers/registries.conf"),
      ],
      [
        rawURL("bash", "docker-credential-gh"),
        dockerCredentialGHPath,
        { sudo: true },
      ],
      // git
      [
        rawURL("git", ".gitconfig"),
        homePath(".gitconfig"),
      ],
      [
        rawURL("git", "delta.gitconfig"),
        configPath("git/delta.gitconfig"),
      ],
      [
        rawURL("git", "user.gitconfig"),
        configPath("git/user.gitconfig"),
      ],
      [
        rawURL("git", "ignore"),
        configPath("git/ignore"),
      ],
      [
        tokyoNightRawURL(),
        configPath("git/tokyonight_moon.gitconfig"),
      ],
      // keyd
      [
        rawURL("keyd", "default.conf"),
        "/etc/keyd/default.conf",
        { sudo: true },
      ],
      [
        rawURL("keyd", "corebook.conf"),
        "/etc/keyd/corebook.conf",
        { sudo: true },
      ],
    ] satisfies Parameters<typeof DownloadFile.download>[];

    const downloadFileArray = await Promise.all(
      downloadFileParameterArray.map(([donwloadURL, savePath, saveOptions]) =>
        DownloadFile.download(donwloadURL, savePath, saveOptions)
      ),
    );

    await Promise.all(downloadFileArray.map(
      (downloadFile) => downloadFile.save(),
    ));

    $`chmod 500 ${dockerCredentialGHPath}`;

    const gitReposityPathArray = [
      configPath("nvim"),
      configPath("ghostty"),
      configPath("lazygit"),
      configPath("mise"),
      configPath("keyd"),
      homePath(".claude"),
    ];

    await Promise.all(
      Array.map(
        gitReposityPathArray,
        (path) => {
          try {
            $`git -C ${path} pull`.quiet("stdout");
          } catch (e) {
            throw new Error(
              `Pull Error: ${path} ${e}`,
            );
          }
        },
      ),
    );

    $.log("Updated files:");
    $.logGroup(() => {
      for (const downloadFile of downloadFileArray) {
        $.log(downloadFile.savePath);
      }
      for (const gitReposityPath of gitReposityPathArray) {
        $.log(`${gitReposityPath}/`);
      }
    });
    $.logGroupEnd();
  });

  logBlock("keyd", async () => {
    await $`sudo keyd reload`;
    await $`keyd-application-mapper`;
  });
}

await main();
