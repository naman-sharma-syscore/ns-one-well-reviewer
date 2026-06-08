> Complete catalog of OneWELL brand marks — seals, badges, utility icons, and concept icons. Includes file paths, usage rules, and sizing requirements.

# OneWELL Brand Assets

All assets live in `temp/assets/` (to be referenced or copied during prototype setup).

**Brand protection rules:**
- Never recolor, redraw, crop, or stylize any seal, badge, or logo
- Never apply effects (shadow, glow, opacity) to marks
- Use verbatim from the files listed below
- Seals must render ≥ 64px on the long edge — below that, use the badge variant

---

## Seals (`assets/seals/`)

Use cases and file names:

| Use case | File |
|----------|------|
| Standalone WELL identity | `SealWell.svg` |
| IWBI organization mark | `IWBILogo.svg` |
| In-product navigation logo | `assets/icons/StandardLogo.svg` |
| Full WELL certification mark | `SealWellCertification.svg` |
| WELL Community certification | `SealWellCommunity.svg` |
| WELL Residence certification | `SealWellResidence.svg` |
| IWBI member organization | `SealIwbiMember.svg` |
| Final certification — Bronze | `SealCertificationBronze.svg` |
| Final certification — Silver | `SealCertificationSilver.svg` |
| Final certification — Gold | `SealCertificationGold.svg` |
| Final certification — Platinum | `SealCertificationPlatinum.svg` |
| Rating — Design | `SealRatingDesign.svg` |
| Rating — Equity | `SealRatingEquity.svg` |
| Rating — Health & Safety | `SealRatingHealthSafety.svg` |
| Rating — Operations | `SealRatingOperations.svg` |
| Rating — Performance | `SealRatingPerformance.svg` |
| Rating — Coworking | `SealRatingCoworking.svg` |
| Rating — Real Estate | `SealRatingRealEstate.svg` |
| Rating — Workforce | `SealRatingWorkforce.svg` |
| Provider — Enterprise | `SealEnterpriseProvider.svg` |
| Provider — Product | `SealProductProvider.svg` (also `SealProviders.svg`) |
| Provider — Performance Testing | `SealPerformanceTestingProvider.svg` |
| Provider — Survey | `SealSurveyProvider.svg` |
| Low-emphasis watermarks | `WatermarkMemberOrg.svg`, `WaterMarkWWWProducts.svg`, `WaterMarkWellProjects.svg` |
| Works With WELL | `SealWorksWithWell.svg` |

**Sizing:** Any seal must render ≥ 64px on its long edge. Below 64px, use the badge equivalent.

---

## Badges (`assets/badges/`)

Compact versions of seals for constrained spaces (sidebars, table cells, notification areas).

| Badge | File |
|-------|------|
| Certification — Bronze | `BadgeCertificationBronze.svg` |
| Certification — Silver | `BadgeCertificationSilver.svg` |
| Certification — Gold | `BadgeCertificationGold.svg` |
| Certification — Platinum | `BadgeCertificationPlatinum.svg` |
| Rating — Coworking | `BadgeRatingCoworking.svg` |
| Rating — Design | `BadgeRatingDesign.svg` |
| Rating — Equity | `BadgeRatingEquity.svg` |
| Rating — Health & Safety | `BadgeRatingHealthySafety.svg` |
| Rating — Operations | `BadgeRatingOperations.svg` |
| Rating — Performance | `BadgeRatingPerformance.svg` |
| Rating — Real Estate | `BadgeRatingRealEstate.svg` |
| Rating — Residential | `BadgeRatingResidential.svg` |
| Rating — Workforce | `BadgeRatingWorkforce.svg` |
| Provider — Enterprise | `BadgeEnterpriseProvider.svg` |
| Provider — Product | `BadgeProductProvider.svg` |
| Provider — Performance Testing | `BadgePerformanceTestingProvider.svg` |
| Provider — Survey | `BadgeSurveyProvider.svg` |
| Imperative — Primary | `BadgeImperativePrimary.svg` (cyan gradient) |
| Imperative — Secondary | `BadgeImperativeSecondary.svg` (white/gray outline) |

---

## Utility icons (`assets/icons/Utility*.svg`)

All utility icons: 24×24 native, monochrome, render at `currentColor`.

**Recoloring:** Inline the SVG and set color on the parent element. Never edit the SVG file itself.

