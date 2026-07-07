/* @ds-bundle: {"format":3,"namespace":"HealthEquityDesignSystem_4d7359","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Wayfinder","sourcePath":"components/brand/Wayfinder.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"QuoteCard","sourcePath":"components/cards/QuoteCard.jsx"},{"name":"StatCard","sourcePath":"components/cards/StatCard.jsx"},{"name":"EmailButton","sourcePath":"components/email/EmailButton.jsx"},{"name":"EmailFooter","sourcePath":"components/email/EmailFooter.jsx"},{"name":"EmailHero","sourcePath":"components/email/EmailHero.jsx"},{"name":"EmailListModule","sourcePath":"components/email/EmailListModule.jsx"},{"name":"EmailModule","sourcePath":"components/email/EmailModule.jsx"},{"name":"Avatar","sourcePath":"components/feedback/Avatar.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Tabs","sourcePath":"components/feedback/Tabs.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"4bcf11cbfaec","components/brand/Wayfinder.jsx":"f1c7cdd7955b","components/buttons/Button.jsx":"34dc49aac105","components/cards/Card.jsx":"32ae2f46550d","components/cards/QuoteCard.jsx":"0e4b2a068f42","components/cards/StatCard.jsx":"b0d5bca3bbee","components/email/EmailButton.jsx":"f202115a225b","components/email/EmailFooter.jsx":"8a1aced5dd31","components/email/EmailHero.jsx":"9c09dd9ba711","components/email/EmailListModule.jsx":"028b0b6c46eb","components/email/EmailModule.jsx":"ea21de86eb7b","components/feedback/Avatar.jsx":"3b38d05e00e5","components/feedback/Badge.jsx":"2e1de5a39e1d","components/feedback/ProgressBar.jsx":"8d2872e2e720","components/feedback/Tabs.jsx":"9daf07546bfb","components/forms/Input.jsx":"371dcd5084c0","components/forms/Slider.jsx":"8478de243a5e","components/icons/Icon.jsx":"c53feb98db8e","ui_kits/email/screens.jsx":"759869948596","ui_kits/member-portal/screens.jsx":"7eb5038aed7e","ui_kits/social/posts.jsx":"0a7517ed4809"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HealthEquityDesignSystem_4d7359 = window.HealthEquityDesignSystem_4d7359 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HealthEquity wordmark. Use the white logo on purple/dark/photographic
 * backgrounds and the purple logo on light surfaces. The SVGs ship in
 * assets/logos. This component swaps the asset by `variant` and lets you
 * size by height.
 */
function Logo({
  variant = 'purple',
  height = 28,
  assetBase = '',
  style,
  ...rest
}) {
  const file = variant === 'white' ? 'healthequity-white.svg' : 'healthequity-purple.svg';
  const src = `${assetBase}assets/logos/${file}`;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: src,
    alt: "HealthEquity",
    style: {
      height,
      width: 'auto',
      display: 'block',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wayfinder.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wayfinder — HealthEquity's signature directional graphic.
 * A rightward-pointing chevron communicating forward energy, progress
 * and momentum. Always points right. Never outlined. Fill with a brand
 * color or an approved gradient. Use it as a standalone banner, a frame
 * around imagery/text, or an interactivity cue.
 *
 * Geometry: a rounded-corner body (12pt radius) with a 45° triangular
 * point on the right edge.
 */
function Wayfinder({
  children,
  fill = 'gradient',
  // 'gradient' | 'solid' | 'cyan' | 'dark' | any CSS color
  height = 96,
  width = '100%',
  pointDepth,
  // px depth of the arrow point; defaults to height * 0.62
  radius = 12,
  align = 'left',
  // text alignment of children
  style,
  contentStyle,
  ...rest
}) {
  const fills = {
    gradient: 'var(--hqy-gradient-wayfinder)',
    solid: 'var(--hqy-purple)',
    cyan: 'var(--hqy-cyan)',
    dark: 'var(--hqy-dark-purple)',
    light: 'var(--hqy-light-purple)'
  };
  const background = fills[fill] || fill;
  const depth = pointDepth != null ? pointDepth : Math.round((typeof height === 'number' ? height : 96) * 0.62);

  // Body fills the left; the point is the rightmost `depth` px.
  const clip = `polygon(0 0, calc(100% - ${depth}px) 0, 100% 50%, calc(100% - ${depth}px) 100%, 0 100%)`;
  const isDarkText = fill === 'cyan' || fill === 'light';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width,
      height,
      background,
      clipPath: clip,
      borderTopLeftRadius: radius,
      borderBottomLeftRadius: radius,
      display: 'flex',
      alignItems: 'center',
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), children != null && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 28,
      paddingRight: depth + 16,
      color: isDarkText ? 'var(--hqy-black)' : 'var(--hqy-white)',
      font: 'var(--weight-roman) 22px/1.1 var(--font-sans)',
      letterSpacing: '-0.02em',
      textAlign: align,
      ...contentStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Wayfinder });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wayfinder.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * HealthEquity Button.
 * The brand's primary CTA is a solid black pill with white text.
 * Purple is the brand action; outline/ghost for lower emphasis.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 18px',
      font: '14px'
    },
    md: {
      padding: '13px 28px',
      font: '16px'
    },
    lg: {
      padding: '17px 38px',
      font: '18px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--hqy-black)',
      color: 'var(--hqy-white)',
      border: '1px solid var(--hqy-black)'
    },
    brand: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)',
      border: '1px solid var(--hqy-purple)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--hqy-black)',
      border: '1px solid var(--hqy-black)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--hqy-purple)',
      border: '1px solid transparent'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      width: fullWidth ? '100%' : 'auto',
      padding: s.padding,
      font: `var(--weight-medium) ${s.font}/1 var(--font-sans)`,
      letterSpacing: '-0.01em',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transition: 'transform .12s ease, filter .15s ease, opacity .15s ease',
      whiteSpace: 'nowrap',
      ...v,
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.filter = 'none';
    },
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(1.12)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. 12pt rounded corners are the brand default.
 * tone: 'surface' (white), 'muted' (off-white), 'brand' (solid purple),
 * 'gradient' (approved gradient), 'dark' (near-black).
 */
