package com.playlearn.children;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/** Checks GitHub Releases for a newer APK, downloads it, and launches the Android installer. */
public class Updater {
    private static final String API_URL =
            "https://api.github.com/repos/Ahmed128aboshady/Children-App/releases/latest";
    private static boolean pendingInstall = false;

    static String currentVersion(Activity act) {
        try {
            PackageInfo pi = act.getPackageManager().getPackageInfo(act.getPackageName(), 0);
            return pi.versionName != null ? pi.versionName : "1.0.0";
        } catch (Exception e) {
            return "1.0.0";
        }
    }

    static void resumePendingInstall(Activity act) {
        if (!pendingInstall) return;
        if (Build.VERSION.SDK_INT < 26 || act.getPackageManager().canRequestPackageInstalls()) {
            pendingInstall = false;
            installDownloadedApk(act);
        }
    }

    static void check(Activity act, boolean manual) {
        if (manual) {
            act.runOnUiThread(() -> Toast.makeText(act, "جاري فحص التحديثات...", Toast.LENGTH_SHORT).show());
        }
        new Thread(() -> {
            try {
                HttpURLConnection conn = (HttpURLConnection) new URL(API_URL).openConnection();
                conn.setRequestMethod("GET");
                conn.setConnectTimeout(8000);
                conn.setReadTimeout(8000);
                conn.setRequestProperty("Accept", "application/vnd.github+json");
                conn.setRequestProperty("User-Agent", "PlayAndLearn-Android");

                int code = conn.getResponseCode();
                if (code != 200) {
                    if (manual) {
                        String msg = code == 404
                                ? "لا توجد إصدارات منشورة على GitHub بعد"
                                : "تعذر فحص التحديثات الآن";
                        act.runOnUiThread(() -> Toast.makeText(act, msg, Toast.LENGTH_SHORT).show());
                    }
                    return;
                }

                StringBuilder sb = new StringBuilder();
                try (BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                }

                JSONObject json = new JSONObject(sb.toString());
                String tag = json.optString("tag_name", "").trim();
                String latest = cleanVersion(tag);
                String current = cleanVersion(currentVersion(act));
                String notes = json.optString("body", "").trim();

                String apkUrl = null;
                JSONArray assets = json.optJSONArray("assets");
                if (assets != null) {
                    for (int i = 0; i < assets.length(); i++) {
                        JSONObject a = assets.getJSONObject(i);
                        String name = a.optString("name", "").toLowerCase();
                        if (name.endsWith(".apk")) {
                            apkUrl = a.optString("browser_download_url", null);
                            break;
                        }
                    }
                }

                if (apkUrl == null || !isNewer(latest, current)) {
                    if (manual) {
                        act.runOnUiThread(() -> Toast.makeText(act,
                                "التطبيق محدث لآخر إصدار (v" + current + ")", Toast.LENGTH_SHORT).show());
                    }
                    return;
                }

                final String finalUrl = apkUrl;
                final String finalNotes = notes.isEmpty()
                        ? "يتوفر إصدار جديد من تطبيق العب واتعلم مع تحسينات وتعديلات جديدة."
                        : notes;
                act.runOnUiThread(() -> {
                    if (act.isFinishing()) return;
                    new AlertDialog.Builder(act)
                            .setTitle("تحديث جديد متاح (v" + latest + ")")
                            .setMessage(finalNotes)
                            .setPositiveButton("تحديث الآن", (d, w) -> downloadAndInstall(act, finalUrl))
                            .setNegativeButton("لاحقاً", null)
                            .show();
                });
            } catch (Exception e) {
                if (manual) {
                    act.runOnUiThread(() -> Toast.makeText(act,
                            "تأكد من اتصال الإنترنت وحاول مرة أخرى", Toast.LENGTH_SHORT).show());
                }
            }
        }).start();
    }

