# Contentstack TypeScript Delivery SDK - Developer Guide

This guide introduces the **Contentstack TypeScript delivery SDK** and explains how AI-driven agents can use it to fetch content and assets from Contentstack. It covers initialization, querying content types, entries and assets, handling global fields and taxonomies, paginating results, and transforming images. Code samples use modern ES/TypeScript syntax and assume the SDK has been installed via npm install contentstack.

## 1 Initializing a stack

The entry point for all operations is a **Stack**. Use contentstack.stack() (imported from the package) to create a stack instance. Provide at least an API key, a **delivery token** and an **environment**; additional parameters customize behaviour:

| parameter       | type       | purpose                                                                                                                                                                                   |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`        | `string`   | API key from your Contentstack stack                                                                                                                                                      |
| `deliveryToken` | `string`   | access token for read-only delivery API                                                                                                                                                   |
| `environment`   | `string`   | name of the environment (e.g. `development`, `production`)                                                                                                                                |
| `branch`        | `string`   | optional; branch for content versioning                                                                                                                                                   |
| `host`          | `string`   | base URL; override when using custom domain                                                                                                                                               |
| `region`        | `Region`   | database region enum (`US`, `EU`, `AU`, `AZURE_NA`, `AZURE_EU`, `GCP_NA`, `GCP_EU`); determines API endpoint                                                                              |
| `locale`        | `string`   | default locale for API requests                                                                                                                                                           |
| `cacheOptions`  | `object`   | configure caching with policy (`IGNORE_CACHE`, `CACHE_THEN_NETWORK`, `CACHE_ELSE_NETWORK`, `NETWORK_ELSE_CACHE`), storage type (`localStorage`, `memoryStorage`), and persistence options |
| `early_access`  | `string[]` | array of early-access API feature flags                                                                                                                                                   |
| `logHandler`    | `function` | handle logs (useful for debugging); receives level and data parameters                                                                                                                    |
| `plugins`       | `array`    | one or more **plugin instances** that intercept requests and responses                                                                                                                    |
| `live_preview`  | `object`   | configure live preview with host, enable flag, management/preview tokens, and variant options                                                                                             |
| `port`          | `number`   | optional; port number for custom configurations                                                                                                                                           |
| `debug`         | `boolean`  | enable debug mode for additional logging and debugging information                                                                                                                        |

### Live Preview Configuration

The `live_preview` object enables real-time content preview functionality. Configure it with the following properties:

| parameter                  | type      | purpose                                                           |
| -------------------------- | --------- | ----------------------------------------------------------------- |
| `enable`                   | `boolean` | **required**; enables or disables live preview functionality      |
| `live_preview`             | `string`  | optional; live preview configuration string                       |
| `host`                     | `string`  | optional; custom host URL for live preview API endpoint           |
| `management_token`         | `string`  | optional; management API token for live preview operations        |
| `preview_token`            | `string`  | optional; preview-specific token for authenticated preview access |
| `include_applied_variants` | `boolean` | optional; include variant information in live preview responses   |
| `contentTypeUid`           | `string`  | optional; specific content type UID to enable live preview for    |
| `entryUid`                 | `any`     | optional; specific entry UID to enable live preview for           |

### Simplifying region and endpoint configuration

Managing Contentstack regions and their corresponding API endpoints can be complex. The `@timbenniks/contentstack-endpoints` package simplifies this by providing utilities to get the correct endpoints for different regions and cloud providers.

#### Installation

```bash
npm install @timbenniks/contentstack-endpoints
```

#### Usage

The package provides two main functions:

- `getRegionForString()` - Converts string region names to proper Region enums
- `getContentstackEndpoints()` - Returns all API endpoints for a given region

```typescript
import {
  getContentstackEndpoints,
  getRegionForString,
} from "@timbenniks/contentstack-endpoints";

// Get region enum from string
const region = getRegionForString(
  process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string
);

// Get all endpoints for the region
const endpoints = getContentstackEndpoints(region, true); // true to omit https://