function Card({
  children,
  tone = 'surface',
  gradient = 'var(--hqy-gradient-3)',
  padding = 28,
  radius = 12,
  shadow = true,
  style,
  ...rest
}) {
  const tones = {
    surface: {
      background: 'var(--hqy-white)',
      color: 'var(--hqy-black)',
      border: '1px solid var(--border-subtle)'
    },
    muted: {
      background: 'var(--hqy-gray)',
      color: 'var(--hqy-black)',
      border: 'none'
    },
    brand: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)',
      border: 'none'
    },
    dark: {
      background: 'var(--hqy-black)',
      color: 'var(--hqy-white)',
      border: 'none'
    },
    gradient: {
      background: gradient,
      color: 'var(--hqy-white)',
      border: 'none'
    }
  };
  const t = tones[tone] || tones.surface;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderRadius: radius,
      padding,
      boxShadow: shadow && tone === 'surface' ? 'var(--shadow-md)' : 'none',
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/QuoteCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Member testimonial card — large quotation mark, quote in big sans,
 * attribution with a small avatar. Default on a purple gradient surface.
 */
function QuoteCard({
  quote,
  name,
  role = 'HealthEquity member*',
  tone = 'gradient',
  gradient = 'var(--hqy-gradient-3)',
  style,
  ...rest
}) {
  const dark = tone === 'gradient' || tone === 'brand' || tone === 'dark';
  const bg = tone === 'gradient' ? gradient : tone === 'brand' ? 'var(--hqy-purple)' : tone === 'dark' ? 'var(--hqy-black)' : 'var(--hqy-white)';
  const fg = dark ? 'var(--hqy-white)' : 'var(--hqy-black)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      color: fg,
      borderRadius: 12,
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      border: dark ? 'none' : '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 56px/0.7 var(--font-serif)',
      fontStyle: 'italic'
    }
  }, "\u201C"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--weight-roman) 26px/1.25 var(--font-sans)',
      letterSpacing: '-0.02em',
      flex: 1
    }
  }, quote), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: dark ? 'rgba(255,255,255,0.16)' : 'var(--hqy-gray)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: fg,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 4-6 8-6s8 2 8 6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1.2 var(--font-sans)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 14px/1.2 var(--font-sans)'
    }
  }, role))));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — a large figure (e.g. a dollar amount or savings) with a
 * label above and supporting copy below. The big number is the focal point.
 */
function StatCard({
  value,
  label,
  caption,
  tone = 'surface',
  accent = 'var(--hqy-purple)',
  style,
  ...rest
}) {
  const dark = tone === 'brand' || tone === 'dark';
  const bg = tone === 'brand' ? 'var(--hqy-purple)' : tone === 'dark' ? 'var(--hqy-black)' : tone === 'muted' ? 'var(--hqy-gray)' : 'var(--hqy-white)';
  const fg = dark ? 'var(--hqy-white)' : 'var(--hqy-black)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      color: fg,
      borderRadius: 12,
      padding: 28,
      border: tone === 'surface' ? '1px solid var(--border-subtle)' : 'none',
      boxShadow: tone === 'surface' ? 'var(--shadow-md)' : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1.2 var(--font-sans)',
      letterSpacing: '-0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 64px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: dark ? 'var(--hqy-white)' : 'var(--hqy-black)'
    }
  }, value), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1.4 var(--font-sans)',
      opacity: 0.8,
      marginTop: 4
    }
  }, caption));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/email/EmailButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmailButton — HealthEquity email CTA.
 * Primary = filled pill (50px tall, fully rounded). Tertiary = inline text
 * link with a trailing arrow. Email uses Helvetica; CTAs are bold.
 */
