# Contentstack Live Preview: Complete Implementation Guide for AI Agents

This comprehensive guide contains everything needed to implement Contentstack's **Live Preview** feature across all frameworks and rendering modes. It is written specifically for AI coding assistants and assumes you can generate and insert code directly into projects. All instructions are self-contained to enable autonomous implementation.

## 1. What is Contentstack Live Preview?

Contentstack's **Live Preview** feature allows content managers to see changes instantly before publishing. When an editor opens an entry, the CMS generates a **Live Preview hash** that identifies the preview session and links the entry editor with the website loaded in an iframe.

The **Live Preview Utils SDK** running on the site uses `postMessage()` events to communicate with the entry editor, fetches the latest content and injects it into the preview panel without reloading. Live Preview works for both client-side rendering (CSR) and server-side rendering (SSR): CSR sites use the SDK to inject updated content into the DOM immediately, whereas SSR sites listen for updates and then reload the page.

Editors can also open the preview in different device sizes and locales to check omnichannel experiences.

## 2. Key Concepts & Components

| Component                  | Description                                                                                                                                                                              | Implementation Notes                                                                                                                       |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Preview token**          | A special API token generated from **Settings → Tokens → Delivery Tokens**. Associated with a delivery token and used to fetch unpublished content.                                      | **Never use management tokens** for Live Preview. Always use preview tokens for security.                                                  |
| **Live Preview hash**      | A session-specific identifier appended to preview URLs. Identifies the editor session and ensures the preview shows the latest unpublished changes.                                      | When hash is present, switch to preview endpoints and include hash + preview token in headers. When absent, use normal delivery endpoints. |
| **Live Preview Utils SDK** | JavaScript library (`@contentstack/live-preview-utils`) that connects the CMS and front-end. Listens for entry-change events, injects content, adds edit buttons and supports edit tags. | Version 3 introduces modes (`preview` vs `builder`), configurable Edit/Start Editing buttons and improved configuration.                   |
| **Live Edit tags**         | Special `data-cslp` attributes pointing to field paths (e.g. `content_type.entry.locale.field`). The SDK reads these to highlight fields and show Edit buttons.                          | Can be added manually or generated automatically with `addEditableTags()`. Essential for field-level editing experience.                   |

## 3. Setup Process Overview

The high-level setup process is consistent across all frameworks:

1. **Enable Live Preview in Contentstack**

   - Navigate to **Settings → Environments**, set base URL for each locale
   - Under **Live Preview**, enable it and choose default preview environment
   - When enabled, an eye icon appears in the entry editor

2. **Generate Preview Token**

   - Go to **Settings → Tokens → Delivery Tokens**
   - Select existing delivery token or create new one
   - Toggle **Create preview token** and copy the token

3. **Configure Your Application**

   - Install required SDKs and dependencies
   - Configure Contentstack SDK with `live_preview` settings
   - Initialize Live Preview Utils SDK with appropriate mode (CSR/SSR)
   - Implement content update handlers

4. **Deploy Securely**
   - Host site on HTTPS domain (required for iframe embedding)
   - Ensure iframe compatibility (disable X-Frame-Options if needed)
   - Test across devices and locales

## 4. Prerequisites Checklist

Before implementing Live Preview, verify:

- [ ] Contentstack **stack** with at least one **environment** exists
- [ ] Live Preview is **enabled** on the stack (Settings → Environments → Live Preview)
- [ ] **Preview token** generated and copied (Settings → Tokens → Delivery Tokens)
- [ ] Website served over **HTTPS** and iframe-compatible
- [ ] Base URLs configured for each locale in environment settings

## 5. Universal Implementation Steps

These steps apply to **all frameworks and rendering modes**:

### Step 1: Install Dependencies

```bash
npm install @contentstack/delivery-sdk @contentstack/live-preview-utils
```

**CRITICAL**: Always use the TypeScript Delivery SDK (`@contentstack/delivery-sdk`) when querying Contentstack!

### Step 2: Configure Contentstack SDK