// Available endpoints include:
// - endpoints.contentDelivery
// - endpoints.contentManagement
// - endpoints.imageDelivery
// - endpoints.assets
// - endpoints.graphql
// - endpoints.preview
// - endpoints.application
// And more...
```

#### Supported regions

The package supports all Contentstack regions:

- `"us"` → Region.US (default)
- `"eu"` → Region.EU
- `"au"` → Region.AU
- `"azure-na"` → Region.AZURE_NA
- `"azure-eu"` → Region.AZURE_EU
- `"gcp-na"` → Region.GCP_NA
- `"gcp-eu"` → Region.GCP_EU

#### Error handling

The package handles invalid regions gracefully:

- `getRegionForString()` returns `undefined` for invalid inputs
- `getContentstackEndpoints()` returns an empty object `{}` for unrecognized regions
- No errors are thrown, ensuring your application continues to function

### Example - initialising a stack with endpoints package

```typescript
import contentstack from "@contentstack/delivery-sdk";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

// Get region and endpoints
const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string);
const endpoints = getContentstackEndpoints(region, true);

const Stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: region
  host: endpoints?.contentDelivery,
  live_preview: {
    host: endpoints?.preview
  }
});

// set the locale for all subsequent calls
Stack.setLocale("fr-fr");
```

### Example - initialising a stack

```typescript
import contentstack from "@contentstack/delivery-sdk";

const Stack = contentstack.stack({
  apiKey: "your_api_key",
  deliveryToken: "your_delivery_token",
  environment: "staging",
  locale: "en-us",
  region: "eu",
  logHandler: (level: string, message: string) => {
    console.log(`[${level}] ${message}`);
  },
});

// set the locale for all subsequent calls
Stack.setLocale("fr-fr");
```

### Custom plugins

Plugins allow you to run custom logic before a request is sent or after a response is received. Create a class with onRequest and/or onResponse methods, then include an instance in the plugins array when initialising the stack.

```typescript
class MyPlugin {
  // Invoked before every HTTP request
  async onRequest(request: any) {
    // add custom header or modify the request
    request.headers["X-My-Header"] = "plugin";
    return request;
  }
  // Invoked after every HTTP response
  async onResponse(response: any) {
    // inspect or log the response
    console.log("Status:", response.status);
    return response;
  }
}

const stackWithPlugin = contentstack.stack({
  apiKey: "api_key",
  deliveryToken: "token",
  environment: "production",
  plugins: [new MyPlugin()],
});
```

## 2 Stack-level methods

Once a stack is created, the following methods let you fetch various resources:

| method                               | description                                                                                                                                                                 | returns                                  |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `stack.asset(assetUid?)`             | Returns an **asset object** when a UID is provided or an **asset collection** when omitted.                                                                                 | `Asset` or `AssetCollection`             |
| `stack.contentType(contentTypeUid?)` | Retrieves a specific **content type** or all content types when called without a UID.                                                                                       | `ContentType` or `ContentTypeCollection` |
| `stack.setLocale(locale)`            | Overrides the default locale for future calls.                                                                                                                              | `Stack`                                  |
| `stack.sync(params, recursive?)`     | Performs incremental sync of entries and assets based on filters such as locale, start date, content type, type (e.g. published, deleted), pagination token and sync token. | Promise resolving to sync data           |
| `stack.globalField(globalFieldUid?)` | Returns a specific **global field** or a collection when omitted.                                                                                                           | `GlobalField` or `GlobalFieldCollection` |

### Sync example

Initial synchronisation fetches all published entries and assets:

```typescript
const syncResult = await Stack.sync({ init: true });
// syncResult.items contains entries and assets

// subsequent sync using sync token
const nextSyncResult = await Stack.sync({ sync_token: syncResult.sync_token });
```

You can filter by locale, start date or content type using parameters like locale: 'fr-fr', start_date: '2024-06-01' or content_type_uid: 'blog'. Set recursive: true to continue fetching paginated data until all changes are collected.

## 3 Assets

### 3.1 Single asset (Asset)

Call stack.asset(assetUid) to obtain an Asset object. Chain methods on this object to configure the request, then call .fetch() to retrieve the asset:

| method                   | description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `fetch()`                | Executes the request and returns the asset data.                       |
| `includeBranch()`        | Include branch information in the response.                            |
| `includeDimension()`     | Request dimension details (height/width).                              |
| `includeFallback()`      | When a localized asset is unavailable, include fallback language data. |
| `locale(locale)`         | Set a specific locale for this asset fetch.                            |
| `relativeUrls()`         | Return asset URLs relative to the configured domain.                   |
| `version(versionNumber)` | Retrieve a specific version of the asset.                              |
| `includeMetadata()`      | Include metadata such as tags or custom fields in the response.        |

#### _Example - fetch an asset with metadata and dimensions_

```typescript
const asset = await Stack.asset("asset_uid")
  .includeDimension()
  .includeMetadata()
  .fetch();