function EmailButton({
  children,
  variant = 'primary',
  // 'primary' | 'tertiary'
  color = 'black',
  // primary: 'black' | 'purple' | 'white'  ·  tertiary: 'black' | 'white'
  href = '#',
  style,
  ...rest
}) {
  const font = {
    fontFamily: 'var(--font-email)',
    fontWeight: 700,
    letterSpacing: '-0.005em'
  };
  if (variant === 'tertiary') {
    const fg = color === 'white' ? 'var(--hqy-white)' : 'var(--hqy-black)';
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: {
        ...font,
        fontSize: 18,
        lineHeight: 1.4,
        color: fg,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style
      }
    }, rest), children, " ", /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2192"));
  }
  const fills = {
    black: {
      background: 'var(--hqy-black)',
      color: 'var(--hqy-white)'
    },
    purple: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)'
    },
    white: {
      background: 'var(--hqy-white)',
      color: 'var(--hqy-black)'
    }
  };
  const c = fills[color] || fills.black;
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      ...font,
      fontSize: 18,
      lineHeight: 1.4,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 47px',
      borderRadius: 360,
      textDecoration: 'none',
      ...c,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { EmailButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/email/EmailButton.jsx", error: String((e && e.message) || e) }); }

// components/email/EmailFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmailFooter — HealthEquity email footer. Black module with nav links
 * (each with a trailing arrow + divider), legal/compliance text, copyright,
 * mailing address, "View on web", and social icons. assetBase reaches the
 * project root from the page so the social SVGs resolve.
 */
function EmailFooter({
  links = [{
    label: 'My Account',
    href: '#'
  }, {
    label: 'Content Library',
    href: '#'
  }, {
    label: 'Support',
    href: '#'
  }],
  assetBase = '',
  year = 2026,
  address = '15 Scenic Pointe Dr., Ste 400 Draper, UT 84020 US',
  style,
  ...rest
}) {
  const legal = {
    fontFamily: 'var(--font-email)',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.85)',
    margin: 0
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      maxWidth: 600,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-email)',
      background: 'var(--hqy-black)',
      color: 'var(--hqy-white)',
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.3)',
      textDecoration: 'none',
      color: 'var(--hqy-white)',
      fontFamily: 'var(--font-email)',
      fontWeight: 400,
      fontSize: 24,
      letterSpacing: '-0.01em'
    }
  }, /*#__PURE__*/React.createElement("span", null, l.label), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: legal
  }, "HealthEquity does not provide legal, tax or financial advice."), /*#__PURE__*/React.createElement("p", {
    style: legal
  }, "To unsubscribe or change your email preferences, click here."), /*#__PURE__*/React.createElement("p", {
    style: legal
  }, "HealthEquity respects your privacy. To learn more, read our privacy policy."), /*#__PURE__*/React.createElement("p", {
    style: legal
  }, "Copyright \xA9", year, " HealthEquity, Inc. All rights reserved."), /*#__PURE__*/React.createElement("p", {
    style: legal
  }, address), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      ...legal,
      color: 'var(--hqy-white)',
      textDecoration: 'underline'
    }
  }, "View on web")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "Facebook"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}assets/email/social-facebook.svg`,
    alt: "Facebook",
    style: {
      height: 32,
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "LinkedIn"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${assetBase}assets/email/social-linkedin.svg`,
    alt: "LinkedIn",
    style: {
      height: 32,
      display: 'block'
    }
  }))));
}
Object.assign(__ds_scope, { EmailFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/email/EmailFooter.jsx", error: String((e && e.message) || e) }); }

// components/email/EmailHero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmailHero — top module of an email: optional image, heading, paragraph
 * and a CTA. Dark-purple by default (the brand's hero treatment), centered.
 */
function EmailHero({
  image,
  heading,
  paragraph,
  cta,
  // { label, href, color } or null
  tone = 'dark',
  align = 'center',
  style,
  ...rest
}) {
  const dark = tone === 'dark' || tone === 'purple' || tone === 'black';
  const bg = tone === 'purple' ? 'var(--hqy-purple)' : tone === 'black' ? 'var(--hqy-black)' : tone === 'white' ? 'var(--hqy-white)' : 'var(--hqy-dark-purple)';
  const fg = dark ? 'var(--hqy-white)' : 'var(--hqy-black)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      maxWidth: 600,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-email)',
      background: bg,
      color: fg,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      padding: '40px 32px',
      ...style
    }
  }, rest), image && /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: "",
    style: {
      width: '100%',
      borderRadius: 12,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-email)',
      fontWeight: 700,
      fontSize: 42,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    }
  }, heading), paragraph && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-email)',
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      opacity: dark ? 0.92 : 1,
      maxWidth: 460
    }
  }, paragraph), cta && /*#__PURE__*/React.createElement("a", {
    href: cta.href || '#',
    style: {
      fontFamily: 'var(--font-email)',
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 1.4,
      letterSpacing: '-0.005em',
      textDecoration: 'none',
      marginTop: 4,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px 47px',
      borderRadius: 360,
      background: cta.color === 'white' || dark ? 'var(--hqy-white)' : 'var(--hqy-black)',
      color: cta.color === 'white' || dark ? 'var(--hqy-black)' : 'var(--hqy-white)'
    }
  }, cta.label));
}
Object.assign(__ds_scope, { EmailHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/email/EmailHero.jsx", error: String((e && e.message) || e) }); }

// components/email/EmailListModule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmailListModule — a numbered or icon list, often on dark-purple with
 * light-purple numerals (as seen in the 1·2·3 step module). Each item is
 * { title, text }.
 */
function EmailListModule({
  heading,
  items = [],
  tone = 'dark',
  // 'dark' | 'purple' | 'white'
  markerColor,
  // override numeral/marker color
  style,
  ...rest
}) {
  const dark = tone === 'dark' || tone === 'purple';
  const bg = tone === 'purple' ? 'var(--hqy-purple)' : tone === 'white' ? 'var(--hqy-white)' : 'var(--hqy-dark-purple)';
  const fg = dark ? 'var(--hqy-white)' : 'var(--hqy-black)';
  const marker = markerColor || 'var(--hqy-light-purple)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      maxWidth: 600,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-email)',
      background: bg,
      color: fg,
      padding: 40,
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      ...style
    }
  }, rest), heading && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: 24,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    }
  }, heading), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      fontFamily: 'var(--font-email)',
      fontWeight: 700,
      fontSize: 48,
      lineHeight: 1,
      letterSpacing: '-0.04em',
      color: marker,
      minWidth: 40
    }
  }, i + 1), /*#__PURE__*/React.createElement("div", null, it.title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 18,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      marginBottom: 4
    }
  }, it.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: '-0.01em',
      opacity: dark ? 0.9 : 1
    }
  }, it.text)))));
}
Object.assign(__ds_scope, { EmailListModule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/email/EmailListModule.jsx", error: String((e && e.message) || e) }); }

// components/email/EmailModule.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * EmailModule — the building block of a HealthEquity email. A full-width
 * (600px) block with consistent padding. Stack modules vertically to
 * compose an email. Tones mirror the system: white surfaces and
 * dark-purple feature blocks, alternating for rhythm.
 */
function EmailModule({
  children,
  tone = 'white',
  // 'white' | 'purple' | 'dark' | 'muted' | 'black'
  align = 'left',
  // 'left' | 'center'
  padding = 40,
  style,
  ...rest
}) {
  const tones = {
    white: {
      background: 'var(--hqy-white)',
      color: 'var(--hqy-black)'
    },
    muted: {
      background: 'var(--hqy-gray)',
      color: 'var(--hqy-black)'
    },
    purple: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)'
    },
    dark: {
      background: 'var(--hqy-dark-purple)',
      color: 'var(--hqy-white)'
    },
    black: {
      background: 'var(--hqy-black)',
      color: 'var(--hqy-white)'
    }
  };
  const t = tones[tone] || tones.white;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      maxWidth: 600,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-email)',
      padding,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { EmailModule });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/email/EmailModule.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — initials or icon in a circle. Brand purple by default.
 */