**Important**: For complete stack initialization details, including region configuration and advanced options, see the [TypeScript Delivery SDK guide](typescript-delivery-sdk.md#1-initializing-a-stack).

Always include `live_preview` configuration when creating your stack instance:

```typescript
import contentstack from "@contentstack/delivery-sdk";

const stack = contentstack.stack({
  // Basic configuration (see typescript-delivery-sdk.md for full options)
  apiKey: "YOUR_API_KEY",
  deliveryToken: "YOUR_DELIVERY_TOKEN",
  environment: "YOUR_ENV",
  region: "YOUR_REGION",

  // Live Preview specific configuration
  live_preview: {
    enable: true,
    preview_token: "YOUR_PREVIEW_TOKEN",
    host: "HOST_FOR_YOUR_REGION", // See Regional Configuration section
  },
});
```

### Step 3: Initialize Live Preview Utils SDK

Call `ContentstackLivePreview.init()` with appropriate configuration:

```typescript
import ContentstackLivePreview from "@contentstack/live-preview-utils";

ContentstackLivePreview.init({
  enable: true,
  ssr: false, // Set to true for SSR, false for CSR
  mode: "preview", // or "builder" for Visual Builder
  stackSdk: stack.config as IStackSdk,
  stackDetails: {
    apiKey: "YOUR_API_KEY",
    environment: "YOUR_ENV",
  },
  editButton: { enable: true }, // Optional: customize edit button
  clientUrlParams: {
    // Optional: for custom regions
    protocol: "https",
    host: "app.contentstack.com", // Use region-specific host
    port: 443,
  },
});
```

### Step 4: Handle Content Updates

Register event handlers for content changes:

- **CSR**: Use `onEntryChange()` to update component state
- **SSR**: Use `onLiveEdit()` and reload page content

### Step 5: Add Live Edit Tags (Recommended)

Choose manual or automatic approach:

**Manual**: Add `data-cslp` attributes to HTML elements

```html
<h1 data-cslp="content_type.entry_uid.locale.field_name">Title</h1>
```

**Automatic**: Use `addEditableTags()` after fetching data

```typescript
import { addEditableTags } from "@contentstack/utils";
addEditableTags(entry, "content_type_uid", true, "en-us"); // true for JSX objects
```

## 6. Rendering Mode Selection Guide

Choose the appropriate mode based on your application architecture:

### Client-Side Rendering (CSR)

- **When to use**: React, Vue, Angular SPAs that render in browser
- **Configuration**: `ssr: false` in Live Preview Utils SDK
- **Update strategy**: Use `onEntryChange()` to update component state immediately
- **Benefits**: Instant updates without page reload

### Server-Side Rendering (SSR)

- **When to use**: Next.js, Nuxt, Express apps that render on server
- **Configuration**: `ssr: true` in Live Preview Utils SDK
- **Update strategy**: Extract hash from query params, refetch data, reload page
- **Important**: Create new SDK instance per request to avoid cross-session data

## 7. Framework-Specific Implementation

### 7.1 GraphQL with Client-Side Rendering (React, Vue, Angular)

**Complete implementation for CSR GraphQL applications:**

```typescript
import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { request } from "graphql-request";

// 1. Configure Contentstack SDK
// Note: See typescript-delivery-sdk.md for complete stack configuration options
const stack = contentstack.stack({
  // Standard configuration
  apiKey: process.env.CONTENTSTACK_API_KEY,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION,

  // Live Preview specific configuration
  live_preview: {
    enable: true,
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    host: "graphql-preview.contentstack.com", // Adjust for your region
  },
});

// 2. Initialize Live Preview Utils SDK
ContentstackLivePreview.init({
  enable: true,
  ssr: false,
  mode: "preview",
  stackSdk: stack.config as IStackSdk,
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
  },
  editButton: { enable: true },
});

// 3. GraphQL request helper with preview detection
const GRAPHQL_HOST = "graphql.contentstack.com";
const PREVIEW_HOST = "graphql-preview.contentstack.com";

async function fetchGraphQL(query: string, variables = {}) {
  const hash = ContentstackLivePreview.hash;
  const isPreview = Boolean(hash);
  const host = isPreview ? PREVIEW_HOST : GRAPHQL_HOST;

  const headers: any = {
    api_key: process.env.CONTENTSTACK_API_KEY,
    access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  };

  if (isPreview) {
    headers.live_preview = hash;
    headers.preview_token = process.env.CONTENTSTACK_PREVIEW_TOKEN;
    headers.include_applied_variants = "true";
  }

  return request(`https://${host}/graphql`, query, variables, headers);
}

// 4. React component example
import React, { useState, useEffect } from "react";

function HomePage() {
  const [entry, setEntry] = useState(null);

  const query = `
    query GetPage($url: String!) {
      allContentstackPage(where: { url: $url }) {
        nodes {
          uid
          title
          url
          __typename
        }
      }
    }
  `;

  async function fetchData() {
    const data = await fetchGraphQL(query, { url: "/" });
    setEntry(data.allContentstackPage.nodes[0]);
  }

  useEffect(() => {
    fetchData();
    ContentstackLivePreview.onEntryChange(fetchData);
  }, []);

  if (!entry) return <div>Loading...</div>;

  return <h1 {...entry.$.title}>{entry.title}</h1>;
}