console.log(asset.filename, asset.url);
```

### 3.2 Asset collection (AssetCollection)

Use stack.asset() without parameters to create an asset collection. Chain the following methods and end with .find() to retrieve multiple assets:

| method                         | description                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| `addParams({ key: value, … })` | Adds multiple query parameters to the request.                                       |
| `find()`                       | Executes the query and returns all matching assets.                                  |
| `includeBranch()`              | Includes branch information in each asset.                                           |
| `includeCount()`               | Returns the total count of matching assets along with the data.                      |
| `includeDimension()`           | Includes height/width for each asset.                                                |
| `includeFallback()`            | Includes fallback locale assets.                                                     |
| `locale(locale)`               | Specifies the locale of assets to retrieve.                                          |
| `orderByAscending(field)`      | Sort results by a field in ascending order.                                          |
| `orderByDescending(field)`     | Sort results by a field in descending order.                                         |
| `param(key, value)`            | Adds a single query parameter.                                                       |
| `relativeUrls()`               | Returns relative asset URLs for all items.                                           |
| `removeParam(key)`             | Removes a previously added parameter.                                                |
| `version(number)`              | Retrieves a specific version of each asset.                                          |
| `where(field, op, values)`     | Filter assets using comparison operators such as `IS_LESS_THAN`, `IS_EQUAL_TO` etc.. |
| `includeMetadata()`            | Include asset metadata.                                                              |
| `skip(n)`                      | Skips the first _n_ results (useful for pagination).                                 |
| `limit(n)`                     | Limits the number of returned assets.                                                |

#### _Example - list image assets in French locale_

```typescript
const images = await Stack.asset()
  .locale("fr-fr")
  .where("content_type", contentstack.QueryOperation.EQUALS, ["image"])
  .includeDimension()
  .includeCount()
  .limit(20)
  .find();

console.log("Total images:", images.count);
```

## 4 Content types

A **content type** defines the schema for entries. Use stack.contentType(contentTypeUid) to fetch a specific content type, or call stack.contentType() without parameters for a collection.

| method                       | description                                                                                                                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `fetch()`                    | Retrieves metadata about the content type (name, schema, field definitions).                                                 |
| `entry(entryUid?)`           | Returns an `Entry` object representing a specific entry or, when omitted, an `EntryQueryable` for querying multiple entries. |
| `find()`                     | Returns all content types in the stack.                                                                                      |
| `includeGlobalFieldSchema()` | Includes global field schemas within the content type definition.                                                            |

### Example - fetch content type schema

```typescript
const blogType = await Stack.contentType("blog").fetch();
console.log(blogType.schema);
```

## 5 Entries

Calling stack.contentType('contentTypeUid').entry(entryUid) returns an **Entry** object (when UID is supplied) or an **EntryQueryable** (when omitted). Entry methods can be chained to refine queries. Finally call .fetch() to get a single entry or .find() to get multiple entries.

### 5.1 Single entry (Entry)

| method                                  | description                                                                                                                                                                                         |
| :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fetch()`                               | Retrieves the entry data.                                                                                                                                                                           |
| `includeBranch()`                       | Include branch details with the entry.                                                                                                                                                              |
| `includeFallback()`                     | Include fallback locale entry if the specified locale is unavailable.                                                                                                                               |
| `locale(locale)`                        | Specifies the locale for this entry.                                                                                                                                                                |
| `addParams({ key: value })`             | Adds query parameters such as `include_all`, `include_all_depth` or other custom flags.                                                                                                             |
| `except(fieldUid)`                      | Excludes one or more fields from the response.                                                                                                                                                      |
| `includeContentType()`                  | Includes content type details with the entry.                                                                                                                                                       |
| `includeEmbeddedItems()`                | Replaces embedded assets/entries in rich text fields with their JSON representation.                                                                                                                |
| `includeReference(...refFieldUids)`     | Includes referenced entries specified by reference field UIDs. To include **all** referenced entries at all levels, set parameters `{ include_all: true, include_all_depth: 2 }` via `addParams()`. |
| `includeMetadata()`                     | Include metadata for the entry.                                                                                                                                                                     |
| `variants(variantUidOrAlias: string[])` | Fetch one or more entry variants; pass either a variant UID/alias or an array to fetch multiple variants.                                                                                           |