function Avatar({
  name = '',
  src,
  size = 40,
  tone = 'purple',
  style,
  ...rest
}) {
  const tones = {
    purple: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)'
    },
    light: {
      background: 'var(--hqy-light-purple)',
      color: 'var(--hqy-black)'
    },
    neutral: {
      background: 'var(--hqy-gray)',
      color: 'var(--hqy-black)'
    }
  };
  const t = tones[tone] || tones.purple;
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flex: 'none',
      font: `var(--weight-medium) ${Math.round(size * 0.38)}px/1 var(--font-sans)`,
      letterSpacing: '-0.01em',
      ...t,
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials || /*#__PURE__*/React.createElement("svg", {
    width: size * 0.5,
    height: size * 0.5,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c0-4 4-6 8-6s8 2 8 6"
  })));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small status / category label. Filled by default; quiet supporting role.
 */
function Badge({
  children,
  tone = 'purple',
  style,
  ...rest
}) {
  const tones = {
    purple: {
      background: 'var(--hqy-purple)',
      color: 'var(--hqy-white)'
    },
    light: {
      background: 'var(--hqy-light-purple)',
      color: 'var(--hqy-black)'
    },
    cyan: {
      background: 'var(--hqy-cyan)',
      color: 'var(--hqy-black)'
    },
    teal: {
      background: 'var(--hqy-teal)',
      color: 'var(--hqy-white)'
    },
    neutral: {
      background: 'var(--hqy-gray)',
      color: 'var(--hqy-black)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--hqy-purple)',
      boxShadow: 'inset 0 0 0 1px var(--hqy-purple)'
    }
  };
  const t = tones[tone] || tones.purple;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      font: 'var(--weight-medium) 13px/1 var(--font-sans)',
      letterSpacing: '-0.01em',
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Thin progress bar — purple fill on a muted track, fully rounded. */
function ProgressBar({
  value = 0,
  max = 100,
  height = 10,
  tone = 'purple',
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = tone === 'cyan' ? 'var(--hqy-cyan)' : tone === 'gradient' ? 'var(--hqy-gradient-1)' : 'var(--hqy-purple)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      height,
      borderRadius: 999,
      background: 'var(--hqy-gray)',
      overflow: 'hidden',
      ...style
    },
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 999,
      background: fill,
      transition: 'width .4s ease'
    }
  }));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Underline tabs — purple active indicator, generous spacing.
 * Controlled via `value` + `onChange`.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style,
  ...rest
}) {
  const active = value != null ? value : tabs[0] && tabs[0].id;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 32,
      borderBottom: '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => onChange && onChange(t.id),
      style: {
        appearance: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0 0 14px',
        position: 'relative',
        font: `${on ? 'var(--weight-medium)' : 'var(--weight-roman)'} 16px/1 var(--font-sans)`,
        letterSpacing: '-0.01em',
        color: on ? 'var(--hqy-black)' : 'var(--hqy-black)',
        transition: 'color .15s ease'
      }
    }, t.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 3,
        borderRadius: 3,
        background: on ? 'var(--hqy-purple)' : 'transparent'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with optional label. Clean, generous padding, 8pt corners,
 * purple focus ring.
 */
function Input({
  label,
  hint,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 14px/1.2 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      font: 'var(--weight-roman) 16px/1.4 var(--font-sans)',
      color: 'var(--hqy-black)',
      background: disabled ? 'var(--hqy-gray)' : 'var(--hqy-white)',
      border: `1px solid ${focus ? 'var(--hqy-purple)' : 'var(--border-subtle)'}`,
      boxShadow: focus ? '0 0 0 3px rgba(192,76,255,0.25)' : 'none',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      outline: 'none',
      transition: 'border-color .15s ease, box-shadow .15s ease',
      ...style
    }
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-roman) 13px/1.3 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Brand slider — light-purple track, light-purple filled portion and a
 * solid purple thumb. Mirrors the "Hit your max" contribution slider.
 */
function Slider({
  value = 50,
  min = 0,
  max = 100,
  onChange,
  style,
  ...rest
}) {
  const pct = (value - min) / (max - min) * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: 28,
      display: 'flex',
      alignItems: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 10,
      borderRadius: 999,
      background: 'rgba(192,76,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 10,
      borderRadius: 999,
      background: 'var(--hqy-light-purple)'
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    type: "range",
    value: value,
    min: min,
    max: max,
    onChange: e => onChange && onChange(Number(e.target.value)),
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      width: '100%',
      margin: 0,
      appearance: 'none',
      WebkitAppearance: 'none',
      background: 'transparent',
      height: 28,
      cursor: 'pointer'
    }
  }, rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `calc(${pct}% - 13px)`,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'var(--hqy-light-purple)',
      boxShadow: '0 2px 6px rgba(79,41,132,0.35)',
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon — HealthEquity's icon system, built on Google Material Symbols (Rounded).
 * Pass the Material Symbol name (e.g. "savings", "account_balance_wallet",
 * "arrow_forward"). Browse names at https://fonts.google.com/icons.
 *
 * The Material Symbols Rounded font is loaded globally from tokens/fonts.css.
 * Defaults match the brand's clean, light-stroke feel (weight 300, unfilled).
 * Icons inherit `color` from their parent (currentColor), so set color on a
 * wrapper or via the `color` prop.
 */
