# Discovery

This document captures the raw, unfiltered idea or initial AI prompt that sparked the project.

## Starting Prompt

I am building the personal website of Tim Benniks, developer experience lead at Contentstack, to showcase his projects, videos, blog posts, live streams, and provide a way for people to contact him.
The project should be using Nuxt 4 using Nuxt UI (use the context7 MCP to get the documentation for both Nuxt 4 and Nuxt UI).
Please refer to the .vibedocs/assets/styleguide.md for design guidelines and components. The logo can be found in the same folder.
Please feel free to use the images of Tim in the .vibedocs/assets/images folder.
To give the pages their content, please use the timbenniks MCP for videos, articles, talks, career info, about info, and more.
The design should look modern, sleek and can have some animations. It has to be accessibility compliant and fast, however.

** for later **
In a later phase of this project I want to get the information from Contentstack Headless CMS.
To be able to query contentstack, we need an SDK instance and we need to set up live preview.
For a reference on how to do that please already read and understand the instructions here:

- .vibedocs/integrations/contentstack/typescript-delivery-sdk.md
- .vibedocs/integrations/contentstack/live-preview.md

I will provide the necessary API keys and configuration details for Contentstack when we eventually start working on the integration.
For this phase, we will just use the timbenniks MCP to provide the content and focus on the design and layout of the website.

## Q&A

### **_ Initial Clarification Questions _**

**AGENT Q1:** What are the main sections/pages you want on the website? (e.g., Home, About, Blog, Videos, Talks, Projects, Contact, etc.)  
Home
About
Videos
Writing
Speaking
Live streams
Press kit
Projects
Uses

**AGENT Q2:** For the contact functionality, do you want just a contact form, or also links to social media, email, and other ways to reach Tim?  
Links to socials is best.

**AGENT Q3:** Should the website have any interactive features like search, filtering (e.g., filter videos by topic), or user accounts/authentication?  
A list of videos, articles, talks, to filter based on their taxonomy would be amazing. I image we could integrate Algolia in a later stage. Let's focus on the design of the listings first.

**AGENT Q4:** Do you want the videos and live streams to be embedded directly on the site, or just linked to external platforms (YouTube, Twitch, etc.)?  
Let's embed them. The Timbenniks MCP has all the YouTube links in it, so we can use that to embed the videos directly on the site. I do want to use a very light embedding component so the website stays super fast.
Something like this perhaps. We can also do a Vue.js version of something similar.