**Usage rules:**
- Use sparingly — every icon adds cognitive load
- Prefer icon + label over icon alone, except for universally understood glyphs (Close, Search, Edit)
- Never mix utility icons with concept icons in the same visual context

### Full icon list

| Icon | File | Common use |
|------|------|-----------|
| Accordion toggle | `UtilityAccordion.svg` | Expand/collapse |
| Check / confirm | `UtilityCheck.svg` | Confirmation, done |
| Chevron down | `UtilityChevronDown.svg` | Dropdowns, expand |
| Classification | `UtilityClassification.svg` | Category tagging |
| Clear (regular) | `UtilityClearRegular.svg` | Input clear |
| Close | `UtilityClose.svg` | Dismiss, modal close |
| Compare | `UtilityCompare.svg` | Side-by-side comparison |
| Drag handle | `UtilityDrag.svg` | Draggable rows |
| Edit / pencil | `UtilityEdit.svg` | Inline editing |
| Feedback | `UtilityFeedback.svg` | Comment / feedback |
| Home | `UtilityHome.svg` | Navigation home |
| Message | `UtilityMessage.svg` | Messaging, threads |
| Options / more | `UtilityOptions.svg` | Overflow menu |
| Portfolio | `UtilityPortfolio.svg` | Portfolio navigation |
| Reset | `UtilityReset.svg` | Reset / undo changes |
| Revisions hide | `UtilityRevisionsHide.svg` | Hide revision track |
| Revisions show | `UtilityRevisionsShow.svg` | Show revision track |
| Save | `UtilitySave.svg` | Save action |
| Scope large | `UtilityScopeLarge.svg` | Full scoping view |
| Scoring | `UtilityScoring.svg` | Score display |
| Search | `UtilitySearch.svg` | Search input |
| Show / visibility | `UtilityShow.svg` | Show/reveal |
| Sort | `UtilitySort.svg` | Table sorting |
| Target | `UtilityTarget.svg` | Goal / target |
| Target (active) | `UtilityTargetActive.svg` | Active goal state |
| Text | `UtilityText.svg` | Text field / content |
| Trash / delete | `UtilityTrash.svg` | Delete action |
| Triangle info | `UtilityTriangleInfo.svg` | Warning / info |
| X (close) | `X.svg` | Alternate close glyph |

**Navigation icons:**
| Icon | File |
|------|------|
| Nav logo | `NavLogo.svg` |
| Nav account | `NavAccount.svg` |
| Nav bullet | `NavBullet.svg` |
| Standard in-product logo | `StandardLogo.svg` |

---

## Concept icons (`assets/icons/ConceptIcons.svg`, `assets/concept-icons/`)

11 icons, one per WELL concept. Used to visually identify concept categories.

**For content tagging only.** Never mixed with utility icons. Never used as decorative accents.

| Concept | Token | Hex | SVG file |
|---------|-------|-----|---------|
| Mind | `--concept-mind` | `#0A5161` | `assets/concept-icons/mind.svg` |
| Community | `--concept-community` | `#0F748A` | `assets/concept-icons/community.svg` |
| Movement | `--concept-movement` | `#149EBD` | `assets/concept-icons/movement.svg` |
| Water | `--concept-water` | `#39C9EA` | `assets/concept-icons/water.svg` |
| Air | `--concept-air` | `#87DFF2` | `assets/concept-icons/air.svg` |
| Light | `--concept-light` | `#8AEFDB` | `assets/concept-icons/light.svg` |
| Thermal Comfort | `--concept-thermal` | `#3EDDBF` | — |
| Nourishment | `--concept-nourishment` | `#17AA8D` | `assets/concept-icons/nourishment.svg` |
| Sound | `--concept-sound` | `#0C705C` | — |
| Materials | `--concept-materials` | `#0A4F41` | `assets/concept-icons/materials.svg` |
| Innovation | `--concept-innovation` | `#52545D` | `assets/concept-icons/innovation.svg` |

SVG path data and metadata also stored in `assets/concept-icons/_paths.json`.

**React component:** `assets/icons/ConceptIcons.tsx` — renders concept icons with active/outlined variants.
**Animated alpha icon:** `assets/icons/AlphaIcon.tsx` — animated gradient alpha icon using motion/react.

---

## Alt text format

All seals and badges require descriptive alt text. Format: the human description, not the filename.

- ✅ `alt="WELL Certified Gold seal"`
- ✅ `alt="IWBI member organization mark"`
- ❌ `alt="SealCertificationGold.svg"`