function Icon({
  name,
  size = 24,
  weight = 300,
  // 100–700; brand default is light (300)
  fill = false,
  // filled vs outlined
  grade = 0,
  // -25 (thin) … 200 (bold) optical grade
  color,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "hqy-icon",
    "aria-hidden": rest['aria-label'] ? undefined : true,
    style: {
      fontFamily: "'Material Symbols Rounded'",
      fontSize: size,
      lineHeight: 1,
      color: color,
      fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${Math.min(48, Math.max(20, size))}`,
      userSelect: 'none',
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/email/screens.jsx
try { (() => {
/* global React */
// HealthEquity email — UI kit. Composes the email components into a full,
// realistic HSA marketing email at the standard 600px column width.
const DS = window.HealthEquityDesignSystem_4d7359;
const {
  EmailButton,
  EmailModule,
  EmailHero,
  EmailListModule,
  EmailFooter
} = DS;
const ROOT = '../../';
function PreheaderBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--hqy-gray)',
      color: 'var(--hqy-black)',
      fontFamily: 'var(--font-email)',
      fontSize: 12,
      textAlign: 'center',
      padding: '10px 16px',
      maxWidth: 600,
      boxSizing: 'border-box',
      width: '100%'
    }
  }, "Make the most of your HSA before year-end.");
}
function LogoBar() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--hqy-white)',
      maxWidth: 600,
      width: '100%',
      boxSizing: 'border-box',
      padding: '24px 40px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ROOT + 'assets/logos/healthequity-purple.svg',
    alt: "HealthEquity",
    style: {
      height: 24
    }
  }));
}
function StatModule() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--hqy-white)',
      maxWidth: 600,
      width: '100%',
      boxSizing: 'border-box',
      padding: 40,
      fontFamily: 'var(--font-email)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.02em'
    }
  }, "Your tax savings this year"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 56,
      letterSpacing: '-0.04em',
      color: 'var(--hqy-light-purple)'
    }
  }, "$1,257.56"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--hqy-black)',
      maxWidth: 440
    }
  }, "Every dollar you contribute to your HSA is a dollar that grows tax-free. Keep going to hit your annual max."), /*#__PURE__*/React.createElement(EmailButton, {
    color: "black"
  }, "Contribute now"));
}
function EmailKit() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: '#e6e6e9',
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 600,
      boxShadow: '0 12px 40px rgba(49,14,110,0.16)',
      overflow: 'hidden',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(PreheaderBar, null), /*#__PURE__*/React.createElement(LogoBar, null), /*#__PURE__*/React.createElement(EmailHero, {
    image: ROOT + 'assets/email/hero-photo.jpg',
    heading: "Take control of your health.",
    paragraph: "Your HSA helps you save, spend, and invest for health \u2014 all with powerful tax advantages.",
    cta: {
      label: 'Get started',
      href: '#'
    }
  }), /*#__PURE__*/React.createElement(StatModule, null), /*#__PURE__*/React.createElement(EmailListModule, {
    heading: "Three ways to grow your HSA",
    items: [{
      title: 'Contribute pre-tax',
      text: 'Lower your taxable income with every contribution from your paycheck.'
    }, {
      title: 'Spend on care',
      text: 'Use your HealthEquity card for qualified medical expenses, tax-free.'
    }, {
      title: 'Invest the rest',
      text: 'Put your balance to work and let it grow for the future, tax-free.'
    }]
  }), /*#__PURE__*/React.createElement(EmailModule, {
    tone: "muted",
    align: "center"
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontWeight: 700,
      fontSize: 24,
      letterSpacing: '-0.02em',
      textAlign: 'center'
    }
  }, "Questions about your account?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.5,
      color: 'var(--hqy-black)',
      textAlign: 'center',
      maxWidth: 440
    }
  }, "Our member services team is here to help you make the most of your benefits."), /*#__PURE__*/React.createElement(EmailButton, {
    variant: "tertiary",
    color: "black"
  }, "Visit the Help Center")), /*#__PURE__*/React.createElement(EmailFooter, {
    assetBase: ROOT
  })));
}
window.EmailKit = EmailKit;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/email/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/member-portal/screens.jsx
try { (() => {
/* global React */
// HealthEquity member portal — UI kit screens.
// Composes the design-system components from the compiled bundle.
const DS = window.HealthEquityDesignSystem_4d7359;
const {
  Button,
  Card,
  QuoteCard,
  StatCard,
  Wayfinder,
  Badge,
  Slider,
  ProgressBar,
  Tabs,
  Avatar,
  Logo
} = DS;
const ROOT = '../../'; // reach project root from ui_kits/member-portal/

// ---- Small inline icons (stroke, matching the brand's clean line style) ----
function Icon({
  d,
  size = 20,
  fill = false,
  stroke = 'currentColor'
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: fill ? stroke : 'none',
    stroke: fill ? 'none' : stroke,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, Array.isArray(d) ? d.map((p, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: p
  })) : /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
const ICONS = {
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
  invest: ['M4 19V5M4 19h16', 'M8 16l3-4 3 2 4-6'],
  claims: ['M9 3h6a2 2 0 012 2v14l-3-2-2 2-2-2-2 2-2-2V5a2 2 0 012-2z', 'M9 8h6M9 12h6'],
  card: ['M3 7h18v10H3z', 'M3 11h18'],
  bell: ['M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 01-3.4 0'],
  plus: 'M12 5v14M5 12h14',
  arrow: 'M5 12h14M13 6l6 6-6 6'
};

// ---- Top navigation ----
function TopNav({
  active,
  onNav,
  name
}) {
  const items = [{
    id: 'home',
    label: 'Overview',
    icon: 'home'
  }, {
    id: 'invest',
    label: 'Investments',
    icon: 'invest'
  }, {
    id: 'claims',
    label: 'Claims',
    icon: 'claims'
  }, {
    id: 'card',
    label: 'Card & spending',
    icon: 'card'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: '18px 40px',
      background: '#fff',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ROOT + 'assets/logos/healthequity-purple.svg',
    alt: "HealthEquity",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 1
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNav(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 16px',
        borderRadius: 999,
        border: 'none',
        cursor: 'pointer',
        background: on ? 'var(--hqy-gray)' : 'transparent',
        color: on ? 'var(--hqy-black)' : 'var(--hqy-black)',
        font: 'var(--weight-roman) 15px/1 var(--font-sans)',
        letterSpacing: '-0.01em'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS[it.icon],
      size: 18
    }), " ", it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--hqy-black)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.bell
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name,
    size: 36
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--weight-medium) 15px/1 var(--font-sans)'
    }
  }, name.split(' ')[0]))));
}

// ---- Overview screen ----
function Overview({
  contribution,
  setContribution
}) {
  const max = 4300;
  const pct = Math.round(contribution / max * 100);
  const activity = [{
    merchant: 'Mountain View Pharmacy',
    cat: 'Prescription',
    amount: '-$48.20',
    date: 'Jun 14',
    tone: 'neutral'
  }, {
    merchant: 'Contribution — payroll',
    cat: 'Deposit',
    amount: '+$165.00',
    date: 'Jun 12',
    tone: 'teal'
  }, {
    merchant: 'Dr. Alvarez — copay',
    cat: 'Office visit',
    amount: '-$35.00',
    date: 'Jun 09',
    tone: 'neutral'
  }, {
    merchant: 'Investment sweep',
    cat: 'Transfer to investing',
    amount: '-$500.00',
    date: 'Jun 01',
    tone: 'purple'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 24,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)',
      color: 'var(--hqy-black)',
      letterSpacing: '-0.01em'
    }
  }, "Good afternoon, Maya"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '6px 0 0',
      font: 'var(--weight-roman) 34px/1.1 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "Your HSA is on track.")), /*#__PURE__*/React.createElement(Card, {
    tone: "gradient",
    gradient: "var(--hqy-gradient-3)",
    padding: 0,
    shadow: false,
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-medium) 15px/1 var(--font-sans)',
      opacity: 0.85
    }
  }, "Available balance"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 56px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      marginTop: 6
    }
  }, "$6,482.55"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginTop: 18,
      font: 'var(--weight-roman) 14px/1.3 var(--font-sans)',
      opacity: 0.9
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.8
    }
  }, "Cash"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)'
    }
  }, "$3,210.00")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.8
    }
  }, "Invested"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)'
    }
  }, "$3,272.55")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: 0.8
    }
  }, "YTD earnings"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)'
    }
  }, "+$214.18")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(0,0,0,0.18)',
      padding: '20px 28px',
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Contribute"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    style: {
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.6)'
    }
  }, "Reimburse myself"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)',
      letterSpacing: '-0.01em'
    }
  }, "Hit your max."), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 14px/1 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, pct, "% of $", max.toLocaleString())), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 48px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      margin: '12px 0 18px'
    }
  }, "$", contribution.toLocaleString()), /*#__PURE__*/React.createElement(Slider, {
    value: contribution,
    min: 0,
    max: max,
    onChange: setContribution
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: 'var(--weight-roman) 15px/1.4 var(--font-sans)',
      color: 'var(--hqy-black)',
      maxWidth: 360
    }
  }, "Save on taxes by contributing up to the ", new Date().getFullYear(), " HSA limit before year-end."), /*#__PURE__*/React.createElement(Button, null, "Contribute now"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)'
    }
  }, "Recent activity"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--hqy-purple)',
      font: 'var(--weight-medium) 14px/1 var(--font-sans)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, "View all ", /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.arrow,
    size: 16,
    stroke: "var(--hqy-purple)"
  }))), activity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 0',
      borderTop: i ? '1px solid var(--hqy-gray)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--hqy-gray)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.card,
    size: 18,
    stroke: "var(--hqy-purple)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 15px/1.3 var(--font-sans)'
    }
  }, a.merchant), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 13px/1.3 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, a.cat, " \xB7 ", a.date)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1 var(--font-sans)',
      color: a.amount[0] === '+' ? 'var(--hqy-teal)' : 'var(--hqy-black)'
    }
  }, a.amount))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Wayfinder, {
    fill: "gradient",
    height: 120,
    radius: 12,
    contentStyle: {
      font: 'var(--weight-bold) 20px/1.15 var(--font-sans)',
      paddingRight: 80
    }
  }, "Start investing your HSA to grow tax-free."), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-bold) 17px/1.2 var(--font-sans)',
      marginBottom: 4
    }
  }, "Investments"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 40px/1 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "$3,272.55"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 14px/1.2 var(--font-sans)',
      color: 'var(--hqy-teal)',
      marginTop: 4
    }
  }, "\u25B2 +$214.18 (7.0%) YTD"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      marginBottom: 4,
      font: 'var(--weight-roman) 13px/1 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, "Allocation"), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 68,
    tone: "gradient"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 8,
      font: 'var(--weight-roman) 13px/1 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Index funds 68%"), /*#__PURE__*/React.createElement("span", null, "Cash 32%"))), /*#__PURE__*/React.createElement(QuoteCard, {
    quote: "It's added peace of mind knowing that I'm prepared for retirement.",
    name: "Warren B.",
    gradient: "var(--hqy-gradient-1)"
  }), /*#__PURE__*/React.createElement(Card, {
    tone: "muted",
    shadow: false
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "cyan",
    style: {
      marginBottom: 10
    }
  }, "Tip"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 17px/1.3 var(--font-sans)',
      letterSpacing: '-0.01em'
    }
  }, "Cut healthcare costs with your HSA."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 16px',
      font: 'var(--weight-roman) 14px/1.5 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, "Paying with HSA dollars uses pre-tax money \u2014 saving you up to 30% depending on your tax rate."), /*#__PURE__*/React.createElement(Button, {
    variant: "brand",
    size: "sm"
  }, "Learn how"))));
}

// ---- Investments screen (lighter) ----
function Investments() {
  const holdings = [{
    name: 'Vanguard Total Stock Market',
    sym: 'VTSAX',
    val: '$1,420.10',
    chg: '+8.2%'
  }, {
    name: 'Vanguard Total Intl Stock',
    sym: 'VTIAX',
    val: '$612.40',
    chg: '+5.1%'
  }, {
    name: 'Vanguard Total Bond Market',
    sym: 'VBTLX',
    val: '$524.05',
    chg: '+1.4%'
  }, {
    name: 'Target Retirement 2050',
    sym: 'VFIFX',
    val: '$716.00',
    chg: '+6.7%'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--weight-roman) 34px/1.1 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "Investments"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total value",
    value: "$3,272.55",
    caption: "Across 4 holdings"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "YTD return",
    value: "+7.0%",
    caption: "+$214.18 this year",
    tone: "muted"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Available to invest",
    value: "$2,710",
    caption: "From your cash balance",
    tone: "brand"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 18px/1.2 var(--font-sans)',
      marginBottom: 8
    }
  }, "Holdings"), holdings.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 0',
      borderTop: i ? '1px solid var(--hqy-gray)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 15px/1.3 var(--font-sans)'
    }
  }, h.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 13px/1.3 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, h.sym)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1 var(--font-sans)'
    }
  }, h.val), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      textAlign: 'right',
      font: 'var(--weight-medium) 14px/1 var(--font-sans)',
      color: 'var(--hqy-teal)'
    }
  }, h.chg))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "brand"
  }, "Buy funds"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Adjust allocation"))));
}

// ---- Claims screen ----
function Claims() {
  const claims = [{
    provider: 'Mountain View Pharmacy',
    status: 'Reimbursed',
    amt: '$48.20',
    date: 'Jun 14',
    tone: 'teal'
  }, {
    provider: 'Dr. Alvarez',
    status: 'Processing',
    amt: '$35.00',
    date: 'Jun 09',
    tone: 'light'
  }, {
    provider: 'Summit Dental',
    status: 'Action needed',
    amt: '$210.00',
    date: 'May 28',
    tone: 'purple'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--weight-roman) 34px/1.1 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "Claims"), /*#__PURE__*/React.createElement(Button, null, "+ New claim")), /*#__PURE__*/React.createElement(Card, null, claims.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px 0',
      borderTop: i ? '1px solid var(--hqy-gray)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 16px/1.3 var(--font-sans)'
    }
  }, c.provider), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--weight-roman) 13px/1.3 var(--font-sans)',
      color: 'var(--hqy-black)'
    }
  }, "Submitted ", c.date)), /*#__PURE__*/React.createElement(Badge, {
    tone: c.tone
  }, c.status), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 80,
      textAlign: 'right',
      font: 'var(--weight-roman) 16px/1 var(--font-sans)'
    }
  }, c.amt)))));
}
window.PortalScreens = {
  TopNav,
  Overview,
  Investments,
  Claims
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/member-portal/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/social/posts.jsx
try { (() => {
/* global React */
// HealthEquity — Social media post templates (1080×1080), across the three
// expression modes. Composes brand tokens, Wayfinder, Icon and Logo.
const DS = window.HealthEquityDesignSystem_4d7359 || {};
const {
  Icon,
  Logo,
  Wayfinder
} = DS;
const ROOT = '../../';
const S = 1080;

// Shared frame
function Frame({
  children,
  bg,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: S,
      height: S,
      position: 'relative',
      overflow: 'hidden',
      background: bg,
      fontFamily: 'var(--font-sans)',
      boxSizing: 'border-box',
      ...style
    }
  }, children);
}
const legalCopy = 'HealthEquity does not provide legal, tax or financial advice.';

// 1 · Myth vs Reality — energetic gradient
function MythReality() {
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "linear-gradient(135deg,#310E6E 0%,#7B2FB5 45%,#C04CFF 100%)",
    style: {
      color: '#fff',
      padding: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '3px solid #fff',
      borderRadius: 40,
      padding: '52px 56px',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 36px/1 var(--font-sans)',
      marginBottom: 20
    }
  }, "HSA myth"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 80px/1.02 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "HSAs are only for wealthy people.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px 56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 36px/1 var(--font-sans)',
      marginBottom: 20
    }
  }, "Reality"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 80px/1.02 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "HSAs help all income levels save big.")));
}

// 2 · Plot twist — digital / black with candlestick chart
function PlotTwist() {
  const candles = [18, 26, 22, 30, 24, 20, 38, 30, 34, 46, 42, 54, 50, 66, 72, 62, 80];
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "#000",
    style: {
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      padding: '0 70px 90px'
    }
  }, candles.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      height: `${h}%`,
      borderRadius: 4,
      alignSelf: 'flex-end',
      background: `linear-gradient(180deg, ${i > 10 ? '#33E3FF' : '#C04CFF'} 0%, #7B2FB5 100%)`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 90,
      left: 80,
      right: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 40px/1 var(--font-sans)',
      color: '#C04CFF',
      marginBottom: 16
    }
  }, "Plot twist:"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 84px/1.0 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "Your HSA can be invested.")));
}

