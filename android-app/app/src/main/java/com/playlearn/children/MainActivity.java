package com.playlearn.children;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.window.OnBackInvokedDispatcher;

import java.io.InputStream;
import java.net.URLDecoder;

/** Hosts the Play & Learn Next.js static app offline from assets/www and exposes Updater bridge. */
public class MainActivity extends Activity {
    private static final int BG = Color.parseColor("#fcfaf7");
    private static final String APP_HOST = "appassets.androidplatform.net";
    private WebView web;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setStatusBarColor(BG);
        getWindow().setNavigationBarColor(BG);
        getWindow().getDecorView().setBackgroundColor(BG);
        int systemUi = android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
        if (Build.VERSION.SDK_INT >= 26) systemUi |= android.view.View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
        getWindow().getDecorView().setSystemUiVisibility(systemUi);

        FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(BG);
        web = new WebView(this);
        web.setBackgroundColor(BG);
        root.addView(web, new FrameLayout.LayoutParams(-1, -1));

        // Edge-to-edge safe area insets (Android 15+ & cutouts)
        root.setOnApplyWindowInsetsListener((v, insets) -> {
            int l, t, r, b;
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets i = insets.getInsets(
                        WindowInsets.Type.systemBars() | WindowInsets.Type.ime() | WindowInsets.Type.displayCutout());
                l = i.left; t = i.top; r = i.right; b = i.bottom;
            } else {
                l = insets.getSystemWindowInsetLeft(); t = insets.getSystemWindowInsetTop();
                r = insets.getSystemWindowInsetRight(); b = insets.getSystemWindowInsetBottom();
            }
            v.setPadding(l, t, r, b);
            return insets;
        });

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (uri != null && APP_HOST.equals(uri.getHost())) {
                    return serveLocalAsset(uri.getPath());
                }
                return super.shouldInterceptRequest(view, request);
            }
        });
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new Bridge(), "AndroidApp");
        web.loadUrl("https://" + APP_HOST + "/");
        setContentView(root);

        if (Build.VERSION.SDK_INT >= 33) {
            getOnBackInvokedDispatcher().registerOnBackInvokedCallback(
                    OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::handleBack);
        }

        // Silent background check for GitHub Release updates on startup
        Updater.check(this, false);
    }

    private WebResourceResponse serveLocalAsset(String rawPath) {
        try {
            String path = rawPath == null ? "/" : URLDecoder.decode(rawPath, "UTF-8");
            if (path.startsWith("/")) path = path.substring(1);
            if (path.isEmpty()) path = "index.html";

            String[] candidates = path.contains(".")
                    ? new String[]{"www/" + path}
                    : new String[]{"www/" + path + ".html", "www/" + path + "/index.html", "www/index.html"};

            for (String assetPath : candidates) {
                try {
                    InputStream is = getAssets().open(assetPath);
                    return new WebResourceResponse(guessMime(assetPath), "UTF-8", is);
                } catch (Exception ignored) {
                }
            }
        } catch (Exception ignored) {
        }
        return null;
    }

    private static String guessMime(String path) {
        String p = path.toLowerCase();
        if (p.endsWith(".html")) return "text/html";
        if (p.endsWith(".js") || p.endsWith(".mjs")) return "application/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".json") || p.endsWith(".txt")) return "application/json";
        if (p.endsWith(".png")) return "image/png";
        if (p.endsWith(".jpg") || p.endsWith(".jpeg")) return "image/jpeg";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (p.endsWith(".ico")) return "image/x-icon";
        if (p.endsWith(".woff2")) return "font/woff2";
        if (p.endsWith(".woff")) return "font/woff";
        if (p.endsWith(".mp3")) return "audio/mpeg";
        if (p.endsWith(".mp4")) return "video/mp4";
        return "application/octet-stream";
    }

    @Override
    protected void onResume() {
        super.onResume();
        Updater.resumePendingInstall(this);
    }

    private void handleBack() {
        if (web != null && web.canGoBack()) {
            web.goBack();
        } else {
            finish();
        }
    }

    @SuppressLint("GestureBackNavigation")
    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        handleBack();
    }

    @Override
    protected void onDestroy() {
        if (web != null) web.destroy();
        super.onDestroy();
    }

    /** Methods callable from JavaScript as window.AndroidApp.* */
    private class Bridge {
        @JavascriptInterface
        public void checkForUpdate() {
            Updater.check(MainActivity.this, true);
        }

        @JavascriptInterface
        public String getVersionName() {
            return Updater.currentVersion(MainActivity.this);
        }
    }
}
