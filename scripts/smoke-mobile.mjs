/* Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
   BROWSER_EXECUTABLE optionally selects a local Chromium/Chrome installation. */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
const loadModule = createRequire(import.meta.url);
const { chromium } = loadModule(process.env.PLAYWRIGHT_MODULE || "playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const base = process.env.PREVIEW_URL || "http://localhost:3100";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE
      ? { executablePath: process.env.BROWSER_EXECUTABLE }
      : {}),
  });
  const errors = [];
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem("madar_guest_mode", "true");
    window.playedClips = [];
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      window.playedClips.push(this.src);
      return play.call(this);
    };
  });
  await page.goto(base);
  await page.getByRole("button", { name: "هيا نبدأ بالحروف" }).click();
  await page.getByRole("heading", { name: "نكتشف حرف ألف" }).waitFor();
  await page.waitForFunction(() =>
    window.playedClips.some((src) => src.endsWith("/ar/let-1.mp3")),
  );
  await page.getByRole("button", { name: "حرف باء", exact: true }).click();
  await page.getByRole("heading", { name: "نكتشف حرف باء" }).waitFor();
  await page.waitForFunction(() =>
    window.playedClips.some((src) => src.endsWith("/ar/let-2.mp3")),
  );
  await page
    .locator(".letter-lesson")
    .getByRole("button", { name: "إيقاف الصوت" })
    .click();
  const before = await page.evaluate(() => window.playedClips.length);
  await page.getByRole("button", { name: "حرف تاء", exact: true }).click();
  assert.equal(
    await page.evaluate(() => window.playedClips.length),
    before,
    "Muted letter selection should stay silent",
  );
  await page.getByRole("button", { name: "اسمع الحرف", exact: true }).click();
  await page.waitForFunction(() =>
    window.playedClips.some((src) => src.endsWith("/ar/let-3.mp3")),
  );
  await page.locator(".listen-button.is-speaking").waitFor();
  await page.getByRole("button", { name: "يلا نجرّب سوا" }).click();
  await page
    .locator(".word-choices button")
    .filter({ hasText: "جَمَل" })
    .click();
  assert.equal(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("madar_letters_completed_ids") || "[]")
          .length,
    ),
    0,
    "Wrong answer must not earn progress",
  );
  await page
    .locator(".word-choices button")
    .filter({ hasText: "تُفَّاح" })
    .click();
  assert.deepEqual(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("madar_letters_completed_ids")),
    ),
    ["let-3"],
  );
  await page.getByRole("button", { name: "العودة إلى الجزر" }).click();
  await page.reload();
  await page.getByRole("button", { name: "إنجازاتي" }).click();
  await page.getByText("1 من 28 مكتمل", { exact: true }).waitFor();
  await page.getByRole("button", { name: "ولي الأمر", exact: true }).click();
  await page.getByLabel("اسم الطفل", { exact: true }).fill("نور");
  await page.getByRole("button", { name: "حفظ البيانات" }).click();
  await page
    .getByText("تم حفظ البيانات على هذا الجهاز.", { exact: true })
    .waitFor();
  await page.keyboard.press("Escape");
  await page.reload();
  await page.getByRole("heading", { name: /أهلًا نور/ }).waitFor();
  const checkOverflow = async (label) => {
    const size = await page.evaluate(() => ({
      viewport: innerWidth,
      document: document.documentElement.scrollWidth,
      activity: document.querySelector(".activity-shell")?.scrollWidth,
      main: document.querySelector(".activity-shell > main")?.scrollWidth,
      mainWidth: document.querySelector(".activity-shell > main")?.clientWidth,
    }));
    assert(
      size.document <= size.viewport + 1,
      label + ": document overflow " + JSON.stringify(size),
    );
    if (size.activity)
      assert(
        size.activity <= size.viewport + 1,
        label + ": activity overflow " + JSON.stringify(size),
      );
    if (size.main)
      assert(
        size.main <= size.mainWidth + 1,
        label + ": workspace overflow " + JSON.stringify(size),
      );
  };
  for (const [width, height] of [
    [320, 568],
    [390, 844],
    [844, 390],
    [768, 1024],
    [1440, 900],
  ]) {
    await page.setViewportSize({ width, height });
    await page.getByRole("button", { name: "جزري", exact: true }).click();
    await checkOverflow("home " + width);
    await page.getByRole("button", { name: /الحروف العربية نسمع/ }).click();
    await checkOverflow("letter " + width);
    await page.getByRole("button", { name: "التالي", exact: true }).click();
    await page.getByRole("heading", { name: "نكتشف حرف باء" }).waitFor();
    await page.getByRole("button", { name: "العودة إلى الجزر" }).click();
    await page.getByRole("button", { name: /الحروف الإنجليزية حروف/ }).click();
    await checkOverflow("english " + width);
    await page.getByRole("button", { name: "Letter B", exact: true }).click();
    await page.waitForFunction(() =>
      window.playedClips.at(-1).endsWith("/en/en-B.mp3"),
    );
    await page
      .getByRole("button", { name: "خريطة الجزر", exact: true })
      .click();
    await page.getByRole("button", { name: /عالم الأرقام نعدّ/ }).click();
    await checkOverflow("numbers " + width);
    await page
      .getByRole("button", { name: "خريطة الجزر", exact: true })
      .click();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /عالم الأرقام نعدّ/ }).click();
  await page.locator(".balloon-btn").click({ force: true }); // Animated targets never become position-stable.
  await page
    .locator(".activity-shell main button")
    .filter({ hasText: "واحِد" })
    .click();
  assert.deepEqual(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("madar_numbers_completed_ids")),
    ),
    ["num-1"],
  );
  await page.getByRole("button", { name: "خريطة الجزر", exact: true }).click();
  await page.getByRole("button", { name: /الحروف الإنجليزية حروف/ }).click();
  await page.getByRole("button", { name: "تعبئة سريعة", exact: true }).click();
  await page
    .locator("canvas")
    .first()
    .click({ position: { x: 80, y: 90 }, force: true });
  await page
    .getByRole("button", { name: "أنهيت التلوين", exact: true })
    .click();
  await page.locator(".english-finished").waitFor();
  assert.deepEqual(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("madar_english_completed_ids")),
    ),
    ["en-A"],
  );
  await page
    .getByRole("button", { name: "الحرف التالي (B)", exact: true })
    .click();
  await page.waitForFunction(() =>
    window.playedClips.at(-1).endsWith("/en/en-B.mp3"),
  );
  await page.getByRole("button", { name: "خريطة الجزر", exact: true }).click();
  // Decode every bundled recording through the browser media stack.
  const manifest = JSON.parse(
    fs.readFileSync(path.join(root, "public/audio/narration.json"), "utf8"),
  );
  const decoded = await page.evaluate(async (clips) => {
    const context = new AudioContext();
    const results = [];
    for (const clip of clips) {
      const response = await fetch("/audio/" + clip.file);
      if (!response.ok)
        throw new Error(clip.file + ": HTTP " + response.status);
      const buffer = await context.decodeAudioData(
        await response.arrayBuffer(),
      );
      let peak = 0;
      for (const value of buffer.getChannelData(0))
        peak = Math.max(peak, Math.abs(value));
      if (buffer.duration < 0.2 || peak < 0.01)
        throw new Error(clip.file + ": empty or silent recording");
      results.push({ file: clip.file, duration: buffer.duration });
    }
    await context.close();
    return results;
  }, manifest.clips);
  assert.equal(decoded.length, 82);
  assert.deepEqual(errors, []);
  console.log(
    JSON.stringify(
      {
        result: "PASS",
        viewports: 5,
        audioClipsDecoded: decoded.length,
        checked: [
          "Arabic and English audio selection",
          "mute and replay",
          "quiz correctness",
          "progress after reload",
          "profile saving",
          "responsive overflow",
          "runtime errors",
        ],
      },
      null,
      2,
    ),
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