// 3 · Bold statement — solid dark purple, emphasis line in light purple
function BoldStatement() {
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "var(--hqy-dark-purple)",
    style: {
      color: '#fff',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 88px/1.04 var(--font-sans)',
      letterSpacing: '-0.03em'
    }
  }, "If you're only using your HSA for doctor visits, you're ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--hqy-light-purple)'
    }
  }, "missing out.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 80,
      right: 80,
      bottom: 70,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 34px/1 var(--font-sans)'
    }
  }, "HSA-eligible medical expenses"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_forward",
    size: 48,
    color: "var(--hqy-light-purple)"
  })));
}

// 4 · Venn — energetic gradient, two overlapping circles
function Venn() {
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "linear-gradient(120deg,#4F2883 0%,#7B2FB5 45%,#2E83E8 100%)",
    style: {
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 150,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      height: 420,
      borderRadius: '50%',
      background: 'var(--hqy-light-purple)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mixBlendMode: 'screen'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#000',
      font: '400 40px/1.2 var(--font-sans)',
      width: 240,
      marginLeft: -40
    }
  }, "\"How can I better afford healthcare?\"")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      height: 420,
      borderRadius: '50%',
      background: 'var(--hqy-cyan)',
      marginLeft: -120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mixBlendMode: 'screen'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#000',
      font: '400 40px/1.2 var(--font-sans)',
      width: 220,
      marginRight: -40
    }
  }, "\"How can I lower my taxes?\""))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 620,
      left: 0,
      right: 0,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow_downward",
    size: 64,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 64px/1.1 var(--font-sans)',
      letterSpacing: '-0.03em',
      marginTop: 8
    }
  }, "My HSA", /*#__PURE__*/React.createElement("br", null), "to the rescue")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 80,
      right: 80,
      bottom: 50,
      font: '400 17px/1.4 var(--font-sans)'
    }
  }, legalCopy, " HSAs are never taxed at a federal income tax level when used for qualified medical expenses."));
}