#### _Example - fetch entry with references and embedded items_

```typescript
const entry = await Stack.contentType("blog")
  .entry("entry_uid")
  .locale("fr-fr")
  .includeReference("author", "category")
  .includeEmbeddedItems()
  .fetch();

console.log(entry.title, entry.author);
```

### 5.2 Entry query (EntryQueryable)

Entry queries allow you to retrieve multiple entries and filter, sort or paginate results. The following methods operate on an EntryQueryable and return either the same query object (allowing chaining) or a promise when .find() is called:

| method                                                                                  | description                                                                                            |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `find()`                                                                                | Executes the query and returns matching entries.                                                       |
| `skip(n)`                                                                               | Skip the first _n_ entries (useful for pagination).                                                    |
| `limit(n)`                                                                              | Limit the number of returned entries.                                                                  |
| `includeCount()`                                                                        | Include the total count of matching entries in the response.                                           |
| `only(fieldUids[])`                                                                     | Include only specified fields in the result.                                                           |
| `orderByAscending(field)` / `orderByDescending(field)`                                  | Sort entries by a field ascending or descending.                                                       |
| `param(key, value)`                                                                     | Add a custom query parameter to the request.                                                           |
| `query(json)`                                                                           | Apply query conditions by passing a Mongo-like filter object; use in conjunction with query operators. |
| `removeParam(key)`                                                                      | Remove a previously set parameter.                                                                     |
| `where(fieldUid, op, values)`                                                           | Apply a comparison operation (e.g. less than, equal to) on a field.                                    |
| `includeMetadata()`                                                                     | Include entry metadata.                                                                                |
| `includeEmbeddedItems()` / `includeContentType()` / `includeReference()` / `variants()` | Same as single entry methods; apply to all queried entries.                                            |

#### _Example - paginating blog posts_

```typescript
const query = Stack.contentType("blog").entry().query();

// fetch first page of 20 posts
const page1 = await query
  .only(["title", "url"])
  .orderByDescending("date")
  .skip(0)
  .limit(20)
  .includeCount()
  .find();

console.log("Total posts:", page1.count);

// fetch second page by skipping first 20 entries
const page2 = await query.skip(20).limit(20).find();
```

## 6 Query object

When you call query() on an entry collection, it returns a **Query** object that supports advanced query operators. Many methods mirror those on EntryQueryable but operate on the query itself. Key methods include:

| method                                                                 | description                                                                   |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `addParams(obj)`                                                       | Add multiple query parameters.                                                |
| `addQuery(obj)`                                                        | Append additional filter criteria to the existing query.                      |
| `find()`                                                               | Executes the query and returns the matching entries.                          |
| `includeCount()`                                                       | Returns the total count along with entries.                                   |
| `orderByAscending(field)` / `orderByDescending(field)`                 | Sort results.                                                                 |
| `param(key, value)`                                                    | Add a single query parameter.                                                 |
| `queryOperator(op)`                                                    | Change the logical operator (`AND` or `OR`) used to combine query conditions. |
| `removeParam(key)`                                                     | Remove a query parameter.                                                     |
| `where(field, op, values)`                                             | Apply comparison operator; same as entry.                                     |
| `whereIn(referenceField, refValues)`                                   | Filter entries whose reference field UID points to one of the specified UIDs. |
| `whereNotIn(referenceField, refValues)`                                | Exclude entries based on reference UIDs.                                      |
| `skip(n)` / `limit(n)`                                                 | Pagination methods.                                                           |
| `or(...queries)` / `and(...queries)`                                   | Combine multiple Query objects with OR/AND logical operators.                 |
| `containedIn(field, values)` / `notContainedIn(field, values)`         | Filter entries where a field's value is (or is not) within an array.          |
| `equalTo(field, value)` / `exists(field)` / `notExists(field)`         | Simple equality and existence checks.                                         |
| `getQuery()`                                                           | Returns the raw query object built so far.                                    |
| `greaterThan`, `greaterThanOrEqualTo`, `lessThan`, `lessThanOrEqualTo` | Range comparisons【408555627148747†screenshot】.                              |
| `referenceIn(field, ids)` / `referenceNotIn(field, ids)`               | Filter by reference IDs.                                                      |
| `regex(field, expression)`                                             | Filter using regular expressions.                                             |
| `search(keyword)`                                                      | Full-text search across fields.                                               |
| `tags(tagsArray)`                                                      | Filter entries containing specified tags.                                     |