    private static void downloadAndInstall(Activity act, String urlStr) {
        LinearLayout box = new LinearLayout(act);
        box.setOrientation(LinearLayout.VERTICAL);
        int pad = (int) (20 * act.getResources().getDisplayMetrics().density);
        box.setPadding(pad, pad, pad, pad);

        TextView status = new TextView(act);
        status.setText("جاري تحميل التحديث... 0%");
        ProgressBar bar = new ProgressBar(act, null, android.R.attr.progressBarStyleHorizontal);
        bar.setMax(100);
        bar.setIndeterminate(true);
        box.addView(status);
        box.addView(bar);

        AlertDialog dlg = new AlertDialog.Builder(act)
                .setTitle("تحميل التحديث")
                .setView(box)
                .setCancelable(false)
                .create();
        dlg.show();

        new Thread(() -> {
            try {
                HttpURLConnection conn = openFollowingRedirects(urlStr);
                int total = conn.getContentLength();
                File out = new File(act.getCacheDir(), "update.apk");
                try (InputStream in = conn.getInputStream();
                     FileOutputStream fos = new FileOutputStream(out)) {
                    byte[] buf = new byte[8192];
                    int n;
                    long read = 0;
                    int lastPct = -1;
                    while ((n = in.read(buf)) > 0) {
                        fos.write(buf, 0, n);
                        read += n;
                        if (total > 0) {
                            int pct = (int) (read * 100 / total);
                            if (pct != lastPct) {
                                lastPct = pct;
                                final int p = pct;
                                act.runOnUiThread(() -> {
                                    bar.setIndeterminate(false);
                                    bar.setProgress(p);
                                    status.setText("جاري تحميل التحديث... " + p + "%");
                                });
                            }
                        }
                    }
                }
                act.runOnUiThread(() -> {
                    dlg.dismiss();
                    triggerInstall(act);
                });
            } catch (Exception e) {
                act.runOnUiThread(() -> {
                    dlg.dismiss();
                    Toast.makeText(act, "فشل تحميل التحديث، حاول مرة أخرى", Toast.LENGTH_LONG).show();
                });
            }
        }).start();
    }

    private static HttpURLConnection openFollowingRedirects(String urlStr) throws Exception {
        String current = urlStr;
        for (int i = 0; i < 6; i++) {
            HttpURLConnection conn = (HttpURLConnection) new URL(current).openConnection();
            conn.setInstanceFollowRedirects(true);
            conn.setConnectTimeout(15000);
            conn.setReadTimeout(30000);
            conn.setRequestProperty("User-Agent", "PlayAndLearn-Android");
            int code = conn.getResponseCode();
            if (code == 301 || code == 302 || code == 303 || code == 307 || code == 308) {
                String loc = conn.getHeaderField("Location");
                conn.disconnect();
                if (loc == null) break;
                current = loc;
            } else {
                if (code != 200) throw new Exception("HTTP " + code);
                return conn;
            }
        }
        throw new Exception("Too many redirects");
    }

    private static void triggerInstall(Activity act) {
        if (Build.VERSION.SDK_INT >= 26 && !act.getPackageManager().canRequestPackageInstalls()) {
            pendingInstall = true;
            Toast.makeText(act, "فعّل السماح بتثبيت التحديثات ثم ارجع للتطبيق", Toast.LENGTH_LONG).show();
            Intent settings = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:" + act.getPackageName()));
            act.startActivity(settings);
            return;
        }
        installDownloadedApk(act);
    }

    private static void installDownloadedApk(Activity act) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setDataAndType(ApkProvider.apkUri(), "application/vnd.android.package-archive");
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
        act.startActivity(intent);
    }

    private static String cleanVersion(String v) {
        if (v == null) return "0";
        v = v.trim();
        if (v.startsWith("v") || v.startsWith("V")) v = v.substring(1);
        int dash = v.indexOf('-');
        if (dash > 0) v = v.substring(0, dash);
        return v;
    }

    static boolean isNewer(String latest, String current) {
        String[] a = latest.split("\\.");
        String[] b = current.split("\\.");
        int len = Math.max(a.length, b.length);
        for (int i = 0; i < len; i++) {
            int ai = i < a.length ? parseIntSafe(a[i]) : 0;
            int bi = i < b.length ? parseIntSafe(b[i]) : 0;
            if (ai != bi) return ai > bi;
        }
        return false;
    }

    private static int parseIntSafe(String s) {
        try { return Integer.parseInt(s.replaceAll("[^0-9]", "")); }
        catch (Exception e) { return 0; }
    }
}