// 5 · Stat bar chart — lifestyle light
function AppleChart() {
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "var(--hqy-gray)",
    style: {
      color: '#000',
      padding: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 64px/1.12 var(--font-sans)',
      letterSpacing: '-0.03em',
      marginTop: 40
    }
  }, "What would apples cost today if they increased at the same rate as healthcare prices?"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 90,
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 160,
      textAlign: 'right',
      font: '400 28px/1.2 var(--font-sans)'
    }
  }, "Today's average"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 200,
      height: 150,
      borderRadius: 14,
      background: '#A7A8AB'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'italic 400 64px/1 var(--font-serif)'
    }
  }, "$1.31"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 24px/1 var(--font-sans)'
    }
  }, "per pound"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 160,
      textAlign: 'right',
      font: '400 28px/1.2 var(--font-sans)'
    }
  }, "Inflated price"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 150,
      borderRadius: 14,
      background: 'var(--hqy-light-purple)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 80,
      bottom: 60,
      font: '400 20px/1 var(--font-sans)',
      color: '#000'
    }
  }, "U.S. Bureau of Labor Statistics Consumer Price Index, 2025"));
}

// 6 · Max contribution — digital gradient with outlined rows
function MaxContribution() {
  const rows = [['Individual', '$4,300'], ['Family', '$8,550'], ['Catch-up contribution (ages 55+)', '$1,000']];
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "linear-gradient(150deg,#1A0938 0%,#4F2883 70%,#C04CFF 130%)",
    style: {
      color: '#fff',
      padding: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 72px/1.05 var(--font-sans)',
      letterSpacing: '-0.03em',
      marginTop: 20
    }
  }, "Looking to max out your HSA this year?"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 40px/1.3 var(--font-sans)',
      marginTop: 28
    }
  }, "Here's the maximum amount you can contribute in 2025."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, rows.map(([l, v], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      border: '2px solid #fff',
      borderRadius: 24,
      padding: '28px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 40px/1.15 var(--font-sans)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 40px/1 var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, v)))));
}

// 7 · Webinar — lifestyle light with photo + black pill eyebrow
function Webinar() {
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "var(--hqy-gray)",
    style: {
      color: '#000',
      padding: 70
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      background: '#000',
      color: '#fff',
      borderRadius: 999,
      padding: '12px 28px',
      font: '500 26px/1 var(--font-sans)'
    }
  }, "Webinar  \xB7  July 29 & 31"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 70px/1.06 var(--font-sans)',
      letterSpacing: '-0.03em',
      marginTop: 28
    }
  }, "Drive down costs: unlock the power of ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--hqy-light-purple)'
    }
  }, "commuter benefits")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      height: 380,
      borderRadius: 28,
      background: 'url(' + ROOT + 'assets/photography/tennis-senior.png) center/cover'
    }
  }));
}

