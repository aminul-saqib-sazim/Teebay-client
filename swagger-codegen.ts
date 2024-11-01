import fs from "node:fs";
import path from "node:path";
import { generateApi } from "swagger-typescript-api";

const savePath = path.resolve(process.cwd(), "./shared/typedefs/");
const swaggerUrl = "http://localhost:5000/swagger-json";

function transformFileContent(fileContent: string) {
  const faultyEnumRegex = new RegExp(/export enum (I(\w+))/g);
  const enums = [...fileContent.matchAll(faultyEnumRegex)];

  let updatedFileContent = fileContent;

  for (const [, enumCurrentName, enumActualName] of enums) {
    if (!enumCurrentName || !enumActualName) continue;

    updatedFileContent = updatedFileContent.replaceAll(enumCurrentName, enumActualName);
  }

  return updatedFileContent;
}

/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
generateApi({
  name: "api.ts",
  output: savePath,
  url: swaggerUrl,

  defaultResponseAsSuccess: false,
  generateClient: false,
  generateRouteTypes: false,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  unwrapResponseData: false,
  defaultResponseType: "void",
  cleanOutput: false,
  enumNamesAsValues: true,
  moduleNameFirstTag: false,
  generateUnionEnums: false,
  typePrefix: "I",
  typeSuffix: "",
  enumKeyPrefix: "",
  enumKeySuffix: "",
  addReadonly: true,
  sortTypes: true,
})
  .then(({ files }) => {
    files.forEach(({ fileContent, fileName, fileExtension: fileExtensionWithDot }) => {
      const transformedFileContent = transformFileContent(fileContent);

      const fullFilePath = path.resolve(savePath, `${fileName}${fileExtensionWithDot}`);

      fs.writeFileSync(fullFilePath, transformedFileContent);
    });
  })
  .catch((e) => console.error(e));