export default HomePage;
```

### 7.2 GraphQL with Server-Side Rendering (Next.js, Nuxt, Express)

**Complete implementation for SSR GraphQL applications:**

```typescript
// server.js or pages/[...slug].js (Next.js)
import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { request } from "graphql-request";

app.get("*", async (req, res) => {
  // 1. Extract Live Preview hash from query params
  const hash = req.query.live_preview;
  const isPreview = Boolean(hash);

  // 2. Create fresh SDK instance per request
  // Note: See typescript-delivery-sdk.md for complete stack configuration options
  const stack = contentstack.stack({
    // Standard configuration
    apiKey: process.env.CONTENTSTACK_API_KEY,
    deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    region: process.env.CONTENTSTACK_REGION,

    // Live Preview specific configuration
    live_preview: {
      enable: true,
      preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
      host: "graphql-preview.contentstack.com",
    },
  });

  // 3. Initialize Live Preview Utils SDK (client-side script)
  const clientScript = `
    ContentstackLivePreview.init({
      enable: true,
      ssr: true,
      mode: "preview",
      stackSdk: ${JSON.stringify(stack.config)},
      stackDetails: {
        apiKey: "${process.env.CONTENTSTACK_API_KEY}",
        environment: "${process.env.CONTENTSTACK_ENVIRONMENT}",
      },
      editButton: { enable: true },
    });
  `;

  // 4. Fetch data with appropriate host and headers
  const host = isPreview
    ? "graphql-preview.contentstack.com"
    : "graphql.contentstack.com";

  const headers: any = {
    api_key: process.env.CONTENTSTACK_API_KEY,
    access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  };

  if (isPreview) {
    headers.live_preview = hash;
    headers.preview_token = process.env.CONTENTSTACK_PREVIEW_TOKEN;
    headers.include_applied_variants = "true";
  }

  const data = await request(
    `https://${host}/graphql`,
    query,
    variables,
    headers
  );

  // 5. Render template with data and client script
  res.render("template", { data, clientScript });
});
```

### 7.3 REST API Implementation

**Complete implementation for REST-based applications:**

```typescript
import contentstack from "@contentstack/delivery-sdk";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

// 1. Configure Contentstack SDK with REST preview host
// Note: See typescript-delivery-sdk.md for complete stack configuration options
const stack = contentstack.stack({
  // Standard configuration
  apiKey: process.env.CONTENTSTACK_API_KEY,
  deliveryToken: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  environment: process.env.CONTENTSTACK_ENVIRONMENT,
  region: process.env.CONTENTSTACK_REGION,

  // Live Preview specific configuration
  live_preview: {
    enable: true,
    preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN,
    host: "rest-preview.contentstack.com", // REST preview host
  },
});

// 2. Initialize Live Preview Utils SDK
ContentstackLivePreview.init({
  enable: true,
  ssr: false, // Set to true for SSR
  mode: "preview",
  stackSdk: stack.config as IStackSdk,
  stackDetails: {
    apiKey: process.env.CONTENTSTACK_API_KEY,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
  },
  editButton: { enable: true },
});

// 3. Fetch data and handle updates
async function getEntry(contentType: string, entryUid: string) {
  const result = await stack.contentType(contentType).entry(entryUid).fetch();
  return result;
}

// 4. For CSR: Register change handler
ContentstackLivePreview.onEntryChange(async () => {
  const updated = await getEntry("page", "entry_uid");
  // Update your component state with updated data
});

// 5. For SSR: Handle preview hash in server route
app.get("*", async (req, res) => {
  // Create fresh stack instance (see typescript-delivery-sdk.md for full config)
  const stack = contentstack.stack({
    // Include your standard configuration plus live_preview settings
    ...config,
  });

  // Attach preview hash from query params
  stack.livePreviewQuery(req.query);

  const entry = await stack.contentType("page").entry("entry_uid").fetch();

  res.render("template", { entry });
});
```

## 8. Live Edit Tags Implementation

Live Edit tags enable field-level editing by mapping HTML elements to specific content fields in Contentstack.

### 8.1 Manual Tag Implementation

Add `data-cslp` attributes directly to HTML elements:

**Format**: `data-cslp="{content_type_uid}.{entry_uid}.{locale}.{field_uid}"`

```html
<!-- Basic field -->
<h1 data-cslp="page.blt123456789.en-us.title">Welcome!</h1>