### Pagination on Query

After building a query, call .paginate({ skip, limit }) to get a **Pagination** object. Use .next() or .previous() to navigate pages. Each call returns the next or previous set of results while honouring the original query.

```typescript
const query = Stack.contentType("blog").entry().query();

const page1 = await query.paginate({ skip: 0, limit: 10 }).find();
const page2 = await query.next().find(); // returns entries 11-20
const page1Again = await query.previous().find();
```

## 7 Taxonomy operations

Taxonomies categorize entries into hierarchical structures. When querying entries, you can filter by taxonomy terms using the following methods (available on EntryQueryable and Query objects). Each method accepts a taxonomy key (UID), a term value (UID), and optionally levels to limit the hierarchy depth:

| method                               | description                                                                                               | example                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `equalAndBelow(key, value, levels?)` | Fetch entries tagged with the specified taxonomy term **and all its descendants** within optional levels. | `query.equalAndBelow('taxonomy_uid','term_uid', 2)` |
| `below(key, value, levels?)`         | Fetch entries with descendants of the term but **exclude** the term itself.                               | `query.below('taxonomy_uid','term_uid')`            |
| `equalAndAbove(key, value, levels?)` | Fetch entries tagged with the term **and** its ancestors.                                                 | `query.equalAndAbove('taxonomy_uid','term_uid', 1)` |
| `above(key, value, levels?)`         | Fetch entries tagged with ancestors of the term but **exclude** the term itself.                          | `query.above('taxonomy_uid','term_uid')`            |

These methods enable targeted retrieval of entries across hierarchical taxonomies, such as categories and subcategories.

## 8 Global fields

Global fields are reusable field groups. Access them through stack.globalField(globalFieldUid) and chain the methods below:

| method            | description                                    |
| ----------------- | ---------------------------------------------- |
| `fetch()`         | Retrieves the schema of a global field.        |
| `find()`          | Returns all global fields in the stack.        |
| `includeBranch()` | Includes branch details with the global field. |

#### _Example - fetch a global field_

```typescript
const richTextField = await Stack.globalField("rich_text").fetch();
console.log(richTextField.schema);
```

## 9 Image transformation

ImageTransform applies transformations to asset URLs. Instantiate a transformation object and pass it to the transform() method of an asset URL. The following methods return the same ImageTransform object (allowing chaining):