```js
export class LiteYTEmbed extends HTMLElement {
  constructor() {
    super();
    this.isIframeLoaded = false;
    this.setupDom();
  }
  static get observedAttributes() {
    return ["videoid", "playlistid"];
  }
  connectedCallback() {
    this.addEventListener("pointerover", LiteYTEmbed.warmConnections, {
      once: true,
    });
    this.addEventListener("click", () => this.addIframe());
  }
  get videoId() {
    return encodeURIComponent(this.getAttribute("videoid") || "");
  }
  set videoId(id) {
    this.setAttribute("videoid", id);
  }
  get playlistId() {
    return encodeURIComponent(this.getAttribute("playlistid") || "");
  }
  set playlistId(id) {
    this.setAttribute("playlistid", id);
  }
  get videoTitle() {
    return this.getAttribute("videotitle") || "Video";
  }
  set videoTitle(title) {
    this.setAttribute("videotitle", title);
  }
  get videoPlay() {
    return this.getAttribute("videoPlay") || "Play";
  }
  set videoPlay(name) {
    this.setAttribute("videoPlay", name);
  }
  get videoStartAt() {
    return this.getAttribute("videoStartAt") || "0";
  }
  get autoLoad() {
    return this.hasAttribute("autoload");
  }
  get noCookie() {
    return this.hasAttribute("nocookie");
  }
  get posterQuality() {
    return this.getAttribute("posterquality") || "hqdefault";
  }
  get posterLoading() {
    return this.getAttribute("posterloading") || "lazy";
  }
  get params() {
    return `start=${this.videoStartAt}&${this.getAttribute("params")}`;
  }
  set params(opts) {
    this.setAttribute("params", opts);
  }
  setupDom() {
    const shadowDom = this.attachShadow({ mode: "open" });
    let nonce = "";
    if (window.liteYouTubeNonce) {
      nonce = `nonce="${window.liteYouTubeNonce}"`;
    }
    shadowDom.innerHTML = `
    <style ${nonce}>
      :host {
        contain: content;
        display: block;
        position: relative;
        width: 100%;
        padding-bottom: calc(100% / (16 / 9));
      }
      @media (max-width: 40em) {
        :host([short]) {
          padding-bottom: calc(100% / (9 / 16));
        }
      }
      #frame, #fallbackPlaceholder, iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
      }
      #frame {
        cursor: pointer;
      }
      #fallbackPlaceholder {
        object-fit: cover;
      }
      #frame::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        background-image: linear-gradient(180deg, #111 -20%, transparent 90%);
        height: 60px;
        width: 100%;
        z-index: 1;
      }
      #playButton {
        width: 68px;
        height: 48px;
        background-color: transparent;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24 27 14v20" fill="white"/></svg>');
        z-index: 1;
        border: 0;
        border-radius: inherit;
      }
      #playButton:before {
        content: '';
        border-style: solid;
        border-width: 11px 0 11px 19px;
        border-color: transparent transparent transparent #fff;
      }
      #playButton,
      #playButton:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        cursor: inherit;
      }
      /* Post-click styles */
      .activated {
        cursor: unset;
      }
      #frame.activated::before,
      #frame.activated > #playButton {
        display: none;
      }
    </style>
    <div id="frame">
      <picture>
        <source id="webpPlaceholder" type="image/webp">
        <source id="jpegPlaceholder" type="image/jpeg">
        <img id="fallbackPlaceholder" referrerpolicy="origin" loading="lazy">
      </picture>
      <button id="playButton"></button>
    </div>
  `;
    this.domRefFrame = shadowDom.querySelector("#frame");
    this.domRefImg = {
      fallback: shadowDom.querySelector("#fallbackPlaceholder"),
      webp: shadowDom.querySelector("#webpPlaceholder"),
      jpeg: shadowDom.querySelector("#jpegPlaceholder"),
    };
    this.domRefPlayButton = shadowDom.querySelector("#playButton");
  }
  setupComponent() {
    this.initImagePlaceholder();
    this.domRefPlayButton.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`
    );
    this.setAttribute("title", `${this.videoPlay}: ${this.videoTitle}`);
    if (this.autoLoad || this.isYouTubeShort()) {
      this.initIntersectionObserver();
    }
  }
  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case "videoid":
      case "playlistid":
      case "videoTitle":
      case "videoPlay": {
        if (oldVal !== newVal) {
          this.setupComponent();
          if (this.domRefFrame.classList.contains("activated")) {
            this.domRefFrame.classList.remove("activated");
            this.shadowRoot.querySelector("iframe").remove();
            this.isIframeLoaded = false;
          }
        }
        break;
      }
      default:
        break;
    }
  }
  addIframe(isIntersectionObserver = false) {
    if (!this.isIframeLoaded) {
      let autoplay = isIntersectionObserver ? 0 : 1;
      const wantsNoCookie = this.noCookie ? "-nocookie" : "";
      let embedTarget;
      if (this.playlistId) {
        embedTarget = `?listType=playlist&list=${this.playlistId}&`;
      } else {
        embedTarget = `${this.videoId}?`;
      }
      if (this.isYouTubeShort()) {
        this.params = `loop=1&mute=1&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=${this.videoId}`;
        autoplay = 1;
      }
      const iframeHTML = `
<iframe frameborder="0" title="${this.videoTitle}"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
src="https://www.youtube${wantsNoCookie}.com/embed/${embedTarget}autoplay=${autoplay}&${this.params}"
></iframe>`;
      this.domRefFrame.insertAdjacentHTML("beforeend", iframeHTML);
      this.domRefFrame.classList.add("activated");
      this.isIframeLoaded = true;
      this.attemptShortAutoPlay();
      this.dispatchEvent(
        new CustomEvent("liteYoutubeIframeLoaded", {
          detail: {
            videoId: this.videoId,
          },
          bubbles: true,
          cancelable: true,
        })
      );
    }
  }
  initImagePlaceholder() {
    const posterUrlWebp = `https://i.ytimg.com/vi_webp/${this.videoId}/${this.posterQuality}.webp`;
    const posterUrlJpeg = `https://i.ytimg.com/vi/${this.videoId}/${this.posterQuality}.jpg`;
    this.domRefImg.fallback.loading = this.posterLoading;
    this.domRefImg.webp.srcset = posterUrlWebp;
    this.domRefImg.jpeg.srcset = posterUrlJpeg;
    this.domRefImg.fallback.src = posterUrlJpeg;
    this.domRefImg.fallback.setAttribute(
      "aria-label",
      `${this.videoPlay}: ${this.videoTitle}`
    );
    this.domRefImg?.fallback?.setAttribute(
      "alt",
      `${this.videoPlay}: ${this.videoTitle}`
    );
  }
  initIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isIframeLoaded) {
          LiteYTEmbed.warmConnections();
          this.addIframe(true);
          observer.unobserve(this);
        }
      });
    }, options);
    observer.observe(this);
  }
  attemptShortAutoPlay() {
    if (this.isYouTubeShort()) {
      setTimeout(() => {
        this.shadowRoot
          .querySelector("iframe")
          ?.contentWindow?.postMessage(
            '{"event":"command","func":"' + "playVideo" + '","args":""}',
            "*"
          );
      }, 2000);
    }
  }
  isYouTubeShort() {
    return (
      this.getAttribute("short") === "" &&
      window.matchMedia("(max-width: 40em)").matches
    );
  }
  static addPrefetch(kind, url) {
    const linkElem = document.createElement("link");
    linkElem.rel = kind;
    linkElem.href = url;
    linkElem.crossOrigin = "true";
    document.head.append(linkElem);
  }
  static warmConnections() {
    if (LiteYTEmbed.isPreconnected || window.liteYouTubeIsPreconnected) return;
    LiteYTEmbed.addPrefetch("preconnect", "https://i.ytimg.com/");
    LiteYTEmbed.addPrefetch("preconnect", "https://s.ytimg.com");
    LiteYTEmbed.addPrefetch("preconnect", "https://www.youtube.com");
    LiteYTEmbed.addPrefetch("preconnect", "https://www.google.com");
    LiteYTEmbed.addPrefetch(
      "preconnect",
      "https://googleads.g.doubleclick.net"
    );
    LiteYTEmbed.addPrefetch("preconnect", "https://static.doubleclick.net");
    LiteYTEmbed.isPreconnected = true;
    window.liteYouTubeIsPreconnected = true;
  }
}
LiteYTEmbed.isPreconnected = false;
customElements.define("lite-youtube", LiteYTEmbed);
```

**AGENT Q5:** Should there be a blog/articles section where individual posts can be read in full, or just summaries with links to external sources?  
Yes please.

### **_ Technical Implementation Questions _**

**AGENT Q6:** For the lightweight YouTube embedding, should we create a Vue component based on the LiteYTEmbed code you provided?  
That could work, or make a custom one which essentially lazy loads the read iframe embed so the page remains fast if people do not engage with the player.

**AGENT Q7:** Do you want any specific animations or transitions between pages/sections? (e.g., page transitions, scroll animations, hover effects)  
I like subtle parallax, button shimmers, and smooth scrolling effects.

**AGENT Q8:** Should the website have dark/light mode toggle, or stick to one theme based on the styleguide?  
**USER A8:** Yes, a toggle would be great for accessibility. I've never done this. I'm excited what you make of the styleguide markdown file and how you create a light version of it.
Make sure to use the Nuxt UI components for this, as they have built-in support for light/dark mode. Use the styleguide file as reference to configure Nuxt UI.

## Discovery Summary

Based on our Q&A session, I have a clear understanding of the Tim Benniks personal website project:

**Project Overview:**
Building a modern, sleek personal website for Tim Benniks (Developer Experience Lead at Contentstack) using Nuxt 4 and Nuxt UI as the foundational framework.

**Core Functionality:**

- **Main Sections**: Home, About, Videos, Writing, Speaking, Live streams, Press kit, Projects, Uses
- **Content Source**: Tim Benniks MCP for dynamic content (videos, articles, talks, career info)
- **Contact**: Social media links (no contact form needed)
- **Video Integration**: Lightweight YouTube embedding with lazy loading for performance
- **Content Display**: Full blog/article reading experience with taxonomy-based filtering

**Technical Requirements:**

- **Framework**: Nuxt 4 with Nuxt UI Pro component library (licensed version)
- **Styling**: Custom theme based on provided styleguide.md with brand colors and gradients
- **Performance**: Fast loading, accessibility compliant, lightweight embeds
- **Theming**: Dark/light mode toggle using Nuxt UI's built-in support
- **Animations**: Subtle parallax, button shimmers, smooth scrolling effects
- **Responsive**: Modern, mobile-first design
- **Content Strategy**: Use Tim Benniks MCP to fetch content, then statically render as mock data in pages
- **Data Approach**: Static content rendering for initial phase, future Contentstack CMS integration

**Design System:**

- **Primary Colors**: Deep navy (#1b1d39), dark navy (#0e1029), black, white
- **Accent Colors**: Gradient blue (#256ad1) to pink (#d1258c) brand identity
- **Typography**: Lato font family with Trebuchet MS fallback
- **Layout**: 1400px max-width container, CSS Grid, responsive breakpoints

**Future Integration:**
Phase 2 will integrate Contentstack Headless CMS with SDK and live preview (deferred for now).

**Key Features:**

- Taxonomy-based filtering for content (with future Algolia integration potential)
- Lightweight YouTube video embedding
- Professional press kit section
- Career timeline and speaking engagements showcase
- Personal "Uses" page for tools and setup

The project emphasizes performance, accessibility, and a distinctive brand identity through the blue-to-pink gradient theme while showcasing Tim's expertise in developer experience and content creation.