<!-- Nested field in modular blocks -->
<div data-cslp="page.blt123456789.en-us.hero_section.hero_block.headline">
  Hero Headline
</div>

<!-- Reference field -->
<img
  data-cslp="page.blt123456789.en-us.featured_image.url"
  src="image.jpg"
  alt="Featured"
/>
```

### 8.2 Automatic Tag Generation

Use `addEditableTags()` from `@contentstack/utils` for automatic tag generation:

```typescript
import { addEditableTags } from "@contentstack/utils";

// After fetching entry data
const entry = await stack.contentType("page").entry("entry_uid").fetch();

// For templating languages (tags as strings)
addEditableTags(entry, "page", false, "en-us");

// For JSX/React (tags as objects to spread)
addEditableTags(entry, "page", true, "en-us");
```

**Usage in React/JSX:**

```jsx
// After calling addEditableTags with tagsAsObject=true
<h1 {...entry.$.title}>{entry.title}</h1>
<img {...entry.$.featured_image.$.url} src={entry.featured_image.url} />
```

**Usage in templating engines:**

```html
<!-- After calling addEditableTags with tagsAsObject=false -->
<h1 {{entry.title.$}}>{{entry.title}}</h1>
```

### 8.3 Advanced Tag Patterns

**Nested modular blocks:**

```typescript
// For modular blocks, tags automatically include block UIDs
addEditableTags(entry, "page", true, "en-us");

// Results in tags like:
// data-cslp="page.entry_uid.en-us.sections.section_1.headline"
```

**Multi-language support:**

```typescript
// Generate tags for different locales
addEditableTags(entryEN, "page", true, "en-us");
addEditableTags(entryFR, "page", true, "fr-fr");
```

## 9. Regional Configuration

Select the correct hosts based on your Contentstack stack's region:

| Region                    | GraphQL Preview Host                        | REST Preview Host                        | App Host                        |
| ------------------------- | ------------------------------------------- | ---------------------------------------- | ------------------------------- |
| **North America (AWS)**   | `graphql-preview.contentstack.com`          | `rest-preview.contentstack.com`          | `app.contentstack.com`          |
| **Europe (AWS)**          | `eu-graphql-preview.contentstack.com`       | `eu-rest-preview.contentstack.com`       | `eu-app.contentstack.com`       |
| **North America (Azure)** | `azure-na-graphql-preview.contentstack.com` | `azure-na-rest-preview.contentstack.com` | `azure-na-app.contentstack.com` |
| **Europe (Azure)**        | `azure-eu-graphql-preview.contentstack.com` | `azure-eu-rest-preview.contentstack.com` | `azure-eu-app.contentstack.com` |
| **North America (GCP)**   | `gcp-na-graphql-preview.contentstack.com`   | `gcp-na-rest-preview.contentstack.com`   | `gcp-na-app.contentstack.com`   |
| **Europe (GCP)**          | `gcp-eu-graphql-preview.contentstack.com`   | `gcp-eu-rest-preview.contentstack.com`   | `gcp-eu-app.contentstack.com`   |

**Note**: For complete region setup including the `@timbenniks/contentstack-endpoints` package, see the [TypeScript Delivery SDK guide](typescript-delivery-sdk.md#simplifying-region-and-endpoint-configuration).

**Usage example:**

```typescript
// For EU region (see typescript-delivery-sdk.md for complete setup)
const stack = contentstack.stack({
  // Standard configuration (region, apiKey, etc.)

  // Live Preview specific configuration
  live_preview: {
    enable: true,
    preview_token: "YOUR_PREVIEW_TOKEN",
    host: "eu-rest-preview.contentstack.com", // EU-specific host
  },
});