| method                               | key parameters                                                               | purpose                                                                                                | example                                                                                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `auto()`                             | —                                                                            | Enables automatic image optimization features.                                                         | `new ImageTransform().auto()`                                                                                                             |
| `bgColor(color)`                     | `color` (string) - background colour                                         | Sets background colour.                                                                                | `new ImageTransform().bgColor('cccccc')`                                                                                                  |
| `blur(blurValue)`                    | `blurValue` (number, 1-1000)                                                 | Applies a blur effect.                                                                                 | `new ImageTransform().blur(10)`                                                                                                           |
| `brightness(value)`                  | `value` (number, -100 to 100)                                                | Adjusts brightness.                                                                                    | `new ImageTransform().brightness(80.5)`                                                                                                   |
| `canvas(opts)`                       | `width`, `height` (required); `canvasBy`, `xval`, `yval` (optional)          | Extends canvas size.                                                                                   | `new ImageTransform().canvas({ width: 200, height: 300, canvasBy: CanvasByEnum.OFFSET, xval: 100, yval: 150 })`                           |
| `contrast(value)`                    | `value` (number, -100 to 100)                                                | Adjusts contrast.                                                                                      | `new ImageTransform().contrast(-80.99)`                                                                                                   |
| `crop(opts)`                         | `width`, `height`, `cropBy`, `xval`, `yval`, `safe`, `smart`                 | Crops an image; supports aspect ratio, region or offset cropping with optional content-aware cropping. | `new ImageTransform().crop({ width: 200, height: 300, cropBy: CropByEnum.REGION, xval: 100, yval: 150 })`                                 |
| `dpr(value)`                         | `value` (number, 1-10000)                                                    | Sets device pixel ratio.                                                                               | `new ImageTransform().resize({ width: 300, height: 500 }).dpr(10)`                                                                        |
| `fit(type)`                          | `type` (FitByEnum) - `BOUNDS` or `CROP`                                      | Fits image within dimensions.                                                                          | `new ImageTransform().resize({ width: 200, height: 200 }).fit(FitByEnum.BOUNDS)`                                                          |
| `format(format)`                     | `format` (FormatEnum) - e.g. `JPG`, `PNG`, `WEBP`                            | Converts image format.                                                                                 | `new ImageTransform().format(FormatEnum.PJPG)`                                                                                            |
| `frame()`                            | —                                                                            | Extracts the first frame from a GIF.                                                                   | `new ImageTransform().frame()`                                                                                                            |
| `orient(orientation)`                | `orientation` (Orientation enum) e.g. `FLIP_HORIZONTAL`                      | Rotates or flips an image.                                                                             | `new ImageTransform().orient(Orientation.FLIP_HORIZONTAL)`                                                                                |
| `overlay(opts)`                      | `relativeURL` (string); optional `align`, `repeat`, `width`, `height`, `pad` | Places one image over another.                                                                         | `new ImageTransform().overlay({ relativeURL: overlayImgURL, align: OverlayAlignEnum.BOTTOM, repeat: OverlayRepeatEnum.Y, width: '50p' })` |
| `padding(padding)`                   | `padding` (number or array)                                                  | Adds whitespace/border around the image.                                                               | `new ImageTransform().padding([25,50,75,90])`                                                                                             |
| `quality(value)`                     | `value` (1-100)                                                              | Controls compression quality.                                                                          | `new ImageTransform().quality(50)`                                                                                                        |
| `resize(opts)`                       | `width`, `height`; `disable` (e.g. `'upscale'`)                              | Resizes images, optionally disabling upscaling.                                                        | `new ImageTransform().resize({ width: 200, height: 200, disable: 'upscale' })`                                                            |
| `resizeFilter(type)`                 | `type` (ResizeFilterEnum) - `NEAREST`, `BILINEAR`, etc.                      | Selects algorithm for resizing.                                                                        | `new ImageTransform().resize({ width: 500, height: 550 }).resizeFilter(ResizeFilterEnum.NEAREST)`                                         |
| `saturation(value)`                  | `value` (-100 to 100)                                                        | Adjusts colour saturation.                                                                             | `new ImageTransform().saturation(-80.99)`                                                                                                 |
| `sharpen(amount, radius, threshold)` | `amount` (0-10), `radius` (1-1000), `threshold` (0-255)                      | Sharpens image edges.                                                                                  | `new ImageTransform().sharpen(5, 1000, 2)`                                                                                                |
| `trim(value)`                        | `value` (number or array)【411864588132406†L4027-L4061】                     | Trims edges by specified pixels or percentages.                                                        | `new ImageTransform().trim([25, 50, 75, 90])`                                                                                             |

#### _Applying transformations_

To use these methods, create an ImageTransform instance, call the desired transformations and pass the object to the transform() method of the image URL:

```typescript
import { ImageTransform } from "contentstack";

const url = "https://images.contentstack.io/v3/assets/.../filename.jpg";
const transformObj = new ImageTransform()
  .resize({ width: 300, height: 300 })
  .crop({ width: 300, height: 300, cropBy: CropByEnum.CENTER })
  .quality(80);

const transformedURL = url.transform(transformObj);
// Use transformedURL in your application
```

## 10 Additional notes

- **Locales and fallback:** Many methods accept a locale argument. When retrieving content in a locale, use includeFallback() to include the fallback locale entry or asset if the primary locale does not exist.

- **Nested references:** When including references, you can set query parameters include_all: true and include_all_depth to automatically include referenced entries up to a certain depth.

- **Pagination:** Use .skip() and .limit() on collections or queries to paginate. For convenience, the Query object supports .paginate() with .next() and .previous() methods to traverse pages.

## 11 Conclusion

The Contentstack TypeScript Delivery SDK provides a comprehensive API for accessing content, assets, global fields and taxonomies. By initialising a stack with your credentials, you can fetch single entries or perform complex queries with filters, sorting, pagination and reference expansion. The ImageTransform API enables on-the-fly optimisation of images. With the patterns and examples in this guide, AI agents can retrieve and manipulate Contentstack data programmatically.
