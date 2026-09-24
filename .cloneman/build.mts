import { type BuildContext } from "cloneman";
import pkg from "../package.json" with { type: "json" };

export async function build(context: BuildContext): Promise<void> {
  const { buildTemplate } = context;

  const template = await buildTemplate(pkg.name, {
    managedFiles: [
      ".env.development",
      ".env.example",
      ".gitignore",
      ".vscode/extensions.json",
      "Dockerfile",
      "index.html",
      "tsconfig.app.json",
      "tsconfig.node.json",
      "vite.config.ts",
      "package.json",
      "tsconfig.json",
      "tsconfig.vitest.json",
      "vitest.config.ts",
      "public/runtime-config.js",
      "public/vite.svg",
    ],
    ignoredFiles: [
      ".cloneman/**",
      ".github/**",
      "CODEOWNERS",
      "CHANGELOG.md",
      "package-lock.json",
    ],
    ignoredDependencies: [
      "@fkui/*",
      "!@fkui/tsconfig",
      "@pinia/*",
      "@vue/*",
      "pinia",
      "vue",
      "vue-router",
    ],
  });

  /* install hook to verify application uses the correct template (we cannot put
   * this in the package `prepare` directly as this project is not managed by
   * cloneman and thus fails the check). */
  await template.updateJson("package.json", {
    scripts: {
      prepare: ["cloneman verify", pkg.scripts.prepare].join(" && "),
    },
  });

  /* remove "cloneman build" from the build script, it is used to test the
   * template itself not the user application */
  await template.updateJson("package.json", {
    scripts: {
      build: pkg.scripts.build
        .split(" && ")
        .filter((it: string) => !it.includes("cloneman"))
        .join(" && "),
    },
  });
}