ContentstackLivePreview.init({
  // ... other config
  clientUrlParams: {
    protocol: "https",
    host: "eu-app.contentstack.com", // EU-specific app host
    port: 443,
  },
});
```

## 10. Migration & Advanced Features

### 10.1 Migrating from Content Management API

If upgrading from the old CMA-based Live Preview:

1. **Update API endpoints:**

   - REST: Change from `api.contentstack.io` to `rest-preview.contentstack.com`
   - GraphQL: Change from `graphql.contentstack.com` to `graphql-preview.contentstack.com`

2. **Replace management token with preview token**
3. **Update headers:**

   ```typescript
   // Old approach (CMA)
   headers: {
     authorization: "Bearer MANAGEMENT_TOKEN",
     api_key: "API_KEY"
   }

   // New approach (Preview Service)
   headers: {
     api_key: "API_KEY",
     access_token: "DELIVERY_TOKEN",
     preview_token: "PREVIEW_TOKEN", // Only when hash present
     live_preview: "HASH_VALUE" // Only when hash present
   }
   ```

### 10.2 SDK Version Features

**Version 3 Features:**

- `mode` property: `"preview"` for Live Preview, `"builder"` for Visual Builder
- Enhanced edit button configurations
- `cleanCslpOnProduction` option to remove tags in production
- Improved event handling and error reporting

```typescript
ContentstackLivePreview.init({
  enable: true,
  mode: "preview", // or "builder"
  cleanCslpOnProduction: true, // Remove tags in production
  editButton: {
    enable: true,
    position: "top-right", // top, bottom, left, right, etc.
    includeByQueryParameter: false,
  },
});
```

### 10.3 Event-Based Communication

The SDK uses several key events for communication:

```typescript
// Listen for initialization acknowledgment
ContentstackLivePreview.on("init-ack", () => {
  console.log("Live Preview initialized");
});

// Listen for content updates
ContentstackLivePreview.on("client-data-send", (data) => {
  console.log("Content updated:", data);
});

// Custom event handling
ContentstackLivePreview.onEntryChange(() => {
  // Refetch and update content
});

ContentstackLivePreview.onLiveEdit(() => {
  // Handle live editing events
});
```

## 11. Troubleshooting & Best Practices

### 11.1 Common Issues

**Issue**: Preview not working

- **Check**: HTTPS enabled, iframe embedding allowed
- **Check**: Correct preview token and region hosts
- **Check**: Live Preview enabled in Contentstack settings

**Issue**: Content not updating

- **Check**: Event handlers registered correctly
- **Check**: Hash detection working (`ContentstackLivePreview.hash`)
- **Check**: Fresh SDK instances for SSR

**Issue**: Edit buttons not appearing

- **Check**: Live Edit tags present and correctly formatted
- **Check**: `editButton.enable` set to `true`
- **Check**: SDK initialized on client side

### 11.2 Best Practices

1. **Security**: Never expose preview tokens in client-side code for production
2. **Performance**: Avoid caching preview responses
3. **Testing**: Test across different devices and locales
4. **Error Handling**: Implement fallbacks for when Live Preview fails
5. **SEO**: Ensure Live Preview doesn't affect production SEO

### 11.3 Development Tips

- Use environment variables for all tokens and configuration
- Test both published and unpublished content scenarios
- Implement loading states during content updates
- Use browser dev tools to debug `postMessage` events
- Monitor console for Live Preview SDK error messages

## 12. Complete Implementation Checklist

Use this checklist to ensure complete Live Preview implementation:

### Contentstack Configuration

- [ ] Live Preview enabled in stack settings
- [ ] Base URLs configured for all locales
- [ ] Preview token generated and secured
- [ ] Content types have required fields (`uid`, `__typename` for GraphQL)

### Application Setup

- [ ] Correct SDKs installed (`@contentstack/delivery-sdk`, `@contentstack/live-preview-utils`)
- [ ] Contentstack SDK configured with `live_preview` object
- [ ] Live Preview Utils SDK initialized with correct SSR/CSR mode
- [ ] Regional hosts configured correctly

### Content Fetching

- [ ] Preview hash detection implemented
- [ ] API endpoints switch between normal and preview based on hash
- [ ] Headers include preview token and hash when in preview mode
- [ ] Fresh SDK instances created for each SSR request

### Event Handling

- [ ] `onEntryChange()` or `onLiveEdit()` handlers registered
- [ ] Content refetching and UI updates implemented
- [ ] Error handling for failed updates

### Live Edit Tags

- [ ] Tags added manually or via `addEditableTags()`
- [ ] Tag format correct: `content_type.entry.locale.field`
- [ ] Nested field tags implemented for modular blocks
- [ ] JSX object spreading implemented for React

### Testing & Deployment

- [ ] HTTPS deployment working
- [ ] Iframe embedding functional
- [ ] Cross-device and locale testing completed
- [ ] Edit buttons appearing and functional
- [ ] Content updates working in real-time

This comprehensive guide provides everything needed to implement Contentstack Live Preview across any framework or rendering mode. Follow the framework-specific sections and use the checklist to ensure complete implementation.