// 8 · HSA vs FSA — digital purple comparison
function ComparisonHSAFSA() {
  const rows = ['Tax-free contributions', 'Tax-free spending', 'Tax-free growth'];
  function Cell({
    label,
    ok
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        border: ok ? '2px solid #fff' : '2px solid var(--hqy-light-purple)',
        borderRadius: 20,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        height: 150
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 90,
        flex: 'none',
        overflow: 'hidden',
        background: ok ? '#fff' : 'var(--hqy-light-purple)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ok ? 'check' : 'close',
      size: 48,
      color: ok ? '#000' : '#fff',
      weight: 400,
      "aria-label": ok ? 'yes' : 'no',
      style: {
        width: 48,
        height: 48,
        overflow: 'hidden'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: '0 28px',
        font: '400 34px/1.15 var(--font-sans)',
        color: '#fff'
      }
    }, label));
  }
  return /*#__PURE__*/React.createElement(Frame, {
    bg: "var(--hqy-dark-purple)",
    style: {
      color: '#fff',
      padding: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px 40px',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: '700 64px/1 var(--font-sans)'
    }
  }, "HSA"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      font: '700 64px/1 var(--font-sans)'
    }
  }, "FSA"), rows.map((r, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(Cell, {
    label: r,
    ok: true
  }), /*#__PURE__*/React.createElement(Cell, {
    label: r,
    ok: i < 2
  })))));
}
const POSTS = [['Myth vs reality', MythReality, 'Energetic'], ['Plot twist (chart)', PlotTwist, 'Digital'], ['Bold statement', BoldStatement, 'Energetic'], ['Venn — HSA to the rescue', Venn, 'Energetic'], ['Stat / bar chart', AppleChart, 'Lifestyle'], ['Contribution limits', MaxContribution, 'Digital'], ['Webinar', Webinar, 'Lifestyle'], ['HSA vs FSA', ComparisonHSAFSA, 'Digital']];
function Gallery() {
  const scale = 360 / S;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 40,
      padding: 40,
      background: '#e6e6e9',
      fontFamily: 'var(--font-sans)'
    }
  }, POSTS.map(([label, Comp, mode], i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      width: 360,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 16px/1.2 var(--font-sans)',
      color: '#000'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px/1 var(--font-sans)',
      color: '#000'
    }
  }, mode)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      height: 360,
      borderRadius: 6,
      overflow: 'hidden',
      boxShadow: '0 12px 40px rgba(49,14,110,0.16)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: S,
      height: S,
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  }, /*#__PURE__*/React.createElement(Comp, null))))));
}
window.SocialPosts = {
  Gallery,
  POSTS
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/social/posts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Wayfinder = __ds_scope.Wayfinder;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.EmailButton = __ds_scope.EmailButton;

__ds_ns.EmailFooter = __ds_scope.EmailFooter;

__ds_ns.EmailHero = __ds_scope.EmailHero;

__ds_ns.EmailListModule = __ds_scope.EmailListModule;

__ds_ns.EmailModule = __ds_scope.EmailModule;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Icon = __ds_scope.Icon;

})();
